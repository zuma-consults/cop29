import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useCreateEvent, useGetAllTimeSlots } from "../../hooks/useEvent";
import Loader from "../ui/Loader";

const CreateMeeting: React.FC<{
  setOpenSchedule: (value: boolean) => void;
  refetchAllEvents: () => void;
}> = ({ setOpenSchedule, refetchAllEvents }) => {
  const setOpen = (value: boolean) => {};
  const { mutate, isLoading } = useCreateEvent({ setOpen, refetchAllEvents });

  const { data: timslotsData, isLoading: loadingTimeSlots } =
    useGetAllTimeSlots();
  const extratedTimeSlots = timslotsData?.data || [];
  const openSlots = extratedTimeSlots.filter(
    (slot: { bookingStatus: any }) => slot.bookingStatus
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      timeSlot: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Meeting title is required"),
      organizer: Yup.string().required("Organization is required"),
      timeSlot: Yup.string().required("Time slot is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("slotId", values.timeSlot);

      mutate(formData);
    },
  });

  return (
    <>
      {isLoading || (loadingTimeSlots && <Loader />)}
      <div className="flex items-center justify-center p-4 md:p-0">
        <div
          className="w-full max-w-4xl bg-white p-5 rounded-lg shadow-lg"
          data-aos="Meeting-in-right"
        >
          <h1 className="text-green-700 font-bold text-[26px] text-center md:text-left">
            Schedule a Meeting
          </h1>

          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
          >
            {/* organisation slot */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <FormControl variant="outlined" color="success" fullWidth>
                <InputLabel id="organisation-label">
                  Select organisation name & Prefer time slot
                </InputLabel>
                <Select
                  labelId="Select organisation name & Prefer time slot"
                  id="timeSlot"
                  name="timeSlot"
                  value={formik.values.timeSlot}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.timeSlot && Boolean(formik.errors.timeSlot)
                  }
                  label="Time Slot"
                >
                  {openSlots?.map(
                    (slot: {
                      id: string;
                      timeSpan: any;
                      date: string | number | Date;
                      bookingStatus: string;
                    }) => (
                      <MenuItem
                        key={slot.id}
                        value={slot.id}
                        disabled={slot.bookingStatus === "booked"}
                      >
                        <div
                          className={`flex justify-between w-full ${
                            slot.bookingStatus === "booked"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <span className="w-[30%]">{slot.timeSpan}</span>
                          <span>---</span>
                          <span className="w-[30%]">
                            {new Date(slot.date).toLocaleDateString()}
                          </span>
                          <span>---</span>
                          <span>{slot.bookingStatus}</span>
                        </div>
                      </MenuItem>
                    )
                  )}
                </Select>
                {formik.touched.timeSlot && formik.errors.timeSlot && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.timeSlot}
                  </div>
                )}
              </FormControl>
            </div>
            {/* time slot */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <FormControl variant="outlined" color="success" fullWidth>
                <InputLabel id="timeSlot-label">Time Slot</InputLabel>
                <Select
                  labelId="timeSlot-label"
                  id="timeSlot"
                  name="timeSlot"
                  value={formik.values.timeSlot}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.timeSlot && Boolean(formik.errors.timeSlot)
                  }
                  label="Time Slot"
                >
                  {openSlots?.map(
                    (slot: {
                      id: string;
                      timeSpan: any;
                      date: string | number | Date;
                      bookingStatus: string;
                    }) => (
                      <MenuItem
                        key={slot.id}
                        value={slot.id}
                        disabled={slot.bookingStatus === "booked"}
                      >
                        <div
                          className={`flex justify-between w-full ${
                            slot.bookingStatus === "booked"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <span className="w-[30%]">{slot.timeSpan}</span>
                          <span>---</span>
                          <span className="w-[30%]">
                            {new Date(slot.date).toLocaleDateString()}
                          </span>
                          <span>---</span>
                          <span>{slot.bookingStatus}</span>
                        </div>
                      </MenuItem>
                    )
                  )}
                </Select>
                {formik.touched.timeSlot && formik.errors.timeSlot && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.timeSlot}
                  </div>
                )}
              </FormControl>
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-center">
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="success" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateMeeting;
