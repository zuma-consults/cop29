import { CgOrganisation } from "react-icons/cg";
import { IoIosPeople } from "react-icons/io";
import { MdEvent } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";
// import { GrAnnounce } from "react-icons/gr";
import { TbSquareLetterC } from "react-icons/tb";

export const navConfig = [
  {
    title: "Events",
    icon: <MdEvent size={24} />,
    path: "/events",
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
    title: "Users",
    icon: <RiAdminFill size={24} />,
    path: "/user",
  },
  {
    title: "PA Calender",
    icon: <FaCalendarAlt size={24} />,
    path: "/pacalender",
  },
  {
    title: "COP Applicants",
    icon: <TbSquareLetterC size={24} />,
    path: "/cop",
  },
  // {
  //   title: "Announcements",
  //   icon: <GrAnnounce size={24} />,
  //   path: "/announcement",
  // },
];
