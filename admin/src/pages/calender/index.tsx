import React, { useMemo } from "react";
import { Views, momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography } from "@mui/material";

const myEventsList = [
  {
    id: 0,
    title: "Strategy Meeting and now",
    start: "2024-08-11T10:00:00.000Z", // ISO format date string
    end: "2024-08-11T11:30:00.000Z", // ISO format date string
  },
  {
    id: 1,
    title: "Team Sync",
    start: "2024-08-12T12:00:00.000Z",
    end: "2024-08-12T13:00:00.000Z",
  },
  {
    id: 2,
    title: "Client Presentation",
    start: "2024-08-13T15:00:00.000Z",
    end: "2024-08-13T16:00:00.000Z",
  },
  {
    id: 3,
    title: "Project Review",
    start: "2024-08-14T11:30:00.000Z",
    end: "2024-08-14T12:30:00.000Z",
  },
  {
    id: 4,
    title: "Marketing Update",
    start: "2024-08-15T14:00:00.000Z",
    end: "2024-08-15T15:00:00.000Z",
  },
  {
    id: 5,
    title: "Code Review",
    start: "2024-08-16T17:00:00.000Z",
    end: "2024-08-16T18:30:00.000Z",
  },
  {
    id: 6,
    title: "Design Workshop",
    start: "2024-08-17T10:30:00.000Z",
    end: "2024-08-17T12:00:00.000Z",
  },
  {
    id: 7,
    title: "Sprint Planning",
    start: "2024-08-18T09:30:00.000Z",
    end: "2024-08-18T11:00:00.000Z",
  },
  {
    id: 8,
    title: "Weekly Sync",
    start: "2024-08-19T13:30:00.000Z",
    end: "2024-08-19T14:30:00.000Z",
  },
  {
    id: 9,
    title: "Leadership Meeting",
    start: "2024-08-20T16:00:00.000Z",
    end: "2024-08-20T17:30:00.000Z",
  },
];

const localizer = momentLocalizer(moment);

const parsedEvents = myEventsList.map((event) => ({
  ...event,
  start: new Date(event.start),
  end: new Date(event.end),
}));

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

const MyCalendar: React.FC = () => {
  const defaultDate = useMemo(() => new Date(), []);

  return (
    <div className="w-[100%] h-[100%] relative overflow-x-hidden">
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "15px",
          border: "1px solid #E4E4E7",
          mt: "1rem",
        }}
      >
        <Typography variant="h6" textAlign={"center"} sx={{ color: "#908E8F" }}>
          Event Schedule
        </Typography>
      </Box>

      <Calendar
        localizer={localizer}
        events={parsedEvents}
        defaultView={Views.MONTH}
        defaultDate={defaultDate}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "90vh", marginTop: "1rem" }}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayPropGetter}
      />
    </div>
  );
};

export default MyCalendar;
