import React, { useState } from "react";
import UserTable from "../../components/tabel/UserTable";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { UserSummaryCardData } from "../../utils/datas/summary-card";
import { SummaryCard } from "../../components/custom";
import { IoCreateSharp } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../../components/ui/Loader";
import { useGetAllProfile } from "../../hooks/useAuth";

interface UserFormInputs {
  name: string;
  role: string;
  email: string;
}

const User: React.FC = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormInputs>();

  const { isFetching, data } = useGetAllProfile();

  const onSubmit: SubmitHandler<UserFormInputs> = (data) => {
    console.log(data);
    // Here you would typically handle the form submission, such as sending data to an API
    setOpen(false);
    reset();
  };

  return (
    <div>
      {isFetching ? (
        <div className="fixed inset-0 bg-co-primary  flex items-center justify-center z-[9999999999999]">
          <Loader />
        </div>
      ) : null}
      <div className="w-[100%] h-[100%] relative overflow-x-hidden">
        <Box sx={{ marginTop: "10px" }}>
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
        </Box>
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
          <UserTable data={data} />
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
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Create a New User
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
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
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Admin">User</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Super Admin">Super Admin</MenuItem>
              <MenuItem value="COP Desk Officer">COP Desk Officer</MenuItem>
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
