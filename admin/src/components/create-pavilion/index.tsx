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
import { useCreateSideEvent, useGetAllPavilion } from "../../hooks/useEvent";
import Loader from "../ui/Loader";

const CreatePavilion: React.FC<{
  setOpen: (value: boolean) => void;
  refetchAllEvents: () => void;
}> = ({ setOpen, refetchAllEvents }) => {
  const { mutate, isLoading } = useCreateSideEvent({
    setOpen,
    refetchAllEvents,
  });
  const { data: timslotsData, isLoading: loadingTimeSlots } =
    useGetAllPavilion();

  const extratedTimeSlots = timslotsData?.data || [];
  const openSlots = extratedTimeSlots;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      organizer: "",
      email: "",
      requirements: "N/A",
      timeSlot: "",
      noOfSpeakers: 1, // Defaulting to 1 speaker
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Meeting title is required"),
      organizer: Yup.string().required("Organizer is required"),
      description: Yup.string().required("Meeting description is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      timeSlot: Yup.string().required("Time slot is required"),
    }),
    onSubmit: async (values) => {
      // Structure the payload for backend
      const payload = {
        slotArray: [values.timeSlot],
        title: values.title,
        description: values.description,
        noOfSpeakers: values.noOfSpeakers,
        organizer: values.organizer,
        email: values.email,
        requirements: values.requirements,
      };

      mutate(payload);
    },
  });

  return (
    <>
      {isLoading || (loadingTimeSlots && <Loader />)}
      <div className="flex items-center justify-center p-4 md:p-0">
        <div className="w-full max-w-4xl bg-white p-5 rounded-lg shadow-lg">
          <h1 className="text-green-700 font-bold text-[26px] text-center md:text-left">
            Create Pavilion Event
          </h1>

          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
          >
            {/* Title */}
            <TextField
              id="title"
              name="title"
              label="Event Title"
              color="success"
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              fullWidth
            />

            {/* Organizer */}
            <TextField
              id="organizer"
              name="organizer"
              label="Organizer"
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
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              {/* Email */}
              <TextField
                id="email"
                name="email"
                label="Organizer Email"
                color="success"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />
            </div>

            {/* Time Slot */}

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

            {/* Description */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <TextField
                id="description"
                name="description"
                label="Event Description"
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

            {/* Requirements */}
            <TextField
              id="requirements"
              name="requirements"
              label="Requirements"
              variant="outlined"
              color="success"
              value={formik.values.requirements}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />

            {/* Number of Speakers */}
            <TextField
              id="noOfSpeakers"
              name="noOfSpeakers"
              label="Number of Speakers"
              type="number"
              color="success"
              variant="outlined"
              value={formik.values.noOfSpeakers}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.noOfSpeakers &&
                Boolean(formik.errors.noOfSpeakers)
              }
              helperText={
                formik.touched.noOfSpeakers && formik.errors.noOfSpeakers
              }
              fullWidth
              InputProps={{ inputProps: { min: 1 } }}
            />

            <div className="col-span-1 md:col-span-2 flex justify-center">
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
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

export default CreatePavilion;
