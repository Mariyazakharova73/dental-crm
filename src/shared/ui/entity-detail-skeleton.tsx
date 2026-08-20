import { EntityCardSkeleton } from "@/shared/ui/entity-card-skeleton";
import { Skeleton } from "@/shared/ui/skeleton";

interface EntityDetailSkeletonProps {
  tabCount?: number;
  cardCount?: number;
}

export function EntityDetailSkeleton({
  tabCount = 2,
  cardCount = 2,
}: EntityDetailSkeletonProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="size-9" />
          <Skeleton className="size-9" />
        </div>
      </div>

      <div className="border-b pb-px">
        <div className="flex gap-1 overflow-x-auto">
          {Array.from({ length: tabCount }, (_, index) => (
            <Skeleton key={index} className="mb-px h-9 w-20 shrink-0" />
          ))}
        </div>
      </div>

      {Array.from({ length: cardCount }, (_, index) => (
        <EntityCardSkeleton key={index} />
      ))}
    </div>
  );
}
