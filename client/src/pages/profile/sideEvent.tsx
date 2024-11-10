import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useBookSideEvent } from "../../components/custom-hooks/useOrg";
import Loader from "../../components/ui/Loader";
import { toast } from "react-toastify";
import { useGetPavillionSlots } from "../../components/custom-hooks/useAuth";

interface SideEventProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: any;
  id: string;
}

const SideEvent: React.FC<SideEventProps> = ({ isOpen, onClose, refetch }) => {
  const { mutate, isLoading, data } = useBookSideEvent();

  const { data: slots } = useGetPavillionSlots();
  
  const handleSlotChange = (event: any) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option: any) => option.value
    );
    formik.setFieldValue("slotArray", selectedValues);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      slotArray: [],
      description: "",
      noOfSpeakers: "",
      requirements: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Name is required"),
      slotArray: Yup.array()
        .of(Yup.string().required("A valid slot is required"))
        .min(1, "Please select at least one slot")
        .max(2, "You can select a maximum of 2 slots only"),
      description: Yup.string().required("Description is required"),
      noOfSpeakers: Yup.number()
        .required("Number of speakers is required")
        .min(1, "Minimum 1 speaker is required")
        .max(4, "Maximum 4 speakers are allowed"),
      requirements: Yup.string(),
    }),
    onSubmit: async (values) => {
      mutate(
        { data: values },
        {
          onSuccess: async () => {
            await refetch();
            onClose();
            formik.resetForm();
          },
          onError: (error: any) => {
            toast.error(`${error?.data?.message || error?.message}`);
            console.error("Mutation failed:", error);
          },
        }
      );
    },
  });

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          <div className="bg-white rounded-lg shadow-lg p-8 z-10 md:w-[50%] w-[90%]">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-green-600 mb-6">
                  Apply for Side Event
                </h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                    {formik.touched.title && formik.errors.title && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.title}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="slotArray"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Preferred Time Slot
                    </label>
                    <select
                      id="slotArray"
                      name="slotArray"
                      value={formik.values.slotArray}
                      onChange={handleSlotChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      multiple
                    >
                      <option value="" disabled>
                        Select Slot
                      </option>
                      {slots?.map((slot: any) => (
                        <option
                          disabled={slot.bookingStatus !== "open"}
                          key={slot.id}
                          value={slot.id}
                        >
                          {new Date(slot.date)
                            .toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                            .replace(/ /g, "-")}{" "}
                          {"from "}
                          {slot.timeSpan}
                        </option>
                      ))}
                    </select>

                    {formik.touched.slotArray && formik.errors.slotArray && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.slotArray}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <input
                      id="description"
                      name="description"
                      type="text"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />

                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="text-red-500 text-xs mt-1">
                          {formik.errors.description}
                        </div>
                      )}
                  </div>

                  <div>
                    <label
                      htmlFor="noOfSpeakers"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Number of Speakers
                    </label>
                    <input
                      id="noOfSpeakers"
                      name="noOfSpeakers"
                      type="number"
                      max={4}
                      min={1}
                      value={formik.values.noOfSpeakers}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                    {formik.touched.noOfSpeakers &&
                      formik.errors.noOfSpeakers && (
                        <div className="text-red-500 text-xs mt-1">
                          {formik.errors.noOfSpeakers}
                        </div>
                      )}
                  </div>

                  <div>
                    <label
                      htmlFor="requirements"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Side event requirements
                    </label>
                    <input
                      id="requirements"
                      name="requirements"
                      type="text"
                      value={formik.values.requirements}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Projector, mic, etc"
                    />
                    {formik.touched.requirements &&
                      formik.errors.requirements && (
                        <div className="text-red-500 text-xs mt-1">
                          {formik.errors.requirements}
                        </div>
                      )}
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 shadow-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md border border-transparent text-white bg-green-600 hover:bg-green-700 shadow-sm"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideEvent;
