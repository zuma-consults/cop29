import React, { useMemo } from "react";
import { Views, momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography } from "@mui/material";
import { useGetCalender } from "../../hooks/useEvent";
import Loader from "../../components/ui/Loader";

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

  return (
    <>
      {isFetching && <Loader />}
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
          <Typography
            variant="h6"
            textAlign={"center"}
            sx={{ color: "#908E8F" }}
          >
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
    </>
  );
};

export default MyCalendar;
