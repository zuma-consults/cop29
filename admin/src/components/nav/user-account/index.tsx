import { Box, Skeleton, Typography } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import AlertDialog from "../../Reusable-Dialog";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";
import { logout } from "../../../services/auth";

const cookies = new Cookies();

const UserAccount: React.FC<{ image?: string; name: string; role: any }> = ({
  name,
  role,
}) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout(); // Attempt to log out via API call
    } finally {
      // Always remove cookies and redirect to login, regardless of the API call result
      cookies.remove("accessToken");
      cookies.remove("profile");
      toast.success("Logout Successful");

      // Ensure user cannot navigate back to the protected page
      navigate("/login", { replace: true });
      window.history.pushState("", "", "/login");
      window.addEventListener("popstate", () => {
        navigate("/login", { replace: true });
      });

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
            {role ? (
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
      </Box>
    </>
  );
};

export default UserAccount;
