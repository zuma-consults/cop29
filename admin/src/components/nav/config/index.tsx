import { CgOrganisation } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

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
];
