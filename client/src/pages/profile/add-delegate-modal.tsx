import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddDelegate } from "../../components/custom-hooks/useOrg";
import Loader from "../../components/ui/Loader";
import { toast } from "react-toastify";

interface AddDelegateModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: any;
  id: string;
}

const AddDelegateModal: React.FC<AddDelegateModalProps> = ({
  isOpen,
  onClose,
  refetch,
  id,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const { mutate, isLoading, data } = useAddDelegate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      designation:'',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      designation: Yup.string().required("Designation is required"),
      phone: Yup.string().required("phone is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("designation", values.designation);
      values.phone && formData.append("phone", values.phone);

      if (file) {
        formData.append("files", file);
      }

      mutate({ id, data: formData });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (data && data.status) {
      toast.success("Delegate added successfully", { toastId: "customId" });
      refetch();
      setFile(null);
      onClose();
    }
  }, [data, refetch, onClose]);

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <div className="bg-white rounded-lg shadow-lg p-8 z-10 w-[50%]">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-green-600 mb-6">
                  Add a Delegate
                </h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="designation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Designation
                    </label>
                    <input
                      id="designation"
                      name="designation"
                      type="text"
                      value={formik.values.designation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                    {formik.touched.designation && formik.errors.designation && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.designation}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="file"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Upload Delegate Passport
                    </label>
                    <input
                      id="file"
                      name="file"
                      type="file"
                      accept=".png, .jpg"
                      onChange={handleFileChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                    {file && (
                      <div className="text-green-500 text-xs mt-2">
                        File ready for upload
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
                      {isLoading ? "Submitting..." : "Add Delegate"}
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

export default AddDelegateModal;
