interface ResultRowProps {
  label: string;
  value: string;
  emphasis?: boolean;
  positive?: boolean;
  negative?: boolean;
}

export function ResultRow({ label, value, emphasis, positive, negative }: ResultRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className={emphasis ? "text-sm text-slate-300" : "text-sm text-slate-400"}>
        {label}
      </span>
      <span
        className={[
          emphasis ? "text-lg font-semibold" : "text-sm font-medium",
          positive ? "text-emerald-400" : "",
          negative ? "text-rose-400" : "",
          !positive && !negative ? "text-slate-100" : "",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}