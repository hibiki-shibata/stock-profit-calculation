interface FieldProps {
  label: string;
  suffix: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
}

export function Field({ label, suffix, value, onChange, step = 1 }: FieldProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 focus-within:border-emerald-500">
        <input
          type="number"
          value={value}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full bg-transparent text-slate-100 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-sm text-slate-500">{suffix}</span>
      </div>
    </label>
  );
}