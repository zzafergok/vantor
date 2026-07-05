import { CheckCircle2 } from 'lucide-react';

export function FoundationList({ items }: { items: string[] }) {
  return (
    <div className="grid max-w-2xl gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-center gap-3 border border-gunmetal bg-obsidian px-3 py-2"
        >
          <CheckCircle2 className="h-4 w-4 text-signal-green" />
          <span className="text-xs font-semibold text-ash">{item}</span>
        </div>
      ))}
    </div>
  );
}
