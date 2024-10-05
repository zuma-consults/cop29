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
import {
  useGetAllTimeSlots,
  useScheduleMeeting,
  useGetAllApprovedOrganizations,
} from "../../hooks/useEvent";
import Loader from "../ui/Loader";

const CreateMeeting: React.FC<{
  setOpenSchedule: (value: boolean) => void;
  refetchAllEvents: () => void;
}> = ({ refetchAllEvents }) => {
  const setOpen = (value: boolean) => {};
  const { mutate, isLoading } = useScheduleMeeting({
    setOpen,
    refetchAllEvents,
  });

  const { data: timslotsData, isLoading: loadingTimeSlots } =
    useGetAllTimeSlots();

  const {
    data: approvedOrganisationData,
    isLoading: loadingApprovedOrganisation,
  } = useGetAllApprovedOrganizations();
  console.log("approvedOrganisationData", approvedOrganisationData);

  const extratedTimeSlots = timslotsData?.data || [];

  const openSlots = extratedTimeSlots.filter(
    (slot: { bookingStatus: any }) => slot.bookingStatus
  );

  const openOrganizations = approvedOrganisationData?.data?.organizations || [];

  const formik = useFormik({
    initialValues: {
      title: "",
      organizer: "",
      description: "",
      objective: "",
      slotId: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Meeting title is required"),
      organizer: Yup.string().required("Organization is required"),
      description: Yup.string().required("Meeting description is required"),
      objective: Yup.string().required("Meeting objective is required"),
      slotId: Yup.string().required("Time slot is required"),
    }),
    onSubmit: async (values) => {
      const formData = {
        title: values.title,
        organizerId: values.organizer,
        description: values.description,
        objective: values.objective,
        slotId: values.slotId,
      };

      mutate(formData);
    },
  });

  return (
    <>
      {isLoading ||
        loadingTimeSlots ||
        (loadingApprovedOrganisation && <Loader />)}
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
            {/* Meeting Title */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
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

            {/* organizer slot */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <FormControl variant="outlined" color="success" fullWidth>
                <InputLabel id="organizer">Select Organisation</InputLabel>
                <Select
                  labelId="organizer"
                  id="organizer"
                  name="organizer"
                  value={formik.values.organizer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.organizer && Boolean(formik.errors.organizer)
                  }
                  label="Select Organisation"
                >
                  {openOrganizations?.map(
                    (organizer: {
                      id: string;
                      email: string;
                      date: string | number | Date;
                      name: string;
                      category: string;
                    }) => (
                      <MenuItem key={organizer.id} value={organizer.id}>
                        <div className={`flex justify-start w-full `}>
                          <span className="w-[30%]">{organizer.name}</span>
                          <span className="w-[30%]">{organizer.category}</span>
                          <span>{organizer.email}</span>
                        </div>
                      </MenuItem>
                    )
                  )}
                </Select>
                {formik.touched.organizer && formik.errors.organizer && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.organizer}
                  </div>
                )}
              </FormControl>
            </div>

            {/* time slot */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <FormControl variant="outlined" color="success" fullWidth>
                <InputLabel id="slotId">
                  Select Organisation preferred time
                </InputLabel>
                <Select
                  labelId="slotId"
                  id="slotId"
                  name="slotId"
                  value={formik.values.slotId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.slotId && Boolean(formik.errors.slotId)}
                  label="Select Organisation preferred time"
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
                {formik.touched.slotId && formik.errors.slotId && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.slotId}
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

export default CreateMeeting;
