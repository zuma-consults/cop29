import { CgOrganisation } from "react-icons/cg";
import { IoIosPeople } from "react-icons/io";
import { MdEvent } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FaCalendarAlt, FaHome } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";

export const navConfig = [
  {
    title: "Home",
    icon: <FaHome size={24} />,
    path: "/",
  },
  {
    title: "Delegates",
    icon: <IoIosPeople size={24} />,
    path: "/delegate",
  },
  {
    title: "Organizations",
    icon: <CgOrganisation size={24} />,
    path: "/organization",
  },
  {
    title: "Events",
    icon: <MdEvent size={24} />,
    path: "/event",
  },
  {
    title: "Users",
    icon: <RiAdminFill size={24} />,
    path: "/user",
  },
  // {
  //   title: "Invoices",
  //   icon: <FaFileInvoiceDollar size={24} />,
  //   path: "/invoice",
  // },
  {
    title: "Calendar",
    icon: <FaCalendarAlt size={24} />,
    path: "/calender",
  },
  {
    title: "Announcements",
    icon: <GrAnnounce size={24} />,
    path: "/announcement",
  },
];
