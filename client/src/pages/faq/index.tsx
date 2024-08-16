import { Link } from "react-router-dom";
import Accordion from "../../components/ui/Accordion";
import { faqs, howItWorks } from "../../util/data";

function FAQ() {
  return (
    <div className="pb-5 md:pb-2 flex items-center justify-center flex-col px-5 md:px-10 relative mb-5">
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
        <Accordion items={faqs} />
      </div>

      <div className="w-full mt-10 grid gap-4" id='how-it-works'>
        <h2 className="text-xl md:text-2xl font-bold">
          How It Works
        </h2>
        {howItWorks.map((item, index) => (
          <div
            key={index}
            className="border md:border-2 bg-green-100 border-green-700 rounded flex flex-col md:flex-row p-4 md:p-5 gap-4 items-center"
          >
            <img
              src={item.imageSrc}
              alt={item.imageAlt}
              className="w-full md:w-1/2 h-[200px] object-cover rounded-lg"
            />
            <div className="w-full md:w-1/2 flex flex-col p-4">
              <h2 className="text-xl md:text-2xl font-bold mt-1">{item.title}</h2>
              <p className="text-sm md:text-base mt-1">
                {item.description}
              </p>
              <div className="w-full mt-4">
                <Link to={item.link} className="bg-green-800 p-2 md:p-3 rounded text-white w-full md:w-auto">
                  {item.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
