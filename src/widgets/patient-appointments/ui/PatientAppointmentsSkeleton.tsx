import { Skeleton } from "@/shared/ui/skeleton";

export function PatientAppointmentsSkeleton() {
  return (
    <ul className="flex flex-col gap-3">
      {Array.from({ length: 3 }, (_, index) => (
        <li
          key={index}
          className="flex items-center justify-between gap-3 border-b py-3 last:border-b-0"
        >
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-28" />
          </div>
          <Skeleton className="h-8 w-28" />
        </li>
      ))}
    </ul>
  );
}
