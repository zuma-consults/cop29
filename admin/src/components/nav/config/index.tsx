import { CgOrganisation } from "react-icons/cg";
import { MdEvent } from "react-icons/md";
import { RiAdminFill, RiAncientPavilionFill } from "react-icons/ri";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { TbSquareLetterC } from "react-icons/tb";
import { RiContactsBook3Fill } from "react-icons/ri";
import { TiWorldOutline } from "react-icons/ti";

export const navConfig = [
  {
    title: "Scheduled meetings",
    icon: <MdEvent size={24} />,
    path: "/meetings",
  },
  {
    title: "Pavilion",
    icon: <RiAncientPavilionFill size={24} />,
    path: "/pavilion",
  },
  {
    title: "Organizations",
    icon: <CgOrganisation size={24} />,
    path: "/organizations",
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
    path: "/calendar",
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
    path: "/applicants",
  },
  {
    title: "Contact us Messages",
    icon: <RiContactsBook3Fill size={24} />,
    path: "/contacts",
  },
  {
    title: "International Requests",
    icon: <TiWorldOutline size={24} />,
    path: "/international",
  },
];
