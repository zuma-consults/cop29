import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, Chip } from "@mui/material";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Loader from "../../components/ui/Loader";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  useApproveOrganisation,
  useDeclineOrganisation,
} from "../../hooks/useOrganisation";
import { useQueryClient } from "react-query";

const OrganisationDetails: React.FC = () => {
  const location = useLocation();
  const organization = location.state as {
    name: string;
    email: string;
    id: number;
    phone: string;
    category: string;
    contactDesignation: string;
    documentSupportingAttendance?: string;
    contactIdCard: string;
    letterProof?: string;
    state: string;
    thematicArea: string;
    reasonForAttendance: string;
    status: string;
    contactName: string;
    delegates: Array<{
      name: string;
      email: string;
      designation: string;
      passport: string;
    }>;
  };

  if (!organization) {
    return <div>Organization not found</div>;
  }

  const {
    name,
    email,
    phone,
    category,
    contactDesignation,
    documentSupportingAttendance,
    contactIdCard,
    letterProof,
    state,
    thematicArea,
    reasonForAttendance,
    id,
    contactName,
    delegates,
  } = organization;

  const [openApproveDialog, setOpenApproveDialog] = React.useState(false);
  const [openDeclineDialog, setOpenDeclineDialog] = React.useState(false);
  const [status, setStatus] = useState(organization.status);
  const handleApproveClick = () => setOpenApproveDialog(true);
  const handleDeclineClick = () => setOpenDeclineDialog(true);
  const handleClose = () => {
    setOpenApproveDialog(false);
    setOpenDeclineDialog(false);
  };

  const queryClient = useQueryClient();

  const { mutate: mutateApproval, isLoading: loadingOrganisation } =
    useApproveOrganisation();
  const { mutate: mutateDecline, isLoading: loadingDecline } =
    useDeclineOrganisation();

  const handleActionOrganisation = async (type: string) => {
    const mutationFn = type === "approved" ? mutateApproval : mutateDecline;
    const newStatus = type === "approved" ? "approved" : "rejected";

    mutationFn(id, {
      onSuccess: () => {
        setStatus(newStatus);
        queryClient.invalidateQueries("AllOrganisation");
      },
      onError: (error) => {
        console.error(`${type} failed:`, error);
      },
    });
  };

  return (
    <>
      {loadingOrganisation || (loadingDecline && <Loader />)}
      <div className="px-5 py-10 bg-gray-100">
        <div className="flex items-center justify-start mb-5">
          <Button
            variant="outlined"
            color="success"
            startIcon={<IoArrowBackCircleOutline />}
            onClick={() => window.history.back()}
          >
            Go Back
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
              ) : status === "pending" ? (
                <Chip
                  label={status}
                  color="warning"
                  sx={{
                    textTransform: "capitalize",
                  }}
                />
              ) : (
                <Chip
                  label={status}
                  color="error"
                  sx={{
                    textTransform: "capitalize",
                  }}
                />
              )}

              <div className="text-gray-900 text-[24px] sm:text-[32px] md:text-[40px] w-full md:w-[50%] font-bold">
                {name}
              </div>
            </div>

            <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-1 sm:gap-2 md:gap-3">
              <strong>Contact Information:</strong>
              <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
                <strong>Email:</strong> {email}
              </p>
              <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
                <strong>Phone:</strong> {phone}
              </p>
              <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
                <strong>Category:</strong>
                {category}
              </p>
              <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
                <strong>Contact Name:</strong> {contactName}
                {/* Add contactName */}
              </p>
              <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
                <strong>Contact Designation:</strong> {contactDesignation}
              </p>
              <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
                <strong>State:</strong> {state}
              </p>
              <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
                <strong>Delegates added:</strong> {delegates?.length}
              </p>
              <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
                <strong>Thematic Area:</strong> {thematicArea}
                {/* Add thematic area */}
              </p>
              <p className="text-gray-600 text-[12px] sm:text-[14px]  text-justify font-medium">
                <strong>Reason for Attendance:</strong> {reasonForAttendance}
                {/* Add reason */}
              </p>
            </div>

            <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-2 sm:gap-3">
              Supporting Documents
              <div className="text-[12px] sm:text-[14px] text-gray-600 font-normal">
                <a
                  href={contactIdCard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  ID Card
                </a>
              </div>
              <div className="text-[12px] sm:text-[14px] text-gray-600 font-normal">
                {/* <a
                  href={documentSupportingAttendance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Supporting Attendance Document
                </a> */}

                <a
                  href={documentSupportingAttendance}
                  target={
                    documentSupportingAttendance?.endsWith(".jpg")
                      ? "_blank"
                      : "_self"
                  } // Open in new tab if .jpg
                  rel={
                    documentSupportingAttendance?.endsWith(".jpg")
                      ? "noopener noreferrer"
                      : undefined
                  } // Add security only for new tab
                  download={!documentSupportingAttendance?.endsWith(".jpg")} // Download if not .jpg
                  className="text-blue-500 underline"
                >
                  Supporting Attendance Document
                </a>
              </div>
              <div className="text-[12px] sm:text-[14px] text-gray-600 font-normal">
                <a
                  href={letterProof}
                  target={letterProof?.endsWith(".jpg") ? "_blank" : "_self"} // Open in new tab if .jpg
                  rel={
                    letterProof?.endsWith(".jpg")
                      ? "noopener noreferrer"
                      : undefined
                  } // Add security only for new tab
                  download={!letterProof?.endsWith(".jpg")} // Download if not .jpg
                  className="text-blue-500 underline"
                >
                  Proof of Letter
                </a>
              </div>
            </div>

            {/* {delegates && delegates.length > 0 && (
              <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-2 sm:gap-3">
                Delegate Information
                {delegates.map((delegate, index) => (
                  <div key={index} className="text-gray-600">
                    <p>
                      Name: {delegate.name} <br />
                      Email: {delegate.email} <br />
                      Designation: {delegate.designation} <br />
                      <a
                        href={delegate.passport}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Passport
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            )} */}
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
          <div className="flex justify-end my-5 mx-5">
            {/* Action Buttons for Pending Status */}
            {status === "pending" && (
              <Box className="flex justify-between gap-5 mt-4">
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleApproveClick}
                  disabled={loadingOrganisation}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeclineClick}
                  disabled={loadingDecline}
                >
                  Decline
                </Button>
              </Box>
            )}
          </div>
        </div>
      </div>
      <Dialog open={openApproveDialog} onClose={handleClose}>
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve this organisation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleActionOrganisation("approved");
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
            Are you sure you want to decline this organisation
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleActionOrganisation("rejected");
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

export default OrganisationDetails;
