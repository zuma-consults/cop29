import React from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";

const CreateEvent: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      imageUrl: "",
      title: "",
      zoomLink: "",
      time: "",
      location: "",
      description: "",
      tags: "",
      organizedBy: "",
    },
    validationSchema: Yup.object({
      imageUrl: Yup.string()
        .url("Invalid URL")
        .required("Image URL is required"),
      title: Yup.string().required("Event title is required"),
      zoomLink: Yup.string()
        .url("Invalid URL")
        .required("Zoom link is required"),
      time: Yup.string().required("Time of the event is required"),
      location: Yup.string().required("Location is required"),
      description: Yup.string().required("Event description is required"),
      tags: Yup.string().required("Tags are required"),
      organizedBy: Yup.string().required("Organizer is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("https://your-server-url.com/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            tags: values.tags.split(",").map((tag) => tag.trim()),
          }),
        });

        if (response.ok) {
          alert("Event details uploaded successfully!");
        } else {
          alert("Failed to upload event details.");
        }
      } catch (error) {
        console.error("Error uploading event details:", error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center p-4 md:p-0">
      <div
        className="w-full max-w-4xl bg-white p-5 rounded-lg shadow-lg"
        data-aos="zoom-in-right"
      >
        <h1 className="text-green-700 font-bold text-[26px] text-center md:text-left">
          Create an Event
        </h1>
        <div className="p-6 rounded-lg w-full flex flex-col items-center justify-center gap-3 mt-2 bg-green-50">
          <h2 className="text-gray-600 font-bold text-center">
            Upload Event Header Image
          </h2>
          <input type="file" accept="image/*" style={{ display: "none" }} />
          <MdOutlineCloudUpload className="text-[46px] text-green-700" />
          <span className="text-gray-400">
            Drag & Drop or choose a file to upload
          </span>
          <span className="text-gray-500">Supported formats: JPEG, PNG</span>
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
              id="zoomLink"
              name="zoomLink"
              label="Zoom Link"
              color="success"
              variant="outlined"
              value={formik.values.zoomLink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zoomLink && Boolean(formik.errors.zoomLink)}
              helperText={formik.touched.zoomLink && formik.errors.zoomLink}
              fullWidth
            />
          </div>

          {/* Time of the Event */}
          <div className="flex flex-col gap-2">
            <TextField
              id="time"
              name="time"
              label="Time"
              variant="outlined"
              color="success"
              value={formik.values.time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.time && Boolean(formik.errors.time)}
              helperText={formik.touched.time && formik.errors.time}
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
              error={formik.touched.location && Boolean(formik.errors.location)}
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
                formik.touched.description && Boolean(formik.errors.description)
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
              id="organizedBy"
              name="organizedBy"
              label="Organized By"
              color="success"
              variant="outlined"
              value={formik.values.organizedBy}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.organizedBy && Boolean(formik.errors.organizedBy)
              }
              helperText={
                formik.touched.organizedBy && formik.errors.organizedBy
              }
              fullWidth
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center">
            <Button type="submit" variant="contained" color="success" fullWidth>
              Submit Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
