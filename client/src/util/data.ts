import { CgOrganisation } from "react-icons/cg";
import { IoCreateOutline, IoPersonSharp } from "react-icons/io5";

export const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT",
];

export const categories = [
  "Energy",
  "Power",
  "Healthcare",
  "Education",
  "Agriculture",
  "Finance",
  "Technology",
  "Transportation",
  "Environment",
  "Manufacturing",
  "Tourism",
];

export const organizationTypes = [
  "  Ministries, Departments, and Agencies (MDA)",
  " Civil Society Organization (CSO)",
  "  Non-Governmental Organization (NGO)",
  "State",
  "Private Sector",
  "International Organization",
];

export const faqs = [
  {
    title: "Where is COP29 holding, and what is the venue’s location?",
    content: "COP29 will be held in Baku, Azerbaijan, at the Baku Stadium.",
  },
  {
    title: "What are the dates for COP29?",
    content:
      "COP29 will take place from Monday, 11 November to Friday, 22 November 2024.",
  },
  {
    title:
      "Is the COP29 Presidency making any arrangements for delegates' accommodation?",
    content:
      "Yes, the official accommodation booking portal for COP29 participants offers a range of accommodation options. For detailed information, please visit: https://cop29-accommodation.bnetwork.com/",
  },
  {
    title: "What are the pre-session documents for negotiations?",
    content:
      "Pre-session and in-session documents are available on the COP 29, CMP 19, CMA 6, SBSTA 61, and SBI 61 session web pages on the UNFCCC website.",
  },
  {
    title: "Is it possible to get details on securing a visa for COP29?",
    content:
      "Yes, all foreign participants must have a passport valid for at least six months and will require a visa. The Azerbaijan Government has authorized a free-of-charge ‘COP 29 Special Visa’ for registered participants. Apply through the link in your UNFCCC registration confirmation email. The visa is valid until 30 November 2024.",
  },
  {
    title: "I want to be part of Nigeria’s delegation; what are the criteria?",
    content:
      "Please visit the NCCC website for details on the criteria: www.nccc.gov.ng",
  },
  {
    title: "Is Nigeria planning to have a pavilion at COP29?",
    content: "Yes, Nigeria has secured a pavilion at COP29.",
  },
  {
    title: "What is the cost per slot for a side event at Nigeria’s pavilion?",
    content:
      "For details on the cost per slot, please visit the NCCC website: www.nccc.gov.ng and then the NCCC booking portal: https://climateportal.org.ng/",
  },
  {
    title: "What are the application procedures for a side event?",
    content:
      "Please visit the NCCC booking portal: https://climateportal.org.ng/",
  },
  {
    title:
      "Will there be access to live streaming for side events at the Nigeria Pavilion?",
    content:
      "Yes, live streaming is available on request, with a separate cost.",
  },
  {
    title: "Are there any preparatory workshops for delegates?",
    content:
      "Yes, a preparatory workshop will be organized, and details will be communicated to all stakeholders once the date is fixed.",
  },
  {
    title: "What are the transportation arrangements at COP29?",
    content:
      "Transportation services will be free of charge to all participants.",
  },
  {
    title: "What is the likely weather condition in Azerbaijan during COP29?",
    content:
      "The average daytime temperature will range from 12-15°C, with cooler evenings dropping to around 8-10°C.",
  },
  {
    title: "What should I do in case of a medical emergency?",
    content:
      "A nursing room is available in the registration area. Directions can be found on the wayfinding signage and map displayed within the venue.",
  },
  {
    title: "Do I need medical insurance to attend COP29?",
    content:
      "Participants are strongly advised to obtain comprehensive international medical insurance for the duration of their stay. The United Nations and the UNFCCC secretariat disclaim all responsibility for medical, accident, and travel insurance.",
  },
];

export const links = [
  {
    title: "Find Events",
    path: "/events",
  },
  {
    title: "Create Event",
    path: "/create-event",
  },
  {
    title: "FAQs",
    path: "/faq",
  },
];

export const howItWorks = [
  {
    icons: [IoPersonSharp],
    title: "Register as a Delegate",
    description:
      "Provide your Name, Email Address, and Phone Number. All fields are required.",
    confirmation: "Confirm your email address.",
    desHeader:
      "Ensure all information matches your official photo ID, which you will present at the registration desk.",
    buttonText: "Register",
    link: "/signup",
    login: "Upload your delegate credentials and await approval.",
  },
  {
    icons: [IoCreateOutline],
    title: "Create an Event",
    description:
      "Provide the Event Name, Email Address, and Phone Number. All fields are required.",
    confirmation: "Confirm your email address.",
    desHeader:
      "Ensure all information matches your official photo ID, which you will present at the registration desk.",
    buttonText: "Create an Event",
    link: "/create-event",
    login:
      "Select a date and time slot for your event. Await approval and invoice. Make the payment and upload proof of payment.",
  },
  {
    icons: [CgOrganisation],
    title: "Register as an Organization",
    description:
      "Provide your Organization's Name, Email Address, Phone Number, and a Letter of Approval from your Organization.",
    confirmation: "Confirm your email address.",
    desHeader:
      "Ensure all information matches your official photo ID, which you will present at the registration desk.",
    buttonText: "Register",
    link: "/signup",
    login: "Upload your organization's credentials and await approval.",
  },
];
