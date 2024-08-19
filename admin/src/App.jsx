import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import ForgetPassword from "./pages/forgetPassword";
import ForgotPasswordConfirmation from "./pages/forgetPassword/ForgotPasswordConfirmation";
import ResetPasswordConfirmation from "./pages/resetPassword/ResetPasswordConfirmation";
import ResetPassword from "./pages/resetPassword";
import { motion, AnimatePresence } from "framer-motion";
import Signup from "./pages/signup";
import AppLayout from "./layouts/AppLayout";
import PublicRoute from "./layouts/PublicRoute";
import ScrollToTop from "./layouts/ScrollToTop";
import Delegate from "./pages/delegate";
import Organization from "./pages/organization";
import Calender from "./pages/calender";
import PaCalender from "./pages/pacalender";
import Event from "./pages/sideEvent";
import Invoice from "./pages/invoice";
import User from "./pages/user";
import Announcement from "./pages/announcement";
import EventDetails from "./pages/eventDetails";
import Cop from "./pages/cop";

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
        {/* <Route element={<PublicRoute />}>
          
        </Route> */}
        <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route
            path="/forgot-password/success"
            element={<ForgotPasswordConfirmation />}
          />
          <Route
            path="/reset-password/success"
            element={<ResetPasswordConfirmation />}
          />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
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
          <Route
            path="/pacalender"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <PaCalender />
              </motion.div>
            }
          />
          <Route
            path="/event/:id"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <EventDetails />
              </motion.div>
            }
          />

          <Route
            path="/cop"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <Cop />
              </motion.div>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
