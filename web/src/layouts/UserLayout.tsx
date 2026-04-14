import { Outlet } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import SidebarNav from "../components/common/SlidebarNav";

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] font-sans text-[#121212]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
        <SidebarNav
          title="USER PANEL"
          subtitle="Internal Food Ordering"
          items={[
            { label: "Danh Sach Mon", to: "/user/foods" },
            { label: "Gio Hang", to: "/user/cart" },
            { label: "Lich Su Dat Mon", to: "/user/orders" },
          ]}
        />
        <div>
          <TopBar role="USER" />
          <main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
