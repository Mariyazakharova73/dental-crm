import {
  APPOINTMENT_STATUS,
  AppointmentForm,
  AppointmentFormValues,
  emptyAppointmentFormValues,
  useCreateAppointment,
} from "@/entities/appointment";
import { toast } from "sonner";

interface CreateAppointmentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateAppointmentForm({
  onSuccess,
  onCancel,
}: CreateAppointmentFormProps) {
  const { mutate, isPending, isError, error, reset } = useCreateAppointment();

  const onSubmit = (values: AppointmentFormValues) => {
    mutate(
      { ...values, status: APPOINTMENT_STATUS.CREATED },
      {
        onSuccess: () => {
          reset();
          toast.success("Запись создана");
          onSuccess?.();
        },
      },
    );
  };
  return (
    <AppointmentForm
      defaultValues={emptyAppointmentFormValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isPending={isPending}
      errorMessage={
        isError ? error.message || "Не удалось создать запись " : null
      }
    />
  );
}
