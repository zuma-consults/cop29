import Accordion from "../../components/ui/Accordion";

const items = [
  { 
    title: "Where is COP29 holding, and what is the venue’s location?", 
    content: "COP29 will be held in Baku, Azerbaijan, at the Baku Stadium." 
  },
  { 
    title: "What are the dates for COP29?", 
    content: "COP29 will take place from Monday, 11 November to Friday, 22 November 2024." 
  },
  { 
    title: "Is the COP29 Presidency making any arrangements for delegates' accommodation?", 
    content: "Yes, the official accommodation booking portal for COP29 participants offers a range of accommodation options. For detailed information, please visit: https://cop29-accommodation.bnetwork.com/" 
  },
  { 
    title: "What are the pre-session documents for negotiations?", 
    content: "Pre-session and in-session documents are available on the COP 29, CMP 19, CMA 6, SBSTA 61, and SBI 61 session web pages on the UNFCCC website." 
  },
  { 
    title: "Is it possible to get details on securing a visa for COP29?", 
    content: "Yes, all foreign participants must have a passport valid for at least six months and will require a visa. The Azerbaijan Government has authorized a free-of-charge ‘COP 29 Special Visa’ for registered participants. Apply through the link in your UNFCCC registration confirmation email. The visa is valid until 30 November 2024." 
  },
  { 
    title: "I want to be part of Nigeria’s delegation; what are the criteria?", 
    content: "Please visit the NCCC website for details on the criteria: www.nccc.gov.ng" 
  },
  { 
    title: "Is Nigeria planning to have a pavilion at COP29?", 
    content: "Yes, Nigeria has secured a pavilion at COP29." 
  },
  { 
    title: "What is the cost per slot for a side event at Nigeria’s pavilion?", 
    content: "For details on the cost per slot, please visit the NCCC website: www.nccc.gov.ng and then the NCCC booking portal: https://climateportal.org.ng/" 
  },
  { 
    title: "What are the application procedures for a side event?", 
    content: "Please visit the NCCC booking portal: https://climateportal.org.ng/" 
  },
  { 
    title: "Will there be access to live streaming for side events at the Nigeria Pavilion?", 
    content: "Yes, live streaming is available on request, with a separate cost." 
  },
  { 
    title: "Are there any preparatory workshops for delegates?", 
    content: "Yes, a preparatory workshop will be organized, and details will be communicated to all stakeholders once the date is fixed." 
  },
  { 
    title: "What are the transportation arrangements at COP29?", 
    content: "Transportation services will be free of charge to all participants." 
  },
  { 
    title: "What is the likely weather condition in Azerbaijan during COP29?", 
    content: "The average daytime temperature will range from 12-15°C, with cooler evenings dropping to around 8-10°C." 
  },
  { 
    title: "What should I do in case of a medical emergency?", 
    content: "A nursing room is available in the registration area. Directions can be found on the wayfinding signage and map displayed within the venue." 
  },
  { 
    title: "Do I need medical insurance to attend COP29?", 
    content: "Participants are strongly advised to obtain comprehensive international medical insurance for the duration of their stay. The United Nations and the UNFCCC secretariat disclaim all responsibility for medical, accident, and travel insurance." 
  }
];

function FAQ() {
  return (
    <div className="pb-5 md:pb-2 flex items-center justify-center flex-col px-5 md:px-10 relative mb-5">
      {/* Background Image */}
      <div
        style={{
          backgroundImage: `url("/images/globe.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="rounded-lg w-full md:w-full flex justify-center items-center md:items-start py-10 mt-10 md:mt-20 relative"
      >
        <div className="text-center p-10 md:text-left px-4 md:px-0">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            Frequently Asked Questions
          </h1>
        </div>
      </div>

      <div className="w-full mt-10 px-4 md:px-0">
        <Accordion items={items} />
      </div>

      <div className="bg-green-100 rounded-lg p-6 md:p-10 w-full mt-10 grid gap-4">
        <h2 className="text-xl md:text-2xl font-bold">
          Still have questions? Feel free to contact us for assistance.
        </h2>
        <div className="border-2 md:border-4 border-green-700 rounded flex flex-col md:flex-row p-4 md:p-5 gap-4 items-center">
          <img
            src="/images/contact.avif"
            alt="Contact Us"
            className="w-full md:w-1/2 h-auto object-cover rounded-lg"
          />
          <div className="w-full md:w-1/2 flex flex-col p-4">
            <h2 className="text-xl md:text-2xl font-bold mt-1">Connect With Us</h2>
            <p className="text-sm md:text-base mt-1">
              Reach out to our dedicated team during business hours (9am to 5pm WAT) for personalized assistance and expert guidance. We’re here to help with any inquiries or issues you may have.
            </p>
            <div className="w-full mt-4">
              <button className="bg-green-800 p-2 md:p-3 rounded text-white w-full md:w-auto">
                Make a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
