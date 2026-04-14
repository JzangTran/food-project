import ShapeMark from "./ShapeMark";

type Props = {
  title: string;
  subtitle: string;
};

export default function SectionTitle({ title, subtitle }: Props) {
  return (
    <div className="space-y-3">
      <div className="inline-flex items-center gap-3 border-2 border-black bg-white px-3 py-2 shadow-[4px_4px_0px_0px_black] lg:border-4">
        <ShapeMark shape="square" />
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-black sm:text-sm">{subtitle}</p>
      </div>
      <h2 className="max-w-3xl text-3xl font-black uppercase leading-[0.9] tracking-tighter text-black sm:text-5xl lg:text-6xl">
        {title}
      </h2>
    </div>
  );
}
