import { Skeleton } from "@/shared/ui/skeleton";

export function PatientPaymentsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-7 w-24" />
          </div>
        ))}
      </dl>

      <ul className="flex flex-col gap-3">
        {Array.from({ length: 3 }, (_, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-3 border-b py-3 last:border-b-0"
          >
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="size-8" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
