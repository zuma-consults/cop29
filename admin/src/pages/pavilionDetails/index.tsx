import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { formatDate1 } from "../../utils/helper";
import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from "@mui/material";
import { Button } from "@mui/material";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useApproveSideEvent, useDeclineSideEvent } from "../../hooks/useEvent";
import Loader from "../../components/ui/Loader";
import { BiEditAlt } from "react-icons/bi";
import UploadPayment from "../../components/upload-payment";

const EventDetails: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const event = location.state as {
    status: string;
    title: string;
    start: string;
    end: string;
    description: string;
    organizer: string;
    id: number;
    countId: number;
    proofOfPayment: any;
    noOfSpeakers: number;
  };

  if (!event) {
    return <div>Meeting not found</div>;
  }
  const {
    title,
    start,
    end,
    description,
    organizer,
    id,
    proofOfPayment,
    noOfSpeakers,
  } = event;

  console.log("xxxxx side-event", event);

  const [openApproveDialog, setOpenApproveDialog] = React.useState(false);
  const [openDeclineDialog, setOpenDeclineDialog] = React.useState(false);
  const [status, setStatus] = useState(event.status);
  const handleApproveClick = () => setOpenApproveDialog(true);
  const handleDeclineClick = () => setOpenDeclineDialog(true);
  const handleClose = () => {
    setOpenApproveDialog(false);
    setOpenDeclineDialog(false);
  };

  const { mutate: mutateApproval, isLoading: loadingApproval } =
    useApproveSideEvent();
  const { mutate: mutateDecline, isLoading: loadingDecline } =
    useDeclineSideEvent();

  const handelActionEvent = async (type: string) => {
    if (type === "approve") {
      mutateApproval(id, {
        onSuccess: () => {
          setStatus("approved");
        },
      });
    } else if (type === "declined") {
      mutateDecline(id, {
        onSuccess: () => {
          setStatus("declined");
        },
      });
    }
  };

  return (
    <>
      {(loadingApproval || loadingDecline) && <Loader />}

      <div className="px-5 py-10 bg-gray-100">
        <div className="flex items-center justify-between mb-5">
          <Button
            variant="outlined"
            color="success"
            startIcon={<IoArrowBackCircleOutline />}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
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
            Upload Proof of Payment
            <BiEditAlt size={20} />
          </Button>
        </div>

        <div className="relative  border-green-200 pb-6 sm:pb-8 md:pb-10">
          <div className="mt-6 sm:mt-8 md:mt-10 grid gap-4 sm:gap-6 md:gap-8">
            <div>
              {status === "approved" ? (
                <Chip
                  label={status}
                  color="success"
                  sx={{
                    textTransform: "capitalize",
                  }}
                />
              ) : (
                <Chip
                  label={status}
                  color="warning"
                  sx={{
                    textTransform: "capitalize",
                  }}
                />
              )}

              <div className="text-gray-900 text-[24px] sm:text-[32px] md:text-[40px] w-full md:w-[50%] font-bold">
                Title: {title}
              </div>
            </div>
            <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-1 sm:gap-2 md:gap-3">
              Date and Time:
              <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
                {`From ${formatDate1(start)} to ${formatDate1(end)}`}
              </p>
            </div>
            <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-2 sm:gap-3">
              Organizer:
              <div className="w-full text-[12px] sm:text-[14px] text-gray-600 font-normal">
                {organizer}
              </div>
            </div>
            <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-2 sm:gap-3">
              Description:
              <div className="w-full text-[12px] sm:text-[14px] text-gray-600 font-normal">
                {description ? description : "N/A"}
              </div>
            </div>

            <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-2 sm:gap-3">
              Organization:
              <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
                {organizer ? organizer : "N/A"}
              </p>
            </div>
            <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-2 sm:gap-3">
              No. of Speakers:
              <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
                {noOfSpeakers ? noOfSpeakers : "N/A"}
              </p>
            </div>
            <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-2 sm:gap-3">
              Paid
              <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
                {proofOfPayment && proofOfPayment.length > 0 ? (
                  <Chip
                    label="Yes"
                    color="success"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  />
                ) : (
                  <Chip
                    label="No"
                    color="warning"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  />
                )}
              </p>
            </div>
          </div>
          <div>
            <hr
              style={{
                height: "1px",
                backgroundColor: "#2E7D31",
                border: "none",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            />
          </div>
          {status !== "approved" && status !== "declined" && (
            <div className="flex items-center justify-end gap-10">
              {status === "pending" ? (
                <Button
                  variant="contained"
                  color="success"
                  className="absolute bottom-0 right-0"
                  onClick={handleApproveClick}
                  disabled={loadingApproval}
                >
                  Approve
                </Button>
              ) : null}

              <Button
                variant="contained"
                color="error"
                className="absolute bottom-0 right-0"
                onClick={handleDeclineClick}
                disabled={loadingDecline}
              >
                Decline
              </Button>
            </div>
          )}
        </div>
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
          <UploadPayment setOpen={setOpen} event={event} />
        </Box>
      </Modal>
      <Dialog open={openApproveDialog} onClose={handleClose}>
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve this meeting?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handelActionEvent("approve");
            }}
            color="success"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeclineDialog} onClose={handleClose}>
        <DialogTitle>Confirm Decline</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to decline this meeting?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handelActionEvent("declined");
            }}
            color="error"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventDetails;
