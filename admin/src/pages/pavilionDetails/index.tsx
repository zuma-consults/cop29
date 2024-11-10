import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { formatDate1 } from "../../utils/helper";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Loader from "../../components/ui/Loader";
// import { useApproveBooking, useDeclineBooking } from "../../hooks/useBooking";

interface TableRow {
  id: string;
  title: string;
  date: string;
  start: string;
  end: string;
  bookingStatus: string;
  timeSpan: string;
}

const PavilionDetails: React.FC = () => {
  const location = useLocation();
  const pavilion = location.state as {
    title: string;
    id: string;
    bookings: Array<TableRow>;
  };

  if (!pavilion) {
    return <div>Pavilion not found</div>;
  }

  const { title, bookings } = pavilion;

  const [selectedBooking, setSelectedBooking] = useState<TableRow | null>(null);
  const [openDialog, setOpenDialog] = useState<"approve" | "decline" | null>(
    null
  );

  // const { mutate: mutateApproval, isLoading: loadingApproval } = useApproveBooking();
  // const { mutate: mutateDecline, isLoading: loadingDecline } = useDeclineBooking();

  const handleDialogOpen = (
    booking: TableRow,
    action: "approve" | "decline"
  ) => {
    setSelectedBooking(booking);
    setOpenDialog(action);
  };

  const handleDialogClose = () => {
    setSelectedBooking(null);
    setOpenDialog(null);
  };

  // const handleAction = (actionType: "approve" | "decline") => {
  //   if (!selectedBooking) return;
  //   // const mutateFn = actionType === "approve" ? mutateApproval : mutateDecline;

  //   mutateFn(selectedBooking.id, {
  //     onSuccess: () => {
  //       selectedBooking.bookingStatus = actionType === "approve" ? "approved" : "declined";
  //       handleDialogClose();
  //     },
  //   });
  // };

  return (
    <div className="px-5 py-10 bg-gray-100">
      {/* {(loadingApproval || loadingDecline) && <Loader />} */}

      <div className="flex items-center justify-between mb-5">
        <Button
          variant="outlined"
          color="success"
          startIcon={<IoArrowBackCircleOutline />}
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>

      <div className="relative border-green-200 pb-6">
        <Typography variant="h5" fontWeight="bold">
          Pavilion Details
        </Typography>
        <Typography variant="subtitle1">
          <strong>Title:</strong> {title || "N/A"}
        </Typography>

        <hr style={{ margin: "1rem 0", border: "1px solid #2E7D31" }} />

        <Typography variant="h6" fontWeight="bold">
          Bookings
        </Typography>
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => (
            <Box key={booking.id} className="my-3 p-3 border rounded">
              <Typography variant="subtitle1">
                <strong>Booking Title:</strong> {booking.title || "Untitled"}
              </Typography>
              <Typography variant="body2">
                <strong>Date:</strong> {formatDate1(booking.date)}
              </Typography>
              <Typography variant="body2">
                <strong>Time Span:</strong> {booking.timeSpan}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {booking.bookingStatus}
              </Typography>

              {booking?.bookingStatus !== "approved" &&
                booking.bookingStatus !== "declined" && (
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleDialogOpen(booking, "approve")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDialogOpen(booking, "decline")}
                    >
                      Decline
                    </Button>
                  </div>
                )}
            </Box>
          ))
        ) : (
          <Typography variant="body2">No bookings available.</Typography>
        )}
      </div>

      {/* Approve/Decline Dialog */}
      <Dialog open={!!openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {openDialog === "approve" ? "Confirm Approval" : "Confirm Decline"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {openDialog} this booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            // onClick={() => handleAction(openDialog as "approve" | "decline")}
            color={openDialog === "approve" ? "success" : "error"}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PavilionDetails;
