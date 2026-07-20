import { Label } from "recharts";

interface FieldFormProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FieldForm({ label, error, children }: FieldFormProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}

export { FieldForm };
