import React, { useState } from "react";
import UserTable from "../../components/tabel/UserTable";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface UserFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

const User: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { data: roleData, isFetching } = useGetAllRoles();
  const { refetch: refetchAllProfile } = useGetAllProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormInputs>();

  const { mutate, isLoading } = useAddAmin({
    refetchAllProfile,
    setOpen,
    reset,
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<UserFormInputs> = (data) => {
    const userPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
    };

    mutate(userPayload);
  };

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
              All Users
            </span>
            <Button
              onClick={() => setOpen(true)}
              sx={{
                backgroundColor: "green",
                color: "white",
                width: "fit-content",
                paddingY: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontSize: "13px",
                gap: "8px",
                "&:hover": {
                  backgroundColor: "#e8f5e9",
                  color: "black",
                },
              }}
            >
              Create a new user
              <IoCreateSharp size={20} />
            </Button>
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
          <UserTable />
        </div>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              maxHeight: "90vh",
              overflowY: "auto",
              transform: "translate(-50%, -50%)",
              width: 800,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "8px",
            }}
          >
            <h1 className="text-green-700 font-bold text-[26px] text-center md:text-left">
              Create new admin
            </h1>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("firstName", { required: "First Name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />

            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("lastName", { required: "Last Name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />

            <TextField
              select
              label="Role"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("role", { required: "Role is required" })}
              error={!!errors.role}
              helperText={errors.role?.message}
            >
              {roleData?.data?.map((role: any) => (
                <MenuItem key={role?.id} value={role?.id}>
                  {role.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{11}$/,
                  message: "Enter a valid phone number",
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              // Add your register and validation logic here
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="contained" color="success" type="submit">
                Create User
              </Button>
              <Button
                variant="outlined"
                color="info"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default User;
