import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, CircularProgress } from "@mui/material";
import { useUploadPayment } from "../../hooks/useEvent";
import Loader from "../ui/Loader";

const UploadPayment: React.FC<{
  setOpen: (value: boolean) => void;
  event: any;
}> = ({ setOpen, event }) => {
  const { mutate, isLoading } = useUploadPayment({ setOpen });

  const formik = useFormik({
    initialValues: {
      files: null,
    },
    validationSchema: Yup.object({
      files: Yup.mixed().required("Proof of payment image is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("id", event?.id);
      if (values.files) {
        formData.append("files", values.files);
      }
      mutate(formData);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      formik.setFieldValue("files", event.currentTarget.files[0]);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex items-center justify-center p-4 md:p-0">
        <div
          className="w-full max-w-4xl bg-white p-5 rounded-lg shadow-lg"
          data-aos="fade-in"
        >
          <h1 className="text-green-700 font-bold text-[26px] text-center md:text-left">
            Upload Proof of Payment
          </h1>

          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 gap-6 mt-6"
          >
            <div className="flex flex-col gap-2">
              <input
                id="files"
                name="files"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.files && formik.errors.files && (
                <div className="text-red-500 text-sm">
                  {formik.errors.files}
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
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

export default UploadPayment;
