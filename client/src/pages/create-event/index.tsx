import { useEffect } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useCreateEvent,
  useGetAllTimeSlots,
} from "../../components/custom-hooks/useEvents";
import Loader from "../../components/ui/Loader";
import { useGetProfile } from "../../components/custom-hooks/useAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const { mutate, isLoading, data } = useCreateEvent();
  const { data: user, isLoading: userLoading } = useGetProfile();
  const { data: timslotsData, isLoading: slotLoading } = useGetAllTimeSlots();

  const extratedTimeSlots = timslotsData?.slots || [];
  const openSlots = extratedTimeSlots.filter(
    (slot: { bookingStatus: any }) => slot.bookingStatus
  );

  if (data && data.status) {
    toast.success("Successfully created side event", {
      toastId: "createEventSuccess",
    });
  }

  const formik = useFormik({
    initialValues: {
      imageUrl: null,
      title: "",
      description: "",
      objective: "",
      tags: "",
      timeSlot: "",
    },
    validationSchema: Yup.object({
      imageUrl: Yup.mixed().required("Image is required"),
      title: Yup.string().required("Event title is required"),
      description: Yup.string().required("Event description is required"),
      tags: Yup.string().required("Tags are required"),
      objective: Yup.string().required("Event objective is required"),
      timeSlot: Yup.string().required("Time slot is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      if (values.imageUrl !== null) {
        formData.append("image", values.imageUrl);
      }
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("objective", values.objective);
      formData.append("slotId", values.timeSlot);
      formData.append(
        "tags",
        values.tags
          .split(",")
          .map((tag) => tag.trim())
          .join(",")
      );
      formData.append("status", "approved");
      mutate(formData);
      await resetForm();
    },
  });

  if (isLoading || slotLoading || userLoading) {
    return <Loader />;
  }

  return user && user.data.userType === "organization" ? (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("/images/globe.jpg")`,
          filter: "brightness(0.4)", // Adjust brightness or use hue-rotate filter if needed
        }}
      >
        <div className="absolute inset-0 bg-green-800 opacity-60"></div>
      </div>
      <div className="relative z-10 flex items-center justify-center p-4 md:p-20 w-full h-full">
        <div
          className="w-full max-w-4xl bg-white p-5 rounded-lg shadow-lg"
          data-aos="Meeting-in-right"
        >
          <h1 className="text-green-700 font-bold text-2xl text-center md:text-left">
            Create a Side Event
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
              className="hidden"
            />
            <MdOutlineCloudUpload className="text-5xl text-green-700" />
            <span className="text-gray-500">Supported formats: JPEG, PNG</span>
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
            {formik.touched.imageUrl && formik.errors.imageUrl && (
              <div className="text-red-500 text-sm">
                {formik.errors.imageUrl}
              </div>
            )}
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="title"
                className="block text-gray-700 font-semibold"
              >
                Event Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border rounded-lg p-2 ${
                  formik.touched.title && formik.errors.title
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-500 text-sm">
                  {formik.errors.title}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="timeSlot"
                className="block text-gray-700 font-semibold"
              >
                Time Slot
              </label>
              <select
                id="timeSlot"
                name="timeSlot"
                value={formik.values.timeSlot}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border rounded-lg p-2 ${
                  formik.touched.timeSlot && formik.errors.timeSlot
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select a time slot
                </option>
                {openSlots?.map(
                  (slot: {
                    id: string;
                    timeSpan: any;
                    date: string | number | Date;
                  }) => (
                    <option key={slot.id} value={slot.id}>
                      {`${slot.timeSpan} - ${new Date(
                        slot.date
                      ).toLocaleDateString()}`}
                    </option>
                  )
                )}
              </select>
              {formik.touched.timeSlot && formik.errors.timeSlot && (
                <div className="text-red-500 text-sm">
                  {formik.errors.timeSlot}
                </div>
              )}
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <label
                htmlFor="description"
                className="block text-gray-700 font-semibold"
              >
                Event Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border rounded-lg p-2 ${
                  formik.touched.description && formik.errors.description
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                rows={4}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm">
                  {formik.errors.description}
                </div>
              )}
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <label
                htmlFor="objective"
                className="block text-gray-700 font-semibold"
              >
                Event Objective
              </label>
              <textarea
                id="objective"
                name="objective"
                value={formik.values.objective}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border rounded-lg p-2 ${
                  formik.touched.objective && formik.errors.objective
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                rows={4}
              />
              {formik.touched.objective && formik.errors.objective && (
                <div className="text-red-500 text-sm">
                  {formik.errors.objective}
                </div>
              )}
            </div>
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <label
                htmlFor="tags"
                className="block text-gray-700 font-semibold"
              >
                Tags (Comma separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formik.values.tags}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border rounded-lg p-2 ${
                  formik.touched.tags && formik.errors.tags
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.tags && formik.errors.tags && (
                <div className="text-red-500 text-sm">{formik.errors.tags}</div>
              )}
            </div>
            <div className="flex items-center justify-end mt-6 col-span-1 md:col-span-2">
              <button
                type="submit"
                className="bg-green-700 text-white py-5 px-10 rounded hover:bg-green-800"
                disabled={isLoading}
              >
                {isLoading ? "Creating Event..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center py-[50px] border-2 border-orange-600 my-20 bg-orange-100 mx-10">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
        You need to be registered and logged in as an organization to schedule a meeting.
      </h1>
      <p className="text-gray-600 mb-6">
        Please log in or register as an organization to schedule a meeting.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Link
          to="/login"
          className="bg-co-primary text-white py-2 px-4 rounded hover:bg-green-800 transition"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default CreateEvent;
