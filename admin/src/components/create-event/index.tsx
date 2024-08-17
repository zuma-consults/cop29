import React, { useMemo} from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useCreateEvent, useGetAllTimeSlots } from "../../hooks/useEvent";
import Loader from "../ui/Loader";
import { useOrganisation } from "../../hooks/useOrganisation";

const CreateEvent: React.FC<{
  setOpen: (value: boolean) => void;
  refetchAllEvents: () => void;
}> = ({ setOpen, refetchAllEvents }) => {
  const { mutate, isLoading } = useCreateEvent({ setOpen, refetchAllEvents });

  const memoizedFilters = useMemo(
    () => ({
      userType: "organization",
    }),
    []
  );

  const { data: organisationData, isLoading: loadingOrganisation } = useOrganisation(memoizedFilters);

  const { data: timslotsData, isLoading: loadingTimeSlots } = useGetAllTimeSlots();
  const extratedOrganisationData = organisationData?.data?.users || [];
  const extratedTimeSlots = timslotsData?.slots || [];
  const openSlots = extratedTimeSlots.filter(
    (slot: { bookingStatus: any }) => slot.bookingStatus
  );

  const formik = useFormik({
    initialValues: {
      imageUrl: null,
      title: "",
      externalLink: "",
      description: "",
      objective: "",
      tags: "",
      timeSlot: "",
      organization: "",
    },
    validationSchema: Yup.object({
      imageUrl: Yup.mixed().required("Image is required"),
      title: Yup.string().required("Event title is required"),
      externalLink: Yup.string()
        .url("Invalid URL")
        .required("Meeting link is required"),
      description: Yup.string().required("Event description is required"),
      tags: Yup.string().required("Tags are required"),
      objective: Yup.string().required("Event objective is required"),
      timeSlot: Yup.string().required("Time slot is required"),
      organization: Yup.string().required("Organization name is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      if (values.imageUrl !== null) {
        formData.append("image", values.imageUrl);
      }
      formData.append("title", values.title);
      formData.append("externalLink", values.externalLink);
      formData.append("description", values.description);
      formData.append("objective", values.objective);
      formData.append("slotId", values.timeSlot);
      formData.append("organizerId", values.organization);
      formData.append(
        "tags",
        values.tags
          .split(",")
          .map((tag) => tag.trim())
          .join(",")
      );
      formData.append("status", "approved");
      mutate(formData);
    },
  });

  return (
    <>
      {isLoading || loadingOrganisation || loadingTimeSlots && <Loader />}
      <div className="flex items-center justify-center p-4 md:p-0">
        <div
          className="w-full max-w-4xl bg-white p-5 rounded-lg shadow-lg"
          data-aos="Meeting-in-right"
        >
          <h1 className="text-green-700 font-bold text-[26px] text-center md:text-left">
            Create an Event
          </h1>
          <div
            className="p-6 rounded-lg w-full flex flex-col cursor-pointer items-center justify-center gap-3 mt-2 bg-green-50"
            onClick={() => document.getElementById("imageUrl")?.click()}
          >
            <h2 className="text-gray-600 font-bold text-center">
              Upload Event Header Image
            </h2>
            <input
              id="imageUrl"
              name="imageUrl"
              type="file"
              accept="image/jpeg, image/png"
              onChange={(event) => {
                if (event?.currentTarget?.files) {
                  formik.setFieldValue(
                    "imageUrl",
                    event.currentTarget.files[0]
                  );
                }
              }}
              onBlur={formik.handleBlur}
              style={{ display: "none" }}
            />
            <MdOutlineCloudUpload className="text-[46px] text-green-700" />

            <span className="text-gray-500">Supported formats: JPEG, PNG</span>

            {/* Image Preview */}
            {formik.values.imageUrl && (
              <div className="mt-1 flex flex-col justify-center items-center">
                <img
                  src={URL.createObjectURL(formik.values.imageUrl)}
                  alt="Selected Image"
                  className="w-32 h-32 object-cover rounded-md"
                />
                <p className="text-gray-600 mt-2">
                  {(formik.values.imageUrl as File)?.name}
                </p>
              </div>
            )}

            {formik.touched.imageUrl && formik.errors.imageUrl ? (
              <div className="text-red-500 text-sm">
                {formik.errors.imageUrl}
              </div>
            ) : null}
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
          >
            {/* Event Title */}
            <div className="flex flex-col gap-2">
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
            </div>

            {/* Meeting Link */}
            <div className="flex flex-col gap-2">
              <TextField
                id="externalLink"
                name="externalLink"
                label="Meeting Link"
                color="success"
                variant="outlined"
                value={formik.values.externalLink}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.externalLink &&
                  Boolean(formik.errors.externalLink)
                }
                helperText={
                  formik.touched.externalLink && formik.errors.externalLink
                }
                fullWidth
              />
            </div>
            {/* time slot */}
            <div className="flex flex-col gap-2">
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
                    }) => (
                      <MenuItem key={slot.id} value={slot.id}>
                        {`${slot.timeSpan} - ${new Date(
                          slot.date
                        ).toLocaleDateString()}`}
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

            {/* organization name */}
            <div className="flex flex-col gap-2">
              <FormControl variant="outlined" color="success" fullWidth>
                <InputLabel id="organization-label">Organization</InputLabel>
                <Select
                  labelId="organization-label"
                  id="organization"
                  name="organization"
                  value={formik.values.organization}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.organization &&
                    Boolean(formik.errors.organization)
                  }
                  label="Organization"
                >
                  {extratedOrganisationData?.map(
                    (org: { id: string; name: string }) => (
                      <MenuItem key={org.id} value={org.id}>
                        {org.name}
                      </MenuItem>
                    )
                  )}
                </Select>
                {formik.touched.organization && formik.errors.organization && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.organization}
                  </div>
                )}
              </FormControl>
            </div>

            {/* Event Description */}
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

            {/* event objective */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <TextField
                id="objective"
                name="objective"
                label="Event Objective"
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

            {/* tags */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <TextField
                id="tags"
                name="tags"
                label="Tags (comma-separated)"
                variant="outlined"
                color="success"
                value={formik.values.tags}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.tags && Boolean(formik.errors.tags)}
                helperText={formik.touched.tags && formik.errors.tags}
                fullWidth
              />
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-center">
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
              >
                Submit Event
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
