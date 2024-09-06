import React from "react";
import { useLocation } from "react-router-dom";
import { formatDate1 } from "../../utils/helper";
import { Button, Chip } from "@mui/material";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {
  useApproveEvent,
  useDeclineEvent,
  useGenerateInvoice,
} from "../../hooks/useEvent";
import Loader from "../../components/ui/Loader";

const EventDetails: React.FC = () => {
  const location = useLocation();
  const event = location.state as {
    status: string;
    title: string;
    start: string;
    end: string;
    description: string;
    organizer: string;
    id: number;
    countId: number;
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  const { status, title, start, end, description, organizer, id, countId } =
    event;
  const { mutate: mutateApproval, isLoading: loadingApproval } =
    useApproveEvent();
  const { mutate: mutateDecline, isLoading: loadingDecline } =
    useDeclineEvent();
  const { mutate: mutateGenerateInvoice, isLoading: loadingGenerateInvoice } =
    useGenerateInvoice();

  const handelActionEvent = async (type: string) => {
    if (type === "approve") {
      mutateApproval(id);
    } else if (type === "decline") {
      mutateDecline(id);
    } else {
      mutateGenerateInvoice(countId);
    }
  };

  return (
    <>
      {loadingApproval ||
        loadingDecline ||
        (loadingGenerateInvoice && <Loader />)}

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
                {title}
              </div>
            </div>
            <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-1 sm:gap-2 md:gap-3">
              Date and Time
              <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
                {`From ${formatDate1(start)} to ${formatDate1(end)}`}
              </p>
            </div>
            <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-2 sm:gap-3">
              About this Event
              <div className="w-full text-[12px] sm:text-[14px] text-gray-600 font-normal">
                {description}
              </div>
            </div>

            <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-2 sm:gap-3">
              Organized by
              <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
                {organizer ? organizer : "N/A"}
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
          {
            status !== "approved" && (
          
          <div className="flex items-center justify-end gap-10">
            {status === "processing" ? (
              <Button
                variant="contained"
                color="success"
                className="absolute bottom-0 right-0"
                onClick={() => handelActionEvent("approve")}
                disabled={loadingApproval}
              >
                Approve
              </Button>
            ) : (
              <Button
                variant="contained"
                color="warning"
                className="absolute bottom-0 right-0"
                onClick={() => handelActionEvent("generateInvoice")}
              >
                Make payment
              </Button>
            )}

            <Button
              variant="contained"
              color="error"
              className="absolute bottom-0 right-0"
              onClick={() => handelActionEvent("decline")}
              disabled={loadingDecline}
            >
              Decline
            </Button>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventDetails;
