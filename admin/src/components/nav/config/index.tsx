import { CgOrganisation } from "react-icons/cg";
import { IoIosPeople } from "react-icons/io";
import { MdEvent } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { TbSquareLetterC } from "react-icons/tb";
import { RiContactsBook3Fill } from "react-icons/ri";
import { TiWorldOutline } from "react-icons/ti";

export const navConfig = [
  {
    title: "Scheduled meetings",
    icon: <MdEvent size={24} />,
    path: "/scheduled-meetings",
  },
  // {
  //   title: "Delegates",
  //   icon: <IoIosPeople size={24} />,
  //   path: "/delegate",
  // },
  {
    title: "Organizations",
    icon: <CgOrganisation size={24} />,
    path: "/organization",
  },
  {
    title: "Negotiators",
    icon: <FaPersonBreastfeeding size={24} />,
    path: "/negotiators",
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
  // {
  //   title: "PA Calendar",
  //   icon: <FaCalendarAlt size={24} />,
  //   path: "/pacalender",
  // },
  {
    title: "COP Applicants",
    icon: <TbSquareLetterC size={24} />,
    path: "/cop",
  },
  {
    title: "Contact us Messages",
    icon: <RiContactsBook3Fill size={24} />,
    path: "/contact-us",
  },
  {
    title: "International Requests",
    icon: <TiWorldOutline size={24} />,
    path: "/international",
  },
];
