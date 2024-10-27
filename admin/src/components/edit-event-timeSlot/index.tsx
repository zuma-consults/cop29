import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useEditEvent, useGetAllTimeSlots } from "../../hooks/useEvent";
import Loader from "../ui/Loader";

const EditTimeSlot: React.FC<{
  setOpen: (value: boolean) => void;
  event: any;
}> = ({ setOpen, event }) => {
  const { mutate, isLoading } = useEditEvent({ setOpen });

  const { data: timslotsData, isLoading: loadingTimeSlots } =
    useGetAllTimeSlots();
  const extratedTimeSlots = timslotsData?.data || [];
  const openSlots = extratedTimeSlots.filter(
    (slot: { bookingStatus: any }) => slot.bookingStatus
  );

  const formik = useFormik({
    initialValues: {
      slotId: "",
    },
    validationSchema: Yup.object({
      slotId: Yup.string().required("Time slot is required"),
    }),
    onSubmit: async (values) => {
      const payload = {
        slotId: values.slotId,
        id: event?.id,
      };
      mutate(payload);
    },
  });

  return (
    <>
      {isLoading || (loadingTimeSlots && <Loader />)}
      <div className="flex items-center justify-center p-4 md:p-0">
        <div
          className="w-full max-w-4xl bg-white p-5 rounded-lg shadow-lg"
          data-aos="Meeting-in-right"
        >
          <h1 className="text-green-700 font-bold text-[26px] text-center md:text-left">
            Edit Meeting Time Slot
          </h1>

          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
          >
            {/* time slot */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <FormControl variant="outlined" color="success" fullWidth>
                <InputLabel id="slotId-label">Time Slot</InputLabel>
                <Select
                  labelId="slotId-label"
                  id="slotId"
                  name="slotId"
                  value={formik.values.slotId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.slotId && Boolean(formik.errors.slotId)}
                  label="Time Slot"
                >
                  {openSlots?.map(
                    (slot: {
                      id: string;
                      timeSpan: any;
                      date: string | number | Date;
                      bookingStatus: string;
                    }) => (
                      <MenuItem
                        key={slot.id}
                        value={slot.id}
                        disabled={slot.bookingStatus === "booked"}
                      >
                        <div
                          className={`flex justify-between w-full ${
                            slot.bookingStatus === "booked"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <span className="w-[30%]">{slot.timeSpan}</span>
                          <span>---</span>
                          <span className="w-[30%]">
                            {new Date(slot.date).toLocaleDateString()}
                          </span>
                          <span>---</span>
                          <span>{slot.bookingStatus}</span>
                        </div>
                      </MenuItem>
                    )
                  )}
                </Select>
                {formik.touched.slotId && formik.errors.slotId && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.slotId}
                  </div>
                )}
              </FormControl>
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-center">
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="success" />
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

export default EditTimeSlot;
