import { Box, Skeleton, Typography } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AlertDialog from "../../Reusable-Dialog";
import { ImageFrame40 } from "../../image-frames";

const UserAccount: React.FC<{ image: string; name: string; role: any }> = ({
  image,
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

  const handleLogout = () => {
    localStorage.clear();
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
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
      <Box sx={{ marginRight: "12px" }}>
        <ImageFrame40 image={image} />
      </Box>
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
      </Box>
      <Box
        sx={{ position: "absolute", right: { xs: -40, sm: 0 }, top: { md: 0 } }}
      >
        <Button aria-describedby={id} onClick={handleClick}>
          <MoreVert />
        </Button>
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
        >
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                cursor: "pointer",
              }}
              onClick={handleClickOpen}
            >
              <LogoutRoundedIcon
                sx={{ marginRight: "10px", transform: "scaleX(-1)" }}
              />
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
                Logout
              </Typography>
            </Box>
          </Box>
        </Popover>
        <AlertDialog
          open={openDialog}
          onClose={handleClickClose}
          onAgree={handleLogout}
          title={"Logout"}
          content={
            "We don't want to see you go, please check on us soon. Are you still willing to checkout?"
          }
          disagreeText={"Cancel"}
          agreeText={"Yes, continue"}
        />
      </Box>
    </Box>
  );
};

export default UserAccount;
