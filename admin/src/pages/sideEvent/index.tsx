import { Box, Button, Grid, Modal } from "@mui/material";
import React, { useState } from "react";
import { SummaryCard } from "../../components/custom";
import EventTable from "../../components/tabel/EventTable";
import { EventSummaryCardData } from "../../utils/datas/summary-card";
import { IoCreateSharp } from "react-icons/io5";
import CreateEvent from "../../components/create-event";
import { useGetAllEvents } from "../../hooks/useEvent";
import Loader from "../../components/ui/Loader";

const Event: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { refetch, isFetching } = useGetAllEvents();

  return (
    <>
      {isFetching && <Loader />}
      <div className="w-[100%] h-[100%] relative overflow-x-hidden">
        <Box sx={{ marginTop: "10px" }}>
          <Grid container spacing={3}>
            {EventSummaryCardData?.map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <SummaryCard
                  icon={card.icon}
                  title={card.title}
                  number={card.number}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <div className="flex flex-col gap-2 px-5 md:px-0  sm:mt-[2.5rem] mt-1">
          <div className="flex align-center md:flex-row flex-col sm:gap-10 w-auto justify-between">
            <span className="text-sm  font-extrabold text-[#2E7D31]">
              All Events
            </span>
            <Button
              onClick={() => setOpen(true)}
              sx={{
                backgroundColor: "green",
                color: "white",
                width: "fit-content",
                paddingY: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontSize: "13px",
                gap: "8px",
                "&:hover": {
                  backgroundColor: "#e8f5e9",
                  color: "black",
                },
              }}
            >
              Create a new event
              <IoCreateSharp size={20} />
            </Button>
          </div>

          <div>
            <div className="w-[103px] h-[8px] bg-[#2E7D31]"></div>
            <hr
              style={{
                height: "1px",
                backgroundColor: "#2E7D31",
                border: "none",
              }}
            />
          </div>
        </div>
        <div>
          <EventTable />
        </div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="create-event-modal"
          aria-describedby="create-event-form"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              my: 10,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              maxHeight: "90vh",
              overflowY: "auto",
              margin: "auto",
              outline: "none",
              borderRadius: "8px",
            }}
          >
            <CreateEvent setOpen={setOpen} refetchAllEvents={refetch} />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Event;
