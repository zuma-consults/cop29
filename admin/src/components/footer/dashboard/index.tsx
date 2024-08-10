import { Box, Typography } from "@mui/material";

const DashboardFooter: React.FC<{ isLargeNavOpen: boolean; text: string }> = ({
  isLargeNavOpen,
  text,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        ...(isLargeNavOpen && { marginLeft: { xs: "0px", md: "300px" } }),
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        paddingY: "20px",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          marginLeft: { xs: "0px", md: "-350px" },
          textAlign: "center",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default DashboardFooter;
