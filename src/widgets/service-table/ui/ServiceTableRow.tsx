import {
  formatServiceDuration,
  formatServicePrice,
  type Service,
} from "@/entities/service";
import { TableCell, TableRow } from "@/shared/ui/table";

interface ServiceTableRowProps {
  service: Service;
}

export function ServiceTableRow({ service }: ServiceTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{service.name}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {formatServicePrice(service.price)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {formatServiceDuration(service.duration)}
      </TableCell>
      <TableCell className="text-muted-foreground hidden max-w-xs truncate lg:table-cell">
        {service.description}
      </TableCell>
    </TableRow>
  );
}
