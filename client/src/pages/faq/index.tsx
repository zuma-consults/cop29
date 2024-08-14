import Accordion from "../../components/ui/Accordion";

const items = [
  { title: "Accordion Item 1", content: "Content for item 1." },
  { title: "Accordion Item 2", content: "Content for item 2." },
  { title: "Accordion Item 3", content: "Content for item 3." },
  { title: "Accordion Item 4", content: "Content for item 4." },
  { title: "Accordion Item 5", content: "Content for item 5." },
  { title: "Accordion Item 6", content: "Content for item 6." },
];

function FAQ() {
  return (
    <div className="pb-5 md:pb-2 flex items-center justify-center flex-col px-5 md:px-10 relative mb-5">
      <div className="absolute top-10 right-0 w-40 h-40 md:w-52 md:h-52 lg:w-80 lg:h-60 bg-gradient-to-r from-green-400 via-green-600 to-green-700 opacity-70 rounded-full mix-blend-multiply filter blur-xl md:blur-2xl animate-blob animation-delay-4000 z-0"></div>

      <div
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/209154/pexels-photo-209154.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="rounded-lg w-full md:w-full flex justify-center items-center md:items-start py-10 mt-10 md:mt-20 relative z-10"
      >
        <div className="text-center md:text-left px-4 md:px-0">
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
            src="https://royalminesproperty.com/static/media/caller.ea5c26aca0e26a69b8e4.avif"
            alt="Contact Us"
            className="w-full md:w-1/2 h-auto object-cover rounded-lg"
          />
          <div className="w-full md:w-1/2 flex flex-col p-4">
            <h2 className="text-xl md:text-2xl font-bold mt-1">Connect With Us</h2>
            <p className="text-sm md:text-base mt-1">
              Reach out to our dedicated office desk during our business hours, from 9am to 5pm WAT, for personalized assistance and expert guidance on all your inquiries.
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
