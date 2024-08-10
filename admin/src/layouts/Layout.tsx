import { Box } from "@mui/material";
import { ReactNode, useState } from "react";
import Nav from "../components/nav";
import Header from "../components/header";
import MainContent from "../components/main-content";
import DashboardFooter from "../components/footer/dashboard";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openLargeNav, setOpenLargeNav] = useState(true);
  const [openSmallNav, setOpenSmallNav] = useState(false);

  return (
    <Box>
      <Nav
        large={openLargeNav}
        small={openSmallNav}
        closeLargeNav={() => setOpenLargeNav(false)}
        closeSmallNav={() => setOpenSmallNav(false)}
      />
      <Box>
        <Header
          small={openSmallNav}
          large={openLargeNav}
          openSmallClick={() => setOpenSmallNav(!openSmallNav)}
          openLargeClick={() => setOpenLargeNav(!openLargeNav)}
        />
        <Box>
          <MainContent
            isSmallNavOpen={openSmallNav}
            isLargeNavOpen={openLargeNav}
          >
            {children}
          </MainContent>
          <DashboardFooter
            isLargeNavOpen={openLargeNav}
            text="Made with ❤️ by Okike Consults"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
