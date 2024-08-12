import React, { useMemo, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useGetCalender } from "../../hooks/useEvent";
import { Alert } from "@mui/material";

const localizer = momentLocalizer(moment);

const eventStyleGetter = () => {
  return {
    style: {
      backgroundColor: "green",
      color: "white",
      borderRadius: "4px",
      border: "none",
      padding: "5px",
    },
  };
};

const dayPropGetter = (date: Date) => {
  const isToday = moment(date).isSame(new Date(), "day");
  if (isToday) {
    return {
      style: {
        backgroundColor: "gray",
      },
    };
  }
  return {};
};

interface MyCalendarProps {
  onSelectSlot: (slot: { start: Date; end: Date }) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ onSelectSlot }) => {
  const defaultDate = useMemo(() => new Date(), []);
  const { data, isFetching } = useGetCalender();

  const parsedEvents = useMemo(() => {
    if (!data?.data) return [];
    return data?.data?.events.map((event: any) => ({
      id: event.id,
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      description: event.description,
    }));
  }, [data]);

  const handleSelectEvent = (event: any) => {
    console.log("Selected Event:", event);
    <Alert severity="info">Selected Event: {event.title}</Alert>;
    <Alert severity="info">This is an info Alert.</Alert>;
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    onSelectSlot({ start, end });
  };

  return (
    <div style={{ height: 400 }}>
      <Calendar
        selectable
        localizer={localizer}
        events={parsedEvents}
        defaultDate={defaultDate}
        defaultView={Views.MONTH}
        views={["month", "week", "day"]}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      />
    </div>
  );
};

export default MyCalendar;
