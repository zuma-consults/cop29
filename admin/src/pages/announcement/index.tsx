import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import AnnouncementTable from "../../components/tabel/AnnouncementTable";
import { IoCreateSharp } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";

interface FormData {
  subject: string;
  message: string;
  sender: string;
}

const Announcement: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { control, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("New Announcement Data:", data);
    // Handle the creation of a new announcement here
    reset(); // Reset the form after submission
    setOpen(false); // Close the modal
  };

  return (
    <>
      <div>
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
              Announcement
            </Typography>
          </Box>

          <div className="flex flex-col gap-2 px-5 md:px-0  sm:mt-[2.5rem] mt-1">
            <div className="flex align-center md:flex-row flex-col sm:gap-10 w-auto justify-between">
              <span className="text-sm font-extrabold text-[#2E7D31]">
                All Announcements
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
                Create new announcement
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
        </div>
        <AnnouncementTable />
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            maxHeight: "90vh",
            overflowY: "auto",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" textAlign={"center"} mb={2}>
            Create New Announcement
          </Typography>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Subject" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Message"
                fullWidth
                margin="normal"
                multiline
                rows={4} // Adjust the number of rows as needed
              />
            )}
          />
          <Controller
            name="sender"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Sender" fullWidth margin="normal" />
            )}
          />
          <Box className="flex justify-between mt-4">
            <Button type="submit" variant="contained" color="success">
              Create
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Announcement;
