import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import { currency } from "../../lib/utils";
import api from "../../lib/axios";
import type { FoodCategory, PaymentMethod } from "../../types";

type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  available: boolean;
  quantity: number;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type OrderItemResponse = {
  id: number;
  foodId: number;
  foodName: string;
  quantity: number;
  price: number;
};

type OrderResponse = {
  id: number;
  userId: number;
  customerName: string;
  email: string;
  phone: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItemResponse[];
};

type PaymentResponse = {
  id: number;
  orderId: number;
  method: PaymentMethod;
  status: string;
  paidAt: string;
};

const CART_KEY = "food-ordering-cart";

export default function UserCartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const [notice, setNotice] = useState("CHUA DAT DON");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) {
      setCart([]);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as CartItem[];
      setCart(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCart([]);
    }
  }, []);

  const persistCart = (nextCart: CartItem[]) => {
    setCart(nextCart);
    localStorage.setItem(CART_KEY, JSON.stringify(nextCart));
  };

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const updateQuantity = (id: number, delta: number) => {
    const nextCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item,
      )
      .filter((item) => item.quantity > 0);

    persistCart(nextCart);
  };

  const handleOrder = async () => {
    if (cart.length === 0) {
      setNotice("GIO HANG DANG TRONG");
      return;
    }

    try {
      setLoading(true);
      setNotice("DANG TAO DON...");

      const userId = localStorage.getItem("userId");

      if (!userId) {
        setNotice("KHONG TIM THAY THONG TIN NGUOI DUNG");
        return;
      }

      const orderPayload = {
        userId: Number(userId),
        items: cart.map((item) => ({
          foodId: item.id,
          quantity: item.quantity,
        })),
      };

      const orderResponse = await api.post<ApiResponse<OrderResponse>>(
        "/orders",
        orderPayload,
      );

      const createdOrder = orderResponse.data.data;

      if (!createdOrder?.id) {
        throw new Error("Khong tao duoc don hang");
      }

      setNotice("DANG THANH TOAN...");

      const paymentResponse = await api.post<ApiResponse<PaymentResponse>>(
        "/payments",
        {
          orderId: createdOrder.id,
          method: paymentMethod,
        },
      );

      const paymentMessage =
        paymentResponse.data.message || "DAT DON THANH CONG";

      localStorage.removeItem(CART_KEY);
      setCart([]);
      setNotice(paymentMessage);

      navigate("/user/orders", {
        replace: true,
        state: {
          message: paymentMessage,
          orderId: createdOrder.id,
        },
      });
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "BACKEND BAO LOI KHI DAT DON";
      setNotice(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageTitle
        eyebrow="USER · ORDER SERVICE"
        title="GIO HANG"
        description="THEM BOT SO LUONG, DAT DON, NEU THANH CONG THI CHUYEN QUA TRANG DON HANG. NEU KHONG THI HIEN THI THONG BAO TU BACKEND."
      />

      <div className="inline-flex border-2 border-black bg-[#F0C020] px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_black]">
        {notice}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          {cart.length === 0 ? (
            <div className="border-4 border-black bg-white p-5 text-center text-sm font-bold uppercase tracking-[0.2em] shadow-[8px_8px_0px_0px_black]">
              GIO HANG DANG TRONG
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="border-4 border-black bg-white p-5 shadow-[8px_8px_0px_0px_black]"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-2xl font-black uppercase tracking-tight">
                      {item.name}
                    </div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-black/60">
                      {currency(item.price)}
                    </div>
                  </div>

                  <div className="flex items-center border-2 border-black bg-[#F0F0F0]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-4 py-3 text-sm font-black uppercase"
                    >
                      -
                    </button>
                    <div className="border-x-2 border-black px-4 py-3 text-sm font-black uppercase">
                      {item.quantity}
                    </div>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-4 py-3 text-sm font-black uppercase"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-black/70">
                  Thanh tien: {currency(item.price * item.quantity)}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-4 border-4 border-black bg-white p-5 shadow-[8px_8px_0px_0px_black]">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-black/60">
            Payment
          </div>

          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("COD")}
              className={`border-2 border-black px-4 py-4 text-sm font-bold uppercase tracking-[0.2em] ${
                paymentMethod === "COD"
                  ? "bg-[#D02020] text-white"
                  : "bg-white text-black"
              }`}
            >
              COD
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("BANKING")}
              className={`border-2 border-black px-4 py-4 text-sm font-bold uppercase tracking-[0.2em] ${
                paymentMethod === "BANKING"
                  ? "bg-[#1040C0] text-white"
                  : "bg-white text-black"
              }`}
            >
              BANKING
            </button>
          </div>

          <div className="border-2 border-black bg-[#F0C020] px-4 py-4 text-sm font-bold uppercase tracking-[0.2em]">
            Tong tien: {currency(total)}
          </div>

          <button
            type="button"
            disabled={loading || cart.length === 0}
            onClick={handleOrder}
            className="w-full border-2 border-black bg-[#F0C020] px-4 py-4 text-sm font-bold uppercase tracking-[0.25em] shadow-[4px_4px_0px_0px_black] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Dang xu ly..." : "Dat Don"}
          </button>
        </div>
      </div>
    </div>
  );
}