import { type Patient } from "@/entities/patient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { PatientContactDetails } from "./PatientContactDetails";

interface PatientContactInfoProps {
  patient: Patient;
}

export function PatientContactInfo({ patient }: PatientContactInfoProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Контакты</CardTitle>
        <CardDescription>Контактные данные пациента</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <PatientContactDetails patient={patient} />
      </CardContent>
    </Card>
  );
}
