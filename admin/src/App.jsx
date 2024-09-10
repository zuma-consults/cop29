import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import ForgetPassword from "./pages/forgetPassword";
import ForgotPasswordConfirmation from "./pages/forgetPassword/ForgotPasswordConfirmation";
import ResetPasswordConfirmation from "./pages/resetPassword/ResetPasswordConfirmation";
import ResetPassword from "./pages/resetPassword";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "./layouts/AppLayout";
import PublicRoute from "./layouts/PublicRoute";
import ScrollToTop from "./layouts/ScrollToTop";
import Delegate from "./pages/delegate";
import Organization from "./pages/organization";
import Negotiators from "./pages/negotiators";
import Calender from "./pages/calender";
import PaCalender from "./pages/pacalender";
import Event from "./pages/sideEvent";
import Invoice from "./pages/invoice";
import User from "./pages/user";
import ContactUs from "./pages/contact-us";
import International from "./pages/international";
import EventDetails from "./pages/eventDetails";
import OrganisationDetails from "./pages/organisationDetails";
import NegotiatorsDetails from "./pages/negotiatorsDetails";
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
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
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
        </Route>
        <Route path="/" element={<AppLayout />}>
          {/* <Route
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
          /> */}
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
            path="/scheduled-meetings"
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
            path="/contact-us"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <ContactUs />
              </motion.div>
            }
          />
          <Route
            path="/international"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <International />
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
            path="/negotiators"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <Negotiators />
              </motion.div>
            }
          />
          <Route
            path="/scheduled-meetings/:id"
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
            path="/organization/:id"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <OrganisationDetails />
              </motion.div>
            }
          />
          <Route
            path="/negotiators/:id"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <NegotiatorsDetails />
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
