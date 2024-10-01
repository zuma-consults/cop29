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

const CreateEvent: React.FC<{
  setOpen: (value: boolean) => void;
  refetchAllEvents: () => void;
}> = ({ setOpen, refetchAllEvents }) => {
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
      organizer: "",
      description: "",
      objective: "",
      timeSlot: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Meeting title is required"),
      organizer: Yup.string().required("Organization is required"),
      description: Yup.string().required("Meeting description is required"),
      objective: Yup.string().required("Meeting objective is required"),
      timeSlot: Yup.string().required("Time slot is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("objectives", values.objective);
      formData.append("slotId", values.timeSlot);
      formData.append("organizer", values.organizer);
      // formData.append("status", "approved");
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
            Schedule a Meeting (International Organization)
          </h1>

          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
          >
            {/* Meeting Title */}
            <div className="flex flex-col gap-2">
              <TextField
                id="title"
                name="title"
                label="Meeting Title"
                color="success"
                variant="outlined"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                fullWidth
              />
            </div>

            {/* Organizer */}
            <div className="flex flex-col gap-2">
              <TextField
                id="organizer"
                name="organizer"
                label="Organization"
                color="success"
                variant="outlined"
                value={formik.values.organizer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.organizer && Boolean(formik.errors.organizer)
                }
                helperText={formik.touched.organizer && formik.errors.organizer}
                fullWidth
              />
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

            {/* Meeting Description */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <TextField
                id="description"
                name="description"
                label="Meeting Description"
                variant="outlined"
                color="success"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                multiline
                rows={4}
                fullWidth
              />
            </div>

            {/* Meeting objective */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <TextField
                id="objective"
                name="objective"
                label="Meeting Objective"
                variant="outlined"
                color="success"
                value={formik.values.objective}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.objective && Boolean(formik.errors.objective)
                }
                helperText={formik.touched.objective && formik.errors.objective}
                multiline
                rows={4}
                fullWidth
              />
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

export default CreateEvent;
