import React, { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useCreateEvent } from "../../hooks/useEvent";
import CalendarModal from "../CalendarModal";
import Loader from "../ui/Loader";

const CreateEvent: React.FC = () => {
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  const { mutate, isLoading } = useCreateEvent();

  const [openCalendar, setOpenCalendar] = useState(false);

  const handleDateSelection = (start: Date, end: Date) => {
    setSelectedStart(start);
    setSelectedEnd(end);
    formik.setFieldValue(
      "date",
      `${start.toISOString()} - ${end.toISOString()}`
    );
    const date = start.toISOString().split("T")[0]; // Extracts "YYYY-MM-DD"
    formik.setFieldValue("date", date);
  };

  const formik = useFormik({
    initialValues: {
      imageUrl: null, // Initialize as null for file input
      title: "",
      externalLink: "",
      date: "",
      location: "",
      description: "",
      tags: "",
      price: "",
    },
    validationSchema: Yup.object({
      imageUrl: Yup.mixed().required("Image is required"),
      title: Yup.string().required("Event title is required"),
      externalLink: Yup.string()
        .url("Invalid URL")
        .required("Zoom link is required"),
      date: Yup.string().required("Time of the event is required"),
      location: Yup.string().required("Location is required"),
      description: Yup.string().required("Event description is required"),
      tags: Yup.string().required("Tags are required"),
      price: Yup.string().required("Price is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      if (values.imageUrl !== null) {
        console.log("Image:", values.imageUrl);
        formData.append("image", values.imageUrl);
      }
      formData.append("title", values.title);
      formData.append("externalLink", values.externalLink);
      formData.append("date", values.date);
      formData.append("location", values.location);
      formData.append("description", values.description);
      // Convert comma-separated string to array and then to JSON string
      const tagsArray = values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0); // Remove any empty tags
      formData.append("tags", JSON.stringify(tagsArray)); // Convert array to JSON string

      formData.append("price", values.price);
      formData.append("start", selectedStart?.toISOString() || "");
      formData.append("end", selectedEnd?.toISOString() || "");

      mutate(formData);
    },
  });

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex items-center justify-center p-4 md:p-0">
        <div
          className="w-full max-w-4xl bg-white p-5 rounded-lg shadow-lg"
          data-aos="zoom-in-right"
        >
          <h1 className="text-green-700 font-bold text-[26px] text-center md:text-left">
            Create an Event
          </h1>
          <div
            className="p-6 rounded-lg w-full flex flex-col items-center justify-center gap-3 mt-2 bg-green-50"
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
            <span className="text-gray-400">
              Drag & Drop or choose a file to upload
            </span>
            <span className="text-gray-500">Supported formats: JPEG, PNG</span>

            {/* Image Preview */}
            {formik.values.imageUrl && (
              <div className="mt-4 text-center">
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

            {/* Zoom Link */}
            <div className="flex flex-col gap-2">
              <TextField
                id="externalLink"
                name="externalLink"
                label="Zoom Link"
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

            {/* Time of the Event */}
            <div className="flex flex-col gap-2">
              <TextField
                id="date"
                name="date"
                label="Time"
                variant="outlined"
                color="success"
                value={formik.values.date}
                onClick={() => setOpenCalendar(true)} // Open calendar modal on click
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
                fullWidth
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <TextField
                id="location"
                name="location"
                label="Location"
                variant="outlined"
                color="success"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.location && Boolean(formik.errors.location)
                }
                helperText={formik.touched.location && formik.errors.location}
                fullWidth
              />
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

            {/* Tags */}
            <div className="flex flex-col gap-2">
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

            {/* Organized By */}
            <div className="flex flex-col gap-2">
              <TextField
                id="price"
                name="price"
                label="Price"
                color="success"
                variant="outlined"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
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
        <CalendarModal
          open={openCalendar}
          onClose={() => setOpenCalendar(false)}
          onSelect={handleDateSelection}
        />
      </div>
    </>
  );
};

export default CreateEvent;
