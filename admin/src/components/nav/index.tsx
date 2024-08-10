import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { navConfig } from "./config";
import { NavItem } from "./item";
import UserAccount from "./user-account";
import { ImMenu } from "react-icons/im";
import { green } from "@mui/material/colors";

const Nav: React.FC<{
  large: boolean;
  small: boolean;
  closeLargeNav: () => void;
  closeSmallNav: () => void;
}> = ({ large, small, closeLargeNav, closeSmallNav }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        ...(large
          ? {
              ...(small
                ? {
                    position: { xs: "fixed", md: "static" },
                    zIndex: { xs: 10000, md: 0 },
                    backgroundColor: {
                      xs: "rgba(0, 0, 0, 0.3)",
                      md: "transparent",
                    },
                    width: { xs: "100%", md: "auto" },
                    minHeight: { xs: "100vh", md: 0 },
                    display: { xs: "block", md: "block" },
                  }
                : {
                    /**No style applied when large nav is open but small nav is closed */
                  }),
            }
          : {
              ...(small
                ? {
                    position: "fixed",
                    zIndex: 10000,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    width: "100%",
                    minHeight: "100vh",
                    display: { xs: "block", md: "none" },
                  }
                : {
                    /**No style applied when both navs are closed */
                  }),
            }),
      }}
    >
      <Box
        sx={{
          ...(large
            ? {
                ...(small
                  ? {
                      width: { xs: "200px", sm: "250px", md: "280px" },
                      display: "block",
                      paddingLeft: "20px",
                      position: { xs: "static", md: "fixed" },
                      backgroundColor: { xs: "white", md: "transparent" },
                      minHeight: { xs: "100vh", md: 0 },
                    }
                  : {
                      width: "280px",
                      display: { xs: "none", md: "block" },
                      paddingLeft: "20px",
                      position: "fixed",
                    }),
              }
            : {
                ...(small
                  ? {
                      width: { xs: "200px", sm: "250px" },
                      display: { xs: "block", md: "none" },
                      paddingLeft: "20px",
                      backgroundColor: "white",
                      minHeight: "100vh",
                    }
                  : {
                      display: "none",
                    }),
              }),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            height: "90px",
            ...(large && { paddingRight: "5px" }),
            ...(small && { paddingRight: "15px" }),
          }}
        >
          <img src="/images/coat.png" className="h-8" alt=" Logo" />
          <Typography variant="h6" color={green[800]}>
            COP29 Nigeria
          </Typography>
          <Box
            {...(large && { onClick: closeLargeNav })}
            {...(small && { onClick: closeSmallNav })}
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <ImMenu size={24} />
          </Box>
        </Box>
        <Box sx={{ height: "100vh", overflow: "auto" }}>
          <Box
            sx={{
              paddingLeft: "5px",
              paddingTop: "50px",
              position: "relative",
              height: "80%",
            }}
          >
            {navConfig.map((item: any) => (
              <Box key={item.title} sx={{ mb: "30px", mr: "20px" }}>
                <Box onClick={() => navigate(item.path)}>
                  <NavItem
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    isActive={location.pathname === item.path}
                  />
                </Box>
              </Box>
            ))}
            <UserAccount
              image="https://avatars.githubusercontent.com/u/68823331?v=4"
              name="Abraham Christopher"
              role={"Admin"}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Nav;
