import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import AliceCarousel from "react-alice-carousel";

const eventData = [
  {
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Just added",
    title: "Kaduna Young Entrepreneurship Summit 2024",
    time: "Sat, October 17 • 6:00 PM GMT+1",
    price: "Free",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/3100960/pexels-photo-3100960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Coming Soon",
    title: "Tech Conference 2024",
    time: "Mon, November 20 • 10:00 AM GMT+1",
    price: "$10",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/210682/pexels-photo-210682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "New Event",
    title: "Music Festival 2024",
    time: "Fri, December 5 • 8:00 PM GMT+1",
    price: "$50",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Just added",
    title: "Art Exhibition 2024",
    time: "Sun, October 22 • 2:00 PM GMT+1",
    price: "Free",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/212286/pexels-photo-212286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "New Event",
    title: "Startup Pitch Competition 2024",
    time: "Tue, November 11 • 3:00 PM GMT+1",
    price: "$15",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/1629225/pexels-photo-1629225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Coming Soon",
    title: "Cooking Masterclass 2024",
    time: "Wed, December 12 • 11:00 AM GMT+1",
    price: "$30",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/3100960/pexels-photo-3100960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Just added",
    title: "Photography Workshop 2024",
    time: "Thu, January 25 • 9:00 AM GMT+1",
    price: "$25",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "New Event",
    title: "Business Networking Event 2024",
    time: "Fri, February 14 • 5:00 PM GMT+1",
    price: "Free",
  },
];
const responsive = {
  0: { items: 1 },
  300: { items: 2 },
  450: { items: 2 },
  800: { items: 3 },
  1024: { items: 3 },
};

function LatestEvents() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < eventData.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="relative flex flex-col p-10 w-full h-[100vh]">
      <div className="flex justify-between items-center">
        <p className="text-[32px] text-gray-800">Latest Events</p>
        <Link
          to="/events"
          className="bg-green-200 w-max h-max py-2 px-3 rounded"
        >
          View all Events
        </Link>
      </div>
      <AliceCarousel
        mouseTracking
        responsive={responsive}
        controlsStrategy="responsive"
        autoPlay={true}
        autoPlayInterval={2000}
        infinite={true}
        keyboardNavigation={true}
        disableButtonsControls
      >
        {eventData.map((event, index) => (
          <div
            key={index}
            className="px-2 hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
          >
            <Card
              imageUrl={event.imageUrl}
              status={event.status}
              title={event.title}
              time={event.time}
              price={event.price}
              id={event.id}
            />
          </div>
        ))}
      </AliceCarousel>

      {/* <div className="flex bg-red-600">
        {eventData.map((event, index) => (
          <div key={index} className="min-w-[33.33%] px-2">
            <Card
              imageUrl={event.imageUrl}
              status={event.status}
              title={event.title}
              time={event.time}
              price={event.price}
              id={event.id}
            />
          </div>
        ))}
      </div> */}
      {/* <div className="flex justify-end mr-10">
        <div className="flex gap-5 items-start justify-center w-max h-max text-green-800">
          <button onClick={handlePrev} disabled={currentIndex === 0}>
            <BsArrowLeft
              size={38}
              className={
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }
            />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= eventData.length - 3}
          >
            <BsArrowRight
              size={38}
              className={
                currentIndex >= eventData.length - 3
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            />
          </button>
        </div>
      </div> */}
    </section>
  );
}
export default LatestEvents;
