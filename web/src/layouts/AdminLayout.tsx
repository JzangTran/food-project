import { Outlet } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import SidebarNav from "../components/common/SlidebarNav";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] font-sans text-[#121212]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
        <SidebarNav
          title="ADMIN PANEL"
          subtitle="Internal Food Ordering"
          items={[
            { label: "Quan Ly Mon An", to: "/admin/foods" },
            { label: "Quan Ly Nguoi Dung", to: "/admin/users" },
            { label: "Quan Ly Don Hang", to: "/admin/orders" },
          ]}
        />
        <div>
          <TopBar role="ADMIN" />
          <main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
