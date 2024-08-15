import Accordion from "../../components/ui/Accordion";

const items = [
  { 
    title: "How do I book a ticket for an event?", 
    content: "Booking a ticket is easy! Just navigate to the event page, select your preferred date and time, and click on 'Book Now.' Follow the prompts to enter your details and payment information, and you'll receive a confirmation email with your ticket details." 
  },
  { 
    title: "Can I create my own event on Cop29?", 
    content: "Absolutely! To create your own event, go to the 'Create Event' section, fill in the event details, set the date and time, and customize the registration options. Once you submit, your event will be live and accessible to other users." 
  },
  { 
    title: "What if I need to cancel or change my booking?", 
    content: "If you need to cancel or change your booking, please visit the 'My Bookings' section of your profile. Here you can select the event and choose to modify or cancel your reservation. Note that cancellation policies may vary depending on the event." 
  },
  { 
    title: "How can I contact the event organizer?", 
    content: "You can contact the event organizer directly through the event page. Look for the 'Contact Organizer' button or section, and you'll find options to send a message or get in touch through other provided contact methods." 
  },
  { 
    title: "What payment methods do you accept?", 
    content: "We accept various payment methods including credit/debit cards, PayPal, and other popular payment gateways. You can select your preferred payment option during the booking process." 
  },
  { 
    title: "How do I know if an event is sold out?", 
    content: "The event page will display real-time availability. If tickets are sold out, you'll see a notification indicating that no more tickets are available. You can also sign up for notifications to be alerted if additional tickets become available." 
  },
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
