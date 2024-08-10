import { Box } from "@mui/material";
import { ReactNode } from "react";

export const NavItem: React.FC<{
  icon: ReactNode; // Change icon type to ReactNode
  title: string;
  isActive: boolean;
}> = ({ icon, title, isActive }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": { color: "#2E7D31" },
        ...(isActive && {
          backgroundColor: "#2E7D31",
          color: "#FFFFFF",
          "&:hover": { color: "#FFFFFF" },
        }),
        pt: "15px",
        pb: "10px",
        px: "10px",
        borderRadius: "10px",
      }}
    >
      <Box sx={{ mr: { xs: "20px", md: "30px" } }}>
        {icon} 
      </Box>
      <Box sx={{ mt: "-6px" }}>{title}</Box>
    </Box>
  );
};
