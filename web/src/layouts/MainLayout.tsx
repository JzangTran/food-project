import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] font-sans text-[#121212]">
      <div
        className="min-h-screen"
        style={{
          backgroundImage: "radial-gradient(#121212 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
      >
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer totalItems={0} />
      </div>
    </div>
  );
}
