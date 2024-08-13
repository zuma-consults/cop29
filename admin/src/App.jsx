import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import { motion, AnimatePresence } from "framer-motion";
import Signup from "./pages/signup";
import AppLayout from "./layouts/AppLayout";
import PublicRoute from "./layouts/PublicRoute";
import ScrollToTop from "./layouts/ScrollToTop";
import Delegate from "./pages/delegate";
import Organization from "./pages/organization";
import Calender from "./pages/calender";
import Event from "./pages/sideEvent";
import Invoice from "./pages/invoice";
import User from "./pages/user";
import Announcement from "./pages/announcement";

const pageVariants = {
  initial: { opacity: 0.5, translateY: -10 },
  animate: { opacity: 1, translateY: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, translateY: 10, transition: { duration: 0.5 } },
};

function App() {
  return (
    <AnimatePresence>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<AppLayout />}>
          <Route
            path="/delegate"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Delegate />
              </motion.div>
            }
          />
          <Route
            path="/organization"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <Organization />
              </motion.div>
            }
          />
          <Route
            path="/calender"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <Calender />
              </motion.div>
            }
          />
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <Event />
              </motion.div>
            }
          />
          <Route
            path="/invoice"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <Invoice />
              </motion.div>
            }
          />
          <Route
            path="/user"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <User />
              </motion.div>
            }
          />
          <Route
            path="/announcement"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <Announcement />
              </motion.div>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
