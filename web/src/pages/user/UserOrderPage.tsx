import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import StatusBadge from "../../components/common/StatusBadge";
import { currency } from "../../lib/utils";
import api from "../../lib/axios";
import type { OrderStatus } from "../../types";
import { createStompClient } from "../../lib/stomp";

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
  status: OrderStatus;
  createdAt: string;
  items: OrderItemResponse[];
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export default function UserOrdersPage() {
  const [tab, setTab] = useState<"WAITING" | "DONE">("WAITING");
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();

  const successMessage = (location.state as { message?: string } | null)?.message;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<ApiResponse<OrderResponse[]>>("/orders");
      setOrders(response.data.data ?? []);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Khong the tai lich su don hang.";
      setError(message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentUserId = localStorage.getItem("userId");
    if (!currentUserId) return;

    const client = createStompClient();

    client.onConnect = () => {
      client.subscribe(`/topic/user/orders/${currentUserId}`, () => {
        fetchOrders();
      });
    };

    if (!client.active) {
      client.activate();
    }
  }, []);

  const currentUserId = Number(localStorage.getItem("userId"));

  const filtered = useMemo(() => {
    const userOrders = orders.filter((order) => order.userId === currentUserId);

    return userOrders.filter((order) => {
      return tab === "WAITING"
        ? order.status !== "DA_GIAO"
        : order.status === "DA_GIAO";
    });
  }, [orders, currentUserId, tab]);

  return (
    <div className="space-y-8">
      <PageTitle
        eyebrow="USER · ORDER HISTORY"
        title="LICH SU DAT MON"
        description="CO 2 TAB: DON CHO GIAO VA DON DA GIAO. ADMIN NHAN DON, CHUAN BI DON VA XAC NHAN KHI DA GIAO XONG."
      />

      {successMessage ? (
        <div className="border-2 border-black bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-[#1040C0] shadow-[4px_4px_0px_0px_black]">
          {successMessage}
        </div>
      ) : null}

      {error ? (
        <div className="border-2 border-black bg-[#F0C020] px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black shadow-[4px_4px_0px_0px_black]">
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setTab("WAITING")}
          className={`border-2 border-black px-4 py-4 text-sm font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_black] ${tab === "WAITING" ? "bg-[#D02020] text-white" : "bg-white text-black"
            }`}
        >
          Don Cho Giao
        </button>

        <button
          type="button"
          onClick={() => setTab("DONE")}
          className={`border-2 border-black px-4 py-4 text-sm font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_black] ${tab === "DONE" ? "bg-[#1040C0] text-white" : "bg-white text-black"
            }`}
        >
          Don Da Giao
        </button>

        <button
          type="button"
          onClick={fetchOrders}
          disabled={loading}
          className="border-2 border-black bg-[#F0C020] px-4 py-4 text-sm font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_black] disabled:opacity-60"
        >
          {loading ? "Dang tai..." : "Tai lai"}
        </button>
      </div>

      {loading ? (
        <div className="border-4 border-black bg-white p-8 text-center text-sm font-bold uppercase tracking-[0.2em] shadow-[8px_8px_0px_0px_black]">
          Dang tai du lieu...
        </div>
      ) : filtered.length === 0 ? (
        <div className="border-4 border-black bg-white p-8 text-center text-sm font-bold uppercase tracking-[0.2em] shadow-[8px_8px_0px_0px_black]">
          Khong co don hang nao.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((order, index) => {
            const itemCount =
              order.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

            return (
              <article
                key={order.id}
                className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_black]"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-2xl font-black uppercase tracking-tight">
                    #{order.id}
                  </p>
                  <div
                    className={`h-5 w-5 border-2 border-black ${index % 3 === 0
                      ? "rounded-full bg-[#D02020]"
                      : index % 3 === 1
                        ? "bg-[#1040C0]"
                        : "rotate-45 bg-[#F0C020]"
                      }`}
                  />
                </div>

                <div className="mt-4">
                  <StatusBadge status={order.status} />
                </div>

                <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-black/60">
                  {itemCount} mon
                </p>

                <p className="mt-2 text-3xl font-black uppercase tracking-tight">
                  {currency(order.totalAmount)}
                </p>

                <div className="mt-4 space-y-2">
                  {order.items?.map((item) => (
                    <div
                      key={item.id}
                      className="border-2 border-black bg-[#F0F0F0] px-3 py-2 text-xs font-bold uppercase tracking-[0.15em]"
                    >
                      {item.foodName} x{item.quantity}
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}