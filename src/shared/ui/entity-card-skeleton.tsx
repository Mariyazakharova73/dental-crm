import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function EntityCardSkeleton() {
  return (
    <Card>
      <CardHeader className="border-b">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="mt-2 h-4 w-32" />
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="h-16 w-full" />
      </CardContent>
    </Card>
  );
}
