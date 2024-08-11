import React, { useMemo } from "react";
import { Views, momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography } from "@mui/material";

const myEventsList = [
  {
    id: 0,
    title: "Strategy Meeting",
    start: new Date(2024, 8, 11, 10, 0), // August 11, 2024, 10:00 AM
    end: new Date(2024, 7, 11, 11, 30), // August 11, 2024, 11:30 AM
  },
  {
    id: 1,
    title: "Team Sync",
    start: new Date(2024, 9, 12, 12, 0), // August 12, 2024, 12:00 PM
    end: new Date(2024, 7, 12, 13, 0), // August 12, 2024, 1:00 PM
  },
  {
    id: 2,
    title: "Client Presentation",
    start: new Date(2024, 6, 13, 15, 0), // August 13, 2024, 3:00 PM
    end: new Date(2024, 7, 13, 16, 0), // August 13, 2024, 4:00 PM
  },
  {
    id: 3,
    title: "Project Review",
    start: new Date(2024, 7, 14, 11, 30), // August 14, 2024, 11:30 AM
    end: new Date(2024, 7, 14, 12, 30), // August 14, 2024, 12:30 PM
  },
  {
    id: 4,
    title: "Marketing Update",
    start: new Date(2024, 7, 15, 14, 0), // August 15, 2024, 2:00 PM
    end: new Date(2024, 7, 15, 15, 0), // August 15, 2024, 3:00 PM
  },
  {
    id: 5,
    title: "Code Review",
    start: new Date(2024, 7, 16, 17, 0), // August 16, 2024, 5:00 PM
    end: new Date(2024, 8, 16, 18, 30), // August 16, 2024, 6:30 PM
  },
  {
    id: 6,
    title: "Design Workshop",
    start: new Date(2024, 7, 17, 10, 30), // August 17, 2024, 10:30 AM
    end: new Date(2024, 7, 17, 12, 0), // August 17, 2024, 12:00 PM
  },
  {
    id: 7,
    title: "Sprint Planning",
    start: new Date(2024, 9, 18, 9, 30), // August 18, 2024, 9:30 AM
    end: new Date(2024, 7, 18, 11, 0), // August 18, 2024, 11:00 AM
  },
  {
    id: 8,
    title: "Weekly Sync",
    start: new Date(2024, 7, 19, 13, 30), // August 19, 2024, 1:30 PM
    end: new Date(2024, 7, 19, 14, 30), // August 19, 2024, 2:30 PM
  },
  {
    id: 9,
    title: "Leadership Meeting",
    start: new Date(2024, 7, 20, 16, 0), // August 20, 2024, 4:00 PM
    end: new Date(2024, 8, 20, 17, 30), // August 20, 2024, 5:30 PM
  },
];

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
        events={myEventsList}
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
