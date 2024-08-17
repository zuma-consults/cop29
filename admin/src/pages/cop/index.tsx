import React, { useState } from "react";
import { Button } from "@mui/material";
// import { UserSummaryCardData } from "../../utils/datas/summary-card";
// import { SummaryCard } from "../../components/custom";
import { IoCreateSharp } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useAddAmin,
  useGetAllProfile,
  useGetAllRoles,
} from "../../hooks/useAuth";
import Loader from "../../components/ui/Loader";
import CopTable from "../../components/tabel/CopTable";

interface UserFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

const Cop: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { data: roleData, isFetching } = useGetAllRoles();
  const { refetch: refetchAllProfile } = useGetAllProfile();
  const {
    formState: { errors },
    reset,
  } = useForm<UserFormInputs>();

  const { mutate, isLoading } = useAddAmin({
    refetchAllProfile,
    setOpen,
    reset,
  });

  return (
    <div>
      {isFetching || isLoading ? <Loader /> : null}
      <div className="w-[100%] h-[100%] relative overflow-x-hidden">
        {/* <Box sx={{ marginTop: "10px" }}>
          <Grid container spacing={3}>
            {UserSummaryCardData?.map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={6}>
                <SummaryCard
                  icon={card.icon}
                  title={card.title}
                  number={card.number}
                />
              </Grid>
            ))}
          </Grid>
        </Box> */}
        <div className="flex flex-col gap-2 px-4 md:px-0 sm:mt-[2.5rem] mt-1">
          <div className="flex align-center md:flex-row flex-col sm:gap-10 w-auto justify-between">
            <span className="text-sm font-extrabold text-[#2E7D31]">
              COP Applicants
            </span>
          </div>
          <div className="">
            <div className="w-[103px] h-[8px] bg-[#2E7D31]"></div>
            <hr
              style={{
                height: "1px",
                backgroundColor: "#2E7D31",
                border: "none",
              }}
            />
          </div>
        </div>
        <div>
          <CopTable />
        </div>
      </div>
    </div>
  );
};

export default Cop;
