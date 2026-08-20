import { type Doctor } from "@/entities/doctor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { DoctorContactDetails } from "./DoctorContactDetails";

interface DoctorContactInfoProps {
  doctor: Doctor;
}

export function DoctorContactInfo({ doctor }: DoctorContactInfoProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Информация</CardTitle>
        <CardDescription>Данные о враче</CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <DoctorContactDetails doctor={doctor} />
      </CardContent>
    </Card>
  );
}
