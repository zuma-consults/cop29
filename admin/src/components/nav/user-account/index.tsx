import {
  Box,
  IconButton,
  InputAdornment,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import AlertDialog from "../../Reusable-Dialog";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";
import { logout } from "../../../services/auth";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useChangePassword } from "../../../hooks/useAuth";

const cookies = new Cookies();

interface UserFormInputs {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UserAccount: React.FC<{ image?: string; name: string; role: any }> = ({
  name,
  role,
}) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UserFormInputs>();

  const { mutate, isLoading: loader } = useChangePassword({ setOpenModal });

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);

    // Remove cookies and storage items first
    cookies.remove("accessToken");
    cookies.remove("profile");
    localStorage.clear(); // Optional, clear local storage if needed
    sessionStorage.clear(); // Optional, clear session storage if needed
    toast.success("Logout Successful");

    // Ensure user cannot navigate back to the protected page
    navigate("/login", { replace: true });
    window.history.pushState("", "", "/login");
    window.addEventListener("popstate", () => {
      navigate("/login", { replace: true });
    });

    try {
      // Make the API call in the background after storage is cleared
      await logout(); // API call to logout
    } catch (error) {
      console.error("Logout API call failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChangePassword = (data: UserFormInputs) => {
    const oldPassword = getValues("oldPassword");
    const newPassword = getValues("newPassword");
    const confirmPassword = getValues("confirmPassword");

    const payload = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    mutate(payload);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          bottom: { xs: 20, md: 0 },
          width: { xs: "70%", sm: "90%" },
          flexWrap: { xs: "wrap", sm: "no-wrap" },
        }}
      >
        <Box sx={{ flexGrow: 1, mr: "20px" }}>
          <Box>
            {name ? (
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "black",
                  mb: { xs: "5px", sm: "0px" },
                  wordBreak: "break-all",
                  textTransform: "capitalize",
                }}
              >
                {name}
              </Typography>
            ) : (
              <Skeleton
                variant="rectangular"
                width={100}
                height={15}
                sx={{ mb: 0.7 }}
              />
            )}
          </Box>
          <Box>
            {role ? (
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontSize: "12px",
                  color: "#908E8F",
                  fontWeight: 500,
                  wordBreak: "break-all",
                }}
              >
                {role}
              </Typography>
            ) : (
              <Skeleton
                variant="rectangular"
                width={50}
                height={10}
                sx={{ mb: 0.5 }}
              />
            )}
          </Box>
          <Button onClick={handleClickOpen} color="success">
            Logout
          </Button>
          <Button
            onClick={() => setOpenModal(true)}
            sx={{
              backgroundColor: "green",
              color: "white",
              width: "fit-content",
              paddingY: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: "10px",
              textAlign: "center",
              fontSize: "13px",
              gap: "8px",
              "&:hover": {
                backgroundColor: "#e8f5e9",
                color: "black",
              },
            }}
          >
            Change Password
          </Button>
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: { xs: -40, sm: 0 },
            top: { md: 0 },
          }}
        >
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={{ zIndex: 10000 }}
          ></Popover>
          <AlertDialog
            open={openDialog}
            onClose={handleClickClose}
            onAgree={handleLogout}
            title={"Logout"}
            content={" Are you sure?"}
            disagreeText={"Cancel"}
            agreeText={"Yes, continue"}
          />
        </Box>

        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <>
            {loader && <Loader />}

            <Box
              component="form"
              onSubmit={handleSubmit(handleChangePassword)}
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                maxHeight: "90vh",
                overflowY: "auto",
                transform: "translate(-50%, -50%)",
                width: { xs: "90%", sm: "80%", md: "60%" },
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: "8px",
              }}
            >
              <h1 className="text-green-700 font-bold text-[26px] text-center md:text-left">
                Change Password
              </h1>
              <TextField
                label="Old Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("oldPassword", {
                  required: "Old Password is required",
                })}
                error={!!errors.oldPassword}
                helperText={errors.oldPassword?.message}
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

              <TextField
                label="New Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("newPassword", {
                  required: "New Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
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

              <TextField
                label="Confirm Password"
                type={showConfirm ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === getValues("newPassword") ||
                    "Passwords do not match",
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowConfirm(!showConfirm)}
                        aria-label={
                          showConfirm ? "Hide password" : "Show password"
                        }
                      >
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box mt={3} display="flex" justifyContent="space-between">
                <Button variant="contained" color="success" type="submit">
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </>
        </Modal>
      </Box>
    </>
  );
};

export default UserAccount;
