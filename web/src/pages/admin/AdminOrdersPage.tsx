import { useEffect, useMemo, useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import Pagination from "../../components/common/Pagination";
import StatusBadge from "../../components/common/StatusBadge";
import TableShell from "../../components/common/TableShell";
import { currency, paginate } from "../../lib/utils";
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

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatus | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<ApiResponse<OrderResponse[]>>("/orders");
      setOrders(response.data.data ?? []);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Khong the tai danh sach don hang.";
      setError(message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const client = createStompClient();

    client.onConnect = () => {
      client.subscribe("/topic/admin/orders", (message) => {
        const event = JSON.parse(message.body);

        setSuccessMessage(event.message || "Co cap nhat don hang moi");

        fetchOrders();
      });
    };

    if (!client.active) {
      client.activate();
    }

    return () => {
      // khong deactivate global client o day de tranh mat ket noi khi chuyen trang
    };
  }, []);

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchSearch =
        !keyword ||
        [order.customerName, order.phone, order.email].some((value) =>
          value.toLowerCase().includes(keyword),
        );

      const matchStatus = status === "ALL" || order.status === status;

      return matchSearch && matchStatus;
    });
  }, [orders, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = paginate(filtered, safePage, pageSize);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const updateOrderStatus = async (orderId: number, nextStatus: OrderStatus) => {
    try {
      setActionLoadingId(orderId);
      setError("");
      setSuccessMessage("");

      const response = await api.put<ApiResponse<OrderResponse>>(
        `/orders/${orderId}/status`,
        { status: nextStatus },
      );

      setSuccessMessage(
        response.data.message || "Cap nhat trang thai don hang thanh cong",
      );

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: nextStatus } : order,
        ),
      );
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Cap nhat trang thai that bai.";
      setError(message);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <PageTitle
        eyebrow="ADMIN · ORDER SERVICE"
        title="QUAN LY DON HANG"
        description="XEM DON HANG, TIM KIEM THEO NGUOI DAT VA FILTER THEO TRANG THAI. ADMIN NHAN DON, CHUAN BI, GIAO DON VA HOAN TAT."
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_260px_180px]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tim theo ten / so dien thoai / gmail"
          className="border-2 border-black bg-white px-4 py-4 font-bold uppercase tracking-[0.15em] outline-none shadow-[4px_4px_0px_0px_black]"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as OrderStatus | "ALL")}
          className="border-2 border-black bg-white px-4 py-4 font-bold uppercase tracking-[0.15em] outline-none shadow-[4px_4px_0px_0px_black]"
        >
          <option value="ALL">Tat ca trang thai</option>
          <option value="CHO_XAC_NHAN">Cho xac nhan</option>
          <option value="DANG_CHUAN_BI">Dang chuan bi</option>
          <option value="DANG_GIAO">Dang giao</option>
          <option value="DA_GIAO">Da giao</option>
        </select>

        <button
          type="button"
          onClick={fetchOrders}
          disabled={loading}
          className="border-2 border-black bg-[#1040C0] px-4 py-4 font-bold uppercase tracking-[0.15em] text-white shadow-[4px_4px_0px_0px_black] disabled:opacity-60"
        >
          {loading ? "Dang tai..." : "Tai lai"}
        </button>
      </div>

      {error ? (
        <div className="border-2 border-black bg-[#F0C020] px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black shadow-[4px_4px_0px_0px_black]">
          {error}
        </div>
      ) : null}

      {successMessage ? (
        <div className="border-2 border-black bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-[#1040C0] shadow-[4px_4px_0px_0px_black]">
          {successMessage}
        </div>
      ) : null}

      <TableShell>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#D02020] text-white">
              <tr>
                {[
                  "Ma don",
                  "Nguoi dat",
                  "Lien he",
                  "Tong tien",
                  "Trang thai",
                  "Xu ly",
                ].map((h) => (
                  <th
                    key={h}
                    className="border-b-4 border-black px-4 py-4 text-left text-xs font-bold uppercase tracking-[0.25em]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr className="border-t-2 border-black bg-white">
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm font-bold uppercase tracking-[0.2em]"
                  >
                    Dang tai du lieu...
                  </td>
                </tr>
              ) : paged.length === 0 ? (
                <tr className="border-t-2 border-black bg-white">
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm font-bold uppercase tracking-[0.2em]"
                  >
                    Khong co don hang nao.
                  </td>
                </tr>
              ) : (
                paged.map((order) => {
                  const itemCount =
                    order.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

                  const rowLoading = actionLoadingId === order.id;

                  return (
                    <tr key={order.id} className="border-t-2 border-black bg-white">
                      <td className="px-4 py-4 font-black uppercase tracking-tight">
                        #{order.id}
                      </td>

                      <td className="px-4 py-4">
                        <div className="font-black uppercase tracking-tight">
                          {order.customerName}
                        </div>
                        <div className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-black/60">
                          {itemCount} mon
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm font-bold">
                        <div>{order.phone}</div>
                        <div>{order.email}</div>
                      </td>

                      <td className="px-4 py-4 text-sm font-black uppercase tracking-tight">
                        {currency(order.totalAmount)}
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge status={order.status} />
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            disabled={rowLoading || order.status !== "CHO_XAC_NHAN"}
                            onClick={() =>
                              updateOrderStatus(order.id, "DANG_CHUAN_BI")
                            }
                            className="border-2 border-black bg-[#F0C020] px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] disabled:opacity-50"
                          >
                            Nhan Don
                          </button>

                          <button
                            type="button"
                            disabled={rowLoading || order.status !== "DANG_CHUAN_BI"}
                            onClick={() =>
                              updateOrderStatus(order.id, "DANG_GIAO")
                            }
                            className="border-2 border-black bg-[#1040C0] px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white disabled:opacity-50"
                          >
                            Giao Don
                          </button>

                          <button
                            type="button"
                            disabled={rowLoading || order.status !== "DANG_GIAO"}
                            onClick={() =>
                              updateOrderStatus(order.id, "DA_GIAO")
                            }
                            className="border-2 border-black bg-[#D02020] px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white disabled:opacity-50"
                          >
                            {rowLoading ? "Dang xu ly..." : "Hoan Tat"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </TableShell>

      <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}