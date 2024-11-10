import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { IoCreateSharp } from "react-icons/io5";
import PavilionTable from "../../components/tabel/PavilionTable";
import CreatePavilion from "../../components/create-pavilion";
import { useGetAllSideEvents } from "../../hooks/useEvent";
import Loader from "../../components/ui/Loader";

const Event: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { refetch, isFetching} = useGetAllSideEvents();

  return (
    <>
      {isFetching && <Loader />}
      <div className="w-[100%] h-[100%] relative overflow-x-hidden">
        <div className="flex flex-col gap-2 px-5 md:px-0  sm:mt-[2.5rem] mt-1">
          <div className="flex align-center md:flex-row flex-col sm:gap-10 w-auto justify-between">
            <span className="text-sm  font-extrabold text-[#2E7D31]">
              Pavilion
            </span>
            <div className="flex flex-row gap-5">
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
                Create side event
                <IoCreateSharp size={20} />
              </Button>
            </div>
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
          <PavilionTable />
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
              width: { xs: "90%", sm: "80%", md: "60%" },
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
            <CreatePavilion setOpen={setOpen} refetchAllEvents={refetch} />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Event;
