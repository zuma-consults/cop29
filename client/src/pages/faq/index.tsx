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
          <h1 className="text-green-700 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            Frequently Asked Questions
          </h1>
        </div>
      </div>

      <div className="w-full mt-10 px-4 md:px-0">
        <Accordion items={faqs} />
      </div>

      <div className="w-full mt-10 grid gap-4" id="how-it-works">
        <h2 className="text-2xl md:text-4xl font-bold my-4">How It Works</h2>
        {howItWorks.map((item, index) => (
          <div
            key={index}
            className="border md:border-2 bg-green-100 border-green-700 rounded flex flex-col md:flex-row p-4 md:p-5 gap-4 items-start"
            style={{
              borderRadius: "14px",
              marginBottom: "30px",
              boxShadow: "10px 4px 8px rgba(47, 125, 49, 0.1)",
            }}
          >
            <div className="flex space-x-3 pt-4">
              {item.icons.map((Icon, i) => (
                <Icon key={i} size={35} color="green" />
              ))}
            </div>
            <div className="w-full md:w-2/3 flex flex-col p-4">
              <h2 className="text-xl md:text-2xl font-bold mt-1">
                {item.title}
              </h2>

              <div>
                <h3 className="text-xl md:text-lg text-gray-600 font-bold mt-1">
                  1. Create Account
                </h3>
                <ul className="text-sm md:text-base mt-1 list-disc pl-5">
                  {item.description
                    .split(",") // Split by commas
                    .map(
                      (line, i) =>
                        line.trim() !== "" && <li key={i}>{line.trim()}</li> // Trim each line and render
                    )}
                </ul>
              </div>

              {item.confirmation && (
                <div>
                  <h3 className="text-xl md:text-lg text-gray-600 font-bold mt-1">
                    2. Confirmation
                  </h3>
                  <ul className="text-sm md:text-base mt-1 list-disc pl-5">
                    {item.confirmation
                      .split(", ")
                      .map(
                        (line, i) =>
                          line.trim() !== "" && <li key={i}>{line}</li>
                      )}
                  </ul>
                </div>
              )}

              {item.login && (
                <div>
                  <h3 className="text-xl md:text-lg text-gray-600 font-bold mt-1">
                    3. Nominate delegates
                  </h3>
                  <ul className="text-sm md:text-base mt-1 list-disc pl-5">
                    {item.login
                      .split(", ")
                      .map(
                        (line, i) =>
                          line.trim() !== "" && <li key={i}>{line}</li>
                      )}
                  </ul>
                </div>
              )}

              {/* <p className="text-sm md:text-base mt-1">{item.desHeader}</p> */}
              <br />
              <p className="text-sm md:text-base mt-1 text-red-600">
                Note:{" "}
                {item.desHeader
                  .split(",") // Split by commas
                  .map(
                    (line, i) =>
                      line.trim() !== "" && <li key={i}>{line.trim()}</li> // Trim each line and render
                  )}
              </p>
              <div className="w-full mt-4">
                <Link
                  to={item.link}
                  className="bg-green-800 p-2 md:p-3 rounded text-white w-full md:w-auto"
                >
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
