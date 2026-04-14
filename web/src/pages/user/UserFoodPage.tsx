import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import Pagination from "../../components/common/Pagination";
import StatusBadge from "../../components/common/StatusBadge";
import TableShell from "../../components/common/TableShell";
import { currency } from "../../lib/utils";
import api from "../../lib/axios";
import type { FoodCategory } from "../../types";

type FoodItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  available: boolean;
};

type PageResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  number?: number;
  size?: number;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  available: boolean;
  quantity: number;
};

const CART_KEY = "food-ordering-cart";

export default function UserFoodsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FoodCategory | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState("SAN SANG DAT MON");
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const pageSize = 5;

  const fetchFoods = async () => {
    try {
      setLoading(true);
      setError("");

      const params: Record<string, string | number | boolean> = {
        page: page - 1,
        size: pageSize,
      };

      if (search.trim()) {
        params.keyword = search.trim();
      }

      if (category !== "ALL") {
        params.category = category;
      }

      const response = await api.get<ApiResponse<PageResponse<FoodItem>>>(
        "/foods",
        { params },
      );

      const payload = response.data.data;
      setFoods(payload.content ?? []);
      setTotalPages(Math.max(payload.totalPages ?? 1, 1));
      setTotalElements(payload.totalElements ?? 0);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Khong the tai danh sach mon an.";
      setError(message);
      setFoods([]);
      setTotalPages(1);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [page, category]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchFoods();
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  const handleAdd = (food: FoodItem) => {
    try {
      const rawCart = localStorage.getItem(CART_KEY);
      const currentCart: CartItem[] = rawCart ? JSON.parse(rawCart) : [];

      const existingItem = currentCart.find((item) => item.id === food.id);

      let nextCart: CartItem[];

      if (existingItem) {
        nextCart = currentCart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        nextCart = [...currentCart, { ...food, quantity: 1 }];
      }

      localStorage.setItem(CART_KEY, JSON.stringify(nextCart));
      setNotice(`${food.name} DA THEM VAO GIO`);
    } catch {
      setNotice("KHONG THE THEM MON VAO GIO");
    }
  };

  return (
    <div className="space-y-8">
      <PageTitle
        eyebrow="USER · FOOD SERVICE"
        title="DANH SACH MON"
        description="XEM MON, TIM KIEM THEO TEN, FILTER THEO LOAI, CO PHAN TRANG. KHI THEM VAO GIO SE HIEN THI THONG BAO."
      />

      <div className="inline-flex border-2 border-black bg-[#F0C020] px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_black]">
        {notice}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px_180px]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tim theo ten mon"
          className="border-2 border-black bg-white px-4 py-4 font-bold uppercase tracking-[0.15em] outline-none shadow-[4px_4px_0px_0px_black]"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as FoodCategory | "ALL")}
          className="border-2 border-black bg-white px-4 py-4 font-bold uppercase tracking-[0.15em] outline-none shadow-[4px_4px_0px_0px_black]"
        >
          <option value="ALL">Tat ca loai</option>
          <option value="DO_AN">Do an</option>
          <option value="NUOC_UONG">Nuoc uong</option>
          <option value="KHAC">Khac</option>
        </select>

        <button
          type="button"
          onClick={() => navigate("/user/cart")}
          className="border-2 border-black bg-[#1040C0] px-4 py-4 font-bold uppercase tracking-[0.15em] text-white shadow-[4px_4px_0px_0px_black]"
        >
          Toi Gio Hang
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={fetchFoods}
          disabled={loading}
          className="border-2 border-black bg-[#1040C0] px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-[4px_4px_0px_0px_black] disabled:opacity-60"
        >
          {loading ? "Dang tai..." : "Tai lai"}
        </button>

        <div className="border-2 border-black bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] shadow-[4px_4px_0px_0px_black]">
          Tong: {totalElements} mon
        </div>
      </div>

      {error ? (
        <div className="border-2 border-black bg-[#F0C020] px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black shadow-[4px_4px_0px_0px_black]">
          {error}
        </div>
      ) : null}

      <TableShell>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#1040C0] text-white">
              <tr>
                {["Ten mon", "Loai", "Gia", "Trang thai", "Them vao gio"].map(
                  (h) => (
                    <th
                      key={h}
                      className="border-b-4 border-black px-4 py-4 text-left text-xs font-bold uppercase tracking-[0.25em]"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr className="border-t-2 border-black bg-white">
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm font-bold uppercase tracking-[0.2em]"
                  >
                    Dang tai du lieu...
                  </td>
                </tr>
              ) : foods.length === 0 ? (
                <tr className="border-t-2 border-black bg-white">
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm font-bold uppercase tracking-[0.2em]"
                  >
                    Khong co mon an nao.
                  </td>
                </tr>
              ) : (
                foods.map((food) => (
                  <tr key={food.id} className="border-t-2 border-black bg-white">
                    <td className="px-4 py-4">
                      <div className="font-black uppercase tracking-tight">
                        {food.name}
                      </div>
                      <div className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-black/60">
                        {food.description}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm font-bold uppercase tracking-[0.2em]">
                      {food.category}
                    </td>

                    <td className="px-4 py-4 text-sm font-black uppercase tracking-tight">
                      {currency(food.price)}
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge available={food.available} />
                    </td>

                    <td className="px-4 py-4">
                      <button
                        type="button"
                        disabled={!food.available}
                        onClick={() => handleAdd(food)}
                        className="border-2 border-black bg-[#D02020] px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white disabled:opacity-50"
                      >
                        Them
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </TableShell>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}