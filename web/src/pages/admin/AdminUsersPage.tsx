import { useEffect, useMemo, useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import Pagination from "../../components/common/Pagination";
import StatusBadge from "../../components/common/StatusBadge";
import TableShell from "../../components/common/TableShell";
import { paginate } from "../../lib/utils";
import api from "../../lib/axios";

type UserRole = "ADMIN" | "USER";

type UserAccount = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<ApiResponse<UserAccount[]>>("/users");
      setUsers(response.data.data ?? []);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Khong the tai danh sach tai khoan.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return users;

    return users.filter((user) =>
      [user.fullName, user.phone, user.email].some((value) =>
        value.toLowerCase().includes(keyword),
      ),
    );
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = paginate(filtered, safePage, pageSize);

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <div className="space-y-8">
      <PageTitle
        eyebrow="ADMIN · USER SERVICE"
        title="QUAN LY NGUOI DUNG"
        description="XEM DANH SACH TAI KHOAN, TIM KIEM THEO TEN, SO DIEN THOAI HOAC GMAIL, CO PHAN TRANG."
      />

      <div className="flex flex-col gap-4 md:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tim theo ten / so dien thoai / gmail"
          className="w-full border-2 border-black bg-white px-4 py-4 font-bold uppercase tracking-[0.15em] outline-none shadow-[4px_4px_0px_0px_black]"
        />

        <button
          type="button"
          onClick={fetchUsers}
          disabled={loading}
          className="shrink-0 border-2 border-black bg-[#1040C0] px-4 py-4 font-bold uppercase tracking-[0.15em] text-white shadow-[4px_4px_0px_0px_black] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Dang tai..." : "Tai lai"}
        </button>
      </div>

      {error ? (
        <div className="border-2 border-black bg-[#F0C020] px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black shadow-[4px_4px_0px_0px_black]">
          {error}
        </div>
      ) : null}

      <TableShell>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#F0C020] text-black">
              <tr>
                {["Ho ten", "Email", "So dien thoai", "Vai tro"].map((h) => (
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
                <tr className="bg-white">
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-sm font-bold uppercase tracking-[0.2em]"
                  >
                    Dang tai du lieu...
                  </td>
                </tr>
              ) : paged.length === 0 ? (
                <tr className="bg-white">
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-sm font-bold uppercase tracking-[0.2em]"
                  >
                    Khong co tai khoan nao.
                  </td>
                </tr>
              ) : (
                paged.map((user) => (
                  <tr key={user.id} className="border-t-2 border-black bg-white">
                    <td className="px-4 py-4 font-black uppercase tracking-tight">
                      {user.fullName}
                    </td>
                    <td className="px-4 py-4 text-sm font-bold">{user.email}</td>
                    <td className="px-4 py-4 text-sm font-bold">{user.phone}</td>
                    <td className="px-4 py-4">
                      <StatusBadge role={user.role} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </TableShell>

      <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}