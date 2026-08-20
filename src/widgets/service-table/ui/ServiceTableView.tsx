"use client";

import type { Service } from "@/entities/service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { SERVICE_TABLE_COLUMNS } from "../lib/service-table-columns";
import { ServiceTableRow } from "./ServiceTableRow";
import { ServiceTableSkeleton } from "./ServiceTableSkeleton";

interface ServiceTableViewProps {
  services: Service[];
  isLoading: boolean;
}

export function ServiceTableView({
  services,
  isLoading,
}: ServiceTableViewProps) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            {SERVICE_TABLE_COLUMNS.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading && <ServiceTableSkeleton />}

          {!isLoading && services.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={SERVICE_TABLE_COLUMNS.length}
                className="text-muted-foreground h-24 text-center"
              >
                Каталог услуг пуст
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            services.map((service) => (
              <ServiceTableRow key={service.id} service={service} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
