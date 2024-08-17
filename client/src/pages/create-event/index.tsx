import React from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateEvent: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      imageUrl: "",
      title: "",
      zoomLink: "",
      time: "",
      location: "",
      objective: '',
      description: "",
      tags: "",
      organizedBy: "",
    },
    validationSchema: Yup.object({
      imageUrl: Yup.string().url("Invalid URL").required("Image URL is required"),
      title: Yup.string().required("Event title is required"),
      zoomLink: Yup.string().url("Invalid URL").required("Zoom link is required"),
      time: Yup.string().required("Time of the event is required"),
      location: Yup.string().required("Location is required"),
      description: Yup.string().required("Event description is required"),
      objective: Yup.string().required("Event Objective is required"),
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
            tags: values.tags.split(",").map(tag => tag.trim()),
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
    <div className="w-full md:h-[100vh] bg-co-primary flex items-center justify-center p-4 md:p-0" >
      <div className="w-full max-w-4xl bg-white p-5 rounded-lg shadow-lg" data-aos="zoom-in-right">
        <h1 className="text-green-700 font-bold text-[26px] text-center md:text-left">Create an Event</h1>
        <div className="p-6 rounded-lg w-full flex flex-col items-center justify-center gap-3 mt-2 bg-green-50">
          <h2 className="text-gray-600 font-bold text-center">Upload Event Header Image</h2>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
          />
          <MdOutlineCloudUpload className="text-[46px] text-green-700" />
          <span className="text-gray-400">Drag & Drop or choose a file to upload</span>
          <span className="text-gray-500">Supported formats: JPEG, PNG</span>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
        >
          {/* Event Title */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Event Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-2 rounded"
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500">{formik.errors.title}</div>
            ) : null}
          </div>

          {/* Zoom Link */}
          <div className="flex flex-col gap-2">
            <label htmlFor="zoomLink">Meeting Link</label>
            <input
              id="zoomLink"
              name="zoomLink"
              type="text"
              value={formik.values.zoomLink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-2 rounded"
            />
            {formik.touched.zoomLink && formik.errors.zoomLink ? (
              <div className="text-red-500">{formik.errors.zoomLink}</div>
            ) : null}
          </div>

          {/* Time of the Event */}
          <div className="flex flex-col gap-2">
            <label htmlFor="time">Time</label>
            <input
              id="time"
              name="time"
              type="text"
              value={formik.values.time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-2 rounded"
            />
            {formik.touched.time && formik.errors.time ? (
              <div className="text-red-500">{formik.errors.time}</div>
            ) : null}
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-2 rounded"
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="text-red-500">{formik.errors.location}</div>
            ) : null}
          </div>

          {/* Event Description */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
            <label htmlFor="description">Event Description</label>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-2 rounded"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500">{formik.errors.description}</div>
            ) : null}
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formik.values.tags}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="climate, energy"
              className="border border-gray-300 p-2 rounded"
            />
            {formik.touched.tags && formik.errors.tags ? (
              <div className="text-red-500">{formik.errors.tags}</div>
            ) : null}
          </div>

          {/* Organized By */}
          <div className="flex flex-col gap-2">
            <label htmlFor="organizedBy">Organized By</label>
            <input
              id="organizedBy"
              name="organizedBy"
              type="text"
              value={formik.values.organizedBy}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-2 rounded"
            />
            {formik.touched.organizedBy && formik.errors.organizedBy ? (
              <div className="text-red-500">{formik.errors.organizedBy}</div>
            ) : null}
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-green-800 text-white p-2 rounded w-full"
            >
              Submit Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
