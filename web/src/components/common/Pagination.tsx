type Props = { page: number; totalPages: number; onChange: (page: number) => void };

export default function Pagination({ page, totalPages, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={() => onChange(Math.max(1, page - 1))} className="border-2 border-black bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_black]">
        Prev
      </button>
      <div className="border-2 border-black bg-[#F0F0F0] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
        Page {page} / {totalPages}
      </div>
      <button type="button" onClick={() => onChange(Math.min(totalPages, page + 1))} className="border-2 border-black bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_black]">
        Next
      </button>
    </div>
  );
}
