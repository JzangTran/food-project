import { ArrowRight, CreditCard, ShoppingCart, Wallet } from "lucide-react";
import { useMemo } from "react";
import { currency } from "../../lib/utils";
import type { CartItem, PaymentMethod } from "../../types";
import ShapeMark from "../common/ShapeMark";

type Props = {
  cart: CartItem[];
  paymentMethod: PaymentMethod;
  onSelectPayment: (method: PaymentMethod) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onCheckout: () => void;
};

export default function CartPanel({
  cart,
  paymentMethod,
  onSelectPayment,
  onIncrease,
  onDecrease,
  onCheckout,
}: Props) {
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  return (
    <aside className="border-2 border-black bg-white shadow-[6px_6px_0px_0px_black] lg:sticky lg:top-6 lg:border-4 lg:shadow-[8px_8px_0px_0px_black]">
      <div className="border-b-4 border-black bg-[#1040C0] p-5 text-white lg:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/80">Gio Hang</p>
            <h3 className="mt-2 text-3xl font-black uppercase leading-none tracking-tight">ORDER</h3>
          </div>
          <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-white text-black shadow-[4px_4px_0px_0px_black]">
            <ShoppingCart className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 lg:p-6">
        {cart.length === 0 ? (
          <div className="border-2 border-black bg-[#F0F0F0] p-4 text-sm font-bold uppercase tracking-[0.2em] text-black/70">
            Chua co mon nao trong gio.
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={item.id} className="border-2 border-black bg-[#F0F0F0] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ShapeMark shape={item.shape} />
                      <p className="text-lg font-black uppercase leading-none tracking-tight text-black">
                        {item.name}
                      </p>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/60">Item {index + 1}</p>
                  </div>
                  <p className="text-sm font-black uppercase tracking-tight text-black">{currency(item.price)}</p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center border-2 border-black bg-white">
                    <button type="button" onClick={() => onDecrease(item.id)} className="px-3 py-2 text-sm font-black uppercase">
                      -
                    </button>
                    <div className="border-x-2 border-black px-4 py-2 text-sm font-black uppercase">{item.quantity}</div>
                    <button type="button" onClick={() => onIncrease(item.id)} className="px-3 py-2 text-sm font-black uppercase">
                      +
                    </button>
                  </div>

                  <p className="text-base font-black uppercase tracking-tight text-black">
                    {currency(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3 border-2 border-black bg-[#D02020] p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.35em]">Thanh Toan</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {([
              { key: "COD", label: "COD", icon: Wallet },
              { key: "BANKING", label: "BANKING", icon: CreditCard },
            ] as const).map((method) => {
              const Icon = method.icon;
              const active = paymentMethod === method.key;

              return (
                <button
                  key={method.key}
                  type="button"
                  onClick={() => onSelectPayment(method.key)}
                  className={`flex items-center justify-center gap-2 border-2 border-black px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_black] transition duration-200 ease-out active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
                    active ? "bg-[#F0C020] text-black" : "bg-white text-black"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {method.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-2 border-black bg-[#F0F0F0] p-4">
          <div className="flex items-center justify-between gap-4 text-black">
            <p className="text-sm font-bold uppercase tracking-[0.3em]">Tong Tien</p>
            <p className="text-2xl font-black uppercase tracking-tight">{currency(total)}</p>
          </div>
        </div>

        <button
          type="button"
          disabled={cart.length === 0}
          onClick={onCheckout}
          className="flex w-full items-center justify-center gap-2 border-2 border-black bg-[#F0C020] px-4 py-4 text-sm font-bold uppercase tracking-[0.25em] text-black shadow-[4px_4px_0px_0px_black] transition duration-200 ease-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          Dat Mon
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
