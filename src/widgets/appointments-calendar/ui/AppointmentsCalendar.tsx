"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toCalendarEvent, useAppointments } from "@/entities/appointment";
import { useServices } from "@/entities/service";
import { useMemo } from "react";

import "./appointments-calendar.css";

export function AppointmentsCalendar() {
  const { data: appointmentsData, isLoading, isError, error } =
    useAppointments({ limit: 100 });
  const { data: services = [] } = useServices();

  const events = useMemo(() => {
    const appointments = appointmentsData?.data ?? [];
    return appointments.map((a) => {
      const service = services.find((s) => s.id === a.serviceId);
      return toCalendarEvent(a, service?.duration);
    });
  }, [appointmentsData?.data, services]);

  if (isLoading) return <p className="text-muted-foreground text-sm">Загрузка…</p>;
  if (isError) {
    return (
      <p className="text-destructive text-sm">
        {error.message || "Не удалось загрузить записи"}
      </p>
    );
  }

  return (
    <div className="appointments-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale="ru"
        height="auto"
        slotMinTime="08:00:00"
        slotMaxTime="21:00:00"
        nowIndicator
        // при height="auto" ячейка растёт под все события —
        // число ограничивает список и включает ссылку «+ещё N»
        dayMaxEvents={3}
        moreLinkClick="popover"
        events={events}
      />
    </div>
  );
}