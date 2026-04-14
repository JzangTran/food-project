type Props = { eyebrow: string; title: string; description?: string };

export default function PageTitle({ eyebrow, title, description }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-[0.35em] text-black/60">{eyebrow}</p>
      <h1 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter sm:text-6xl">{title}</h1>
      {description ? <p className="max-w-3xl text-sm font-medium uppercase tracking-[0.18em] text-black/70 sm:text-base">{description}</p> : null}
    </div>
  );
}