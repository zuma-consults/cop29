import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "../../components/ui/Loader";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";

interface ProofOfPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: any;
}

const ProofOfPaymentModal: React.FC<ProofOfPaymentModalProps> = ({
  isOpen,
  onClose,
  refetch,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cookies = new Cookies();
  let url = "http://localhost:6001/api/v1/proof";
  let access = cookies.get("accessToken");

  const formik = useFormik({
    initialValues: {
      files: null,
    },
    validationSchema: Yup.object({
      files: Yup.mixed()
        .required("A file is required")
        .test(
          "fileSize",
          "File is too large",
          (value: any) => !value || (value && value.size <= 1024 * 1024) // 1 MB limit
        ),
    }),
    onSubmit: async (values) => {
      if (!file) {
        toast.error("Please select a file");
        return;
      }

      setIsSubmitting(true);

      // Prepare form data to be sent to the server
      const formData = new FormData();
      formData.append("files", file);

      try {
        // Example API call, replace with your actual URL
        const response = await fetch(url, {
          headers: {
            "poc-client-token": access,
          },
          method: "PUT",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload proof of payment");
        }

        toast.success("Proof of payment uploaded successfully");
        refetch();
        onClose();
      } catch (error: any) {
        toast.error(error.message || "An error occurred");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.currentTarget.files?.[0];
    setFile(selectedFile || null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Upload Proof of Payment</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="files"
              className="block text-gray-700 font-medium mb-1"
            >
              Upload File
            </label>
            <input
              id="files"
              name="files"
              type="file"
              onChange={(event) => {
                handleFileChange(event);
                formik.setFieldValue("files", event.currentTarget.files?.[0]);
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {formik.errors.files && formik.touched.files && (
              <div className="text-red-600">{formik.errors.files}</div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProofOfPaymentModal;
