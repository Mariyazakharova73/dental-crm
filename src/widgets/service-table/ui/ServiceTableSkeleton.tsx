import { TableCell, TableRow } from "@/shared/ui/table";

export function ServiceTableSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="bg-muted h-4 w-40 animate-pulse rounded" />
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <div className="bg-muted h-4 w-20 animate-pulse rounded" />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <div className="bg-muted h-4 w-16 animate-pulse rounded" />
          </TableCell>
          <TableCell className="hidden lg:table-cell">
            <div className="bg-muted h-4 w-56 animate-pulse rounded" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
