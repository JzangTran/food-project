import SectionTitle from "../common/SectionTitle";

export default function SystemFlowSection() {
  const items = [
    { step: "01", title: "LOGIN", text: "USER DANG NHAP VA XAC THUC TAI KHOAN." },
    { step: "02", title: "CHON MON", text: "LAY DU LIEU TU FOOD SERVICE DE HIEN THI MENU." },
    { step: "03", title: "TAO DON", text: "ORDER SERVICE KIEM TRA USER VA MON AN." },
    { step: "04", title: "PAYMENT", text: "PAYMENT SERVICE CAP NHAT ORDER VA GUI THONG BAO." },
  ];

  return (
    <section className="border-b-4 border-black bg-[#D02020] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="FLOW DAT MON THEO SERVICE-BASED" subtitle="System Overview" />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <article key={item.step} className="relative border-2 border-black bg-white p-5 text-black shadow-[6px_6px_0px_0px_black] lg:border-4 lg:p-6">
              <div className={`inline-flex h-14 w-14 items-center justify-center border-2 border-black bg-[#F0C020] text-xl font-black shadow-[4px_4px_0px_0px_black] ${index % 2 === 1 ? "rotate-45" : ""}`}>
                <span className={index % 2 === 1 ? "-rotate-45" : ""}>{item.step}</span>
              </div>
              <h3 className="mt-5 text-2xl font-black uppercase leading-none tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm font-medium uppercase leading-relaxed tracking-wide text-black/75">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
