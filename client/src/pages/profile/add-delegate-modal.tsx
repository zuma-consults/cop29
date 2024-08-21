import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddDelegate } from "../../components/custom-hooks/useOrg";
import Loader from "../../components/ui/Loader";

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
  const { mutate, isLoading } = useAddDelegate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);

      if (file) {
        formData.append("files", file);
      }

      try {
        await mutate({ id: id, data: formData });
        refetch();
        resetForm();
        setFile(null);
        onClose();
      } catch (error) {
        // Handle the error
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  if (!isOpen) return null;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {isLoading && <Loader />}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg p-10 z-10 w-[100%] md:w-[50%] ">
        <h2 className="text-xl font-bold">Add Delegate</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 mt-4"
        >
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border rounded p-2 w-full"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold"
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
              className="border rounded p-2 w-full"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="file" className="block text-gray-700 font-semibold">
              Upload Delegate Passport
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept=".png, .jpg"
              onChange={handleFileChange}
              className="border rounded p-2 w-full"
            />
            {file && (
              <div className="text-green-500 text-sm">
                File ready for upload
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Add Delegate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDelegateModal;
