import { ArrowRight, Circle, Square, Triangle, User } from "lucide-react";

type Props = {
  notice: string;
};

export default function HeroSection({ notice }: Props) {
  return (
    <section className="border-b-4 border-black">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="border-b-4 border-black px-4 py-12 sm:px-6 sm:py-16 lg:border-b-0 lg:border-r-4 lg:px-8 lg:py-24">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-3 border-2 border-black bg-white px-4 py-3 shadow-[4px_4px_0px_0px_black]">
              <User className="h-4 w-4" />
              <p className="text-xs font-bold uppercase tracking-[0.35em] sm:text-sm">
                Internal ordering for employees
              </p>
            </div>

            <h1 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter sm:text-6xl lg:text-8xl">
              ORDER
              <br />
              FOOD
              <br />
              FAST
            </h1>

            <p className="max-w-xl text-base font-medium uppercase leading-relaxed tracking-wide text-black/75 sm:text-lg">
              GIAO DIEN DAT MON NOI BO CHO NHAN VIEN THEO PHONG CACH BAUHAUS. MANH, RO, DAY HINH HOC.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-[#D02020] px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] text-white shadow-[4px_4px_0px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                Explore menu
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] text-black shadow-[4px_4px_0px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                View orders
              </button>
            </div>

            <div className="inline-flex flex-wrap items-center gap-3 border-2 border-black bg-[#F0C020] px-4 py-3 shadow-[4px_4px_0px_0px_black]">
              <div className="h-0 w-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-[#F0C020]" />
              <p className="text-sm font-bold uppercase tracking-[0.2em]">{notice}</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#1040C0] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="absolute -left-10 top-10 h-28 w-28 rounded-full border-4 border-black bg-[#F0C020] opacity-90 lg:h-36 lg:w-36" />
          <div className="absolute right-8 top-16 h-24 w-24 rotate-45 border-4 border-black bg-white opacity-90 lg:h-32 lg:w-32" />
          <div className="absolute bottom-10 left-1/3 h-0 w-0 border-l-[60px] border-r-[60px] border-b-[110px] border-l-transparent border-r-transparent border-b-[#D02020] opacity-90 lg:border-l-[80px] lg:border-r-[80px] lg:border-b-[140px]" />

          <div className="relative mx-auto flex min-h-[320px] max-w-md items-center justify-center border-4 border-black bg-white shadow-[8px_8px_0px_0px_black]">
            <div className="relative flex h-64 w-64 items-center justify-center lg:h-80 lg:w-80">
              <div className="absolute left-5 top-5 h-16 w-16 rounded-full border-4 border-black bg-[#D02020]" />
              <div className="absolute right-4 top-10 h-20 w-20 rotate-45 border-4 border-black bg-[#F0C020]" />
              <div className="absolute bottom-8 left-10 h-24 w-24 border-4 border-black bg-[#1040C0]" />
              <div className="absolute inset-x-0 top-1/2 mx-auto h-1 w-40 -translate-y-1/2 rotate-[-25deg] bg-black" />
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex items-center gap-3">
                  <Circle className="h-10 w-10 fill-[#D02020] text-black" />
                  <Square className="h-10 w-10 fill-[#1040C0] text-black" />
                  <Triangle className="h-10 w-10 fill-[#F0C020] text-black" />
                </div>
                <p className="max-w-[220px] text-sm font-bold uppercase tracking-[0.3em] text-black sm:text-base">
                  geometric interface for food ordering
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
