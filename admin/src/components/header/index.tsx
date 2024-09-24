import { Box, Button, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { ImMenu } from "react-icons/im";

const Header: React.FC<{
  small: boolean;
  large: boolean;
  openSmallClick: () => void;
  openLargeClick: () => void;
}> = ({ small, large, openSmallClick, openLargeClick }) => {
  return (
    <Box
      sx={{
        height: "90px",
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        ...(large && { marginLeft: { xs: "0px", md: "300px" } }),
        zIndex: 1000,
        justifyContent: "center", // Center content horizontally
      }}
    >
      <Box
        onClick={openLargeClick}
        sx={{
          cursor: "pointer",
          display: { xs: "none", md: large ? "none" : "block" }, // Show on large screens when menu is closed
          position: "absolute", // Positioning the menu icon absolutely to avoid affecting the text alignment
          left: "25px",
        }}
      >
        <ImMenu size={24} />
      </Box>
      <Box
        onClick={openSmallClick}
        sx={{
          cursor: "pointer",
          display: { xs: small ? "none" : "block", md: "none" }, // Show on small screens when menu is closed
          position: "absolute", // Positioning the menu icon absolutely to avoid affecting the text alignment
          left: "25px",
        }}
      >
        <ImMenu size={24} />
      </Box>
      <Typography
        variant="h4"
        color={green[800]}
        sx={{
          display: { xs: small ? "block" : "none", md: "block" }, // Show on small screens when menu is closed
        }}
      >
        Welcome to COP29 Nigeria
      </Typography>
    </Box>
  );
};

export default Header;
