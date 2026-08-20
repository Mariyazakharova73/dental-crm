import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

interface PatientSectionPlaceholderProps {
  title: string;
  description: string;
  message?: string;
}

export function PatientSectionPlaceholder({
  title,
  description,
  message = "Раздел будет добавлен на следующем этапе",
}: PatientSectionPlaceholderProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <p className="text-muted-foreground text-sm">{message}</p>
      </CardContent>
    </Card>
  );
}
