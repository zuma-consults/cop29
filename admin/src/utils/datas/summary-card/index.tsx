import { CgOrganisation } from "react-icons/cg";
import { FcApproval } from "react-icons/fc";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { IoIosPeople } from "react-icons/io";
import { VscGitStashApply } from "react-icons/vsc";

export const HomeSummaryCardData = [
  {
    icon: <IoIosPeople size={24} />,
    title: "TOTAL DELEGATES",
    number: 34,
  },
  {
    icon: <CgOrganisation size={24} />,
    title: "TOTAL ORGANIZATIONS",
    number: 67,
  },
];

export const DelegateSummaryCardData = [
  {
    icon: <VscGitStashApply size={24} />,
    title: "TOTAL APPLLICATIONS",
    number: 341024,
  },
  {
    icon: <FcApproval size={24} />,
    title: "TOTAL APPROVED",
    number: 2307,
  },
];

export const OrganisationSummaryCardData = [
  {
    icon: <VscGitStashApply size={24} />,
    title: "TOTAL APPLLICATIONS",
    number: 90341024,
  },
  {
    icon: <FcApproval size={24} />,
    title: "TOTAL APPROVED",
    number: 2307,
  },
  {
    icon: <CgOrganisation size={24} />,
    title: "MDAs",
    number: 24307,
  },
  {
    icon: <HiBuildingOffice2 size={24} />,
    title: "NGOs",
    number: 112307,
  },
];
