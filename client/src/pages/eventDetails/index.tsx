import React from "react";
import { useLocation } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import { IoTimerOutline } from "react-icons/io5";
import AliceCarousel from "react-alice-carousel";
import Pills from "../../components/ui/Pills";
import Card from "../../components/ui/Card";

const eventData = [
  {
    id: 0,
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Just added",
    title: "Kaduna Young Entrepreneurship Summit 2024",
    time: "Sat, October 17 • 6:00 PM GMT+1",
    price: "Free",
  },
  {
    id: 1,
    imageUrl:
      "https://images.pexels.com/photos/3100960/pexels-photo-3100960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Coming Soon",
    title: "Tech Conference 2024",
    time: "Mon, November 20 • 10:00 AM GMT+1",
    price: "$10",
  },
  {
    id: 2,
    imageUrl:
      "https://images.pexels.com/photos/210682/pexels-photo-210682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "New Event",
    title: "Music Festival 2024",
    time: "Fri, December 5 • 8:00 PM GMT+1",
    price: "$50",
  },
  {
    id: 3,
    imageUrl:
      "https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Just added",
    title: "Art Exhibition 2024",
    time: "Sun, October 22 • 2:00 PM GMT+1",
    price: "Free",
  },
  {
    id: 4,
    imageUrl:
      "https://images.pexels.com/photos/212286/pexels-photo-212286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "New Event",
    title: "Startup Pitch Competition 2024",
    time: "Tue, November 11 • 3:00 PM GMT+1",
    price: "$15",
  },
  {
    id: 5,
    imageUrl:
      "https://images.pexels.com/photos/1629225/pexels-photo-1629225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Coming Soon",
    title: "Cooking Masterclass 2024",
    time: "Wed, December 12 • 11:00 AM GMT+1",
    price: "$30",
  },
  {
    id: 6,
    imageUrl:
      "https://images.pexels.com/photos/3100960/pexels-photo-3100960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Just added",
    title: "Photography Workshop 2024",
    time: "Thu, January 25 • 9:00 AM GMT+1",
    price: "$25",
  },
  {
    id: 7,
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

const EventDetails: React.FC = () => {
  const location = useLocation();
  const { imageUrl, status, title, time, price } = location.state || {};

  return (
    <div className="p-6 sm:p-10 md:p-20 md:px-[120px]">
      <div className="flex flex-col items-center justify-center">
        <div className="h-[200px] sm:h-[300px] md:h-[400px] w-full">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
      <div className="relative border-b-[1px] border-green-200 pb-6 sm:pb-8 md:pb-10">
        <div className="mt-6 sm:mt-8 md:mt-10 grid gap-4 sm:gap-6 md:gap-8">
          <div>
            <div className="w-max py-[3px] sm:py-[5px] h-max bg-green-300 rounded font-semibold px-2 text-[10px] sm:text-[12px] flex items-center justify-center mb-3 sm:mb-5">
              {status}
            </div>
            <h1 className="text-[12px] sm:text-[14px] font-bold text-gray-800 w-full md:w-[50%]">
              {time}
            </h1>
            <div className="text-gray-900 text-[24px] sm:text-[32px] md:text-[40px] w-full md:w-[50%] font-bold">
              {title}
            </div>
          </div>
          <span className="text-gray-600 text-[12px] sm:text-[14px]">
            Get ready for the ultimate gathering of young, ambitious entrepreneurs - it's going to be epic!
          </span>
          <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-1 sm:gap-2 md:gap-3">
            Date and time
            <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
              {time}
            </p>
          </div>
          <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-1 sm:gap-2 md:gap-3">
            Location
            <div className="flex items-start gap-2 sm:gap-3">
              <ImLocation />
              <span className="text-gray-900 font-semibold text-[12px] sm:text-[14px]">
                KADA Hive(Innovation & Tech Hub)
              </span>
            </div>
            <div>
              <span className="text-gray-600 font-normal text-[12px] sm:text-[14px]">
                NO11B Sambo Road Kaduna, KD 800283
              </span>
            </div>
          </div>
          <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-1 sm:gap-3">
            Price
            <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">{price}</p>
          </div>
          <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-3">
            About this event
            <div className="flex gap-2 sm:gap-3 text-gray-900 text-[12px] sm:text-[14px] font-medium items-center">
              <div className="w-max h-max bg-green-100 p-2 rounded">
                <IoTimerOutline size={16} color="green" />
              </div>
              Event lasts 5 hours
            </div>
            <div className="w-full md:w-[70%] text-[12px] sm:text-[14px] text-gray-600 font-normal">
              Kaduna Young Entrepreneurship Summit 2024 is where the future of business in Kaduna will be shaped! Join us at KADA Hive (Innovation & Tech Hub) for a day filled with inspiration, networking, and learning. Whether you're a budding entrepreneur or already running your own business, this summit is the place to be. Connect with like-minded individuals, gain valuable insights from industry experts, and take your entrepreneurial journey to the next level. Don't miss out on this opportunity to be part of something big!
            </div>
          </div>
          <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-2 sm:gap-3">
            Tags
            <div className="flex items-center justify-start gap-2 flex-wrap">
              <Pills label={"Nigerian Events"} />
              <Pills label={"Abuja Events"} />
              <Pills label={"Lagos Events"} />
              <Pills label={"#submit"} />
              <Pills label={"#2024"} />
              <Pills label={"#Enterprenuer"} />
            </div>
          </div>
          <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-2 sm:gap-3">
            Organized by
            <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
              okike consult entertainment
            </p>
          </div>
        </div>
        <div className="md:absolute md:0 md:top-0 md:right-0 w-full md:w-[40%] gap-y-3 rounded-lg p-3 bg-green-300 mt-5">
          <div className="grid gap-2 p-3 rounded-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <span className="text-[16px] sm:text-[18px] font-bold">Get your spot</span>
              <div className="flex items-center justify-center gap-4 mt-3 sm:mt-0">
                <button className="px-2 sm:px-3 py-1 rounded bg-green-400 text-[16px] sm:text-[18px] text-green-800">
                  -
                </button>
                <span className="text-green-800 text-[14px] sm:text-[16px]">1</span>
                <button className="px-2 sm:px-3 py-1 rounded bg-green-400 text-[16px] sm:text-[18px] text-green-800">
                  +
                </button>
              </div>
            </div>
          </div>
          <button className="bg-co-primary text-white p-2 rounded w-full">
            Reserve a spot
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 pt-8 sm:pt-10 md:pt-12">
        <span className="text-[20px] sm:text-[24px] md:text-[26px] font-bold ">Other Related Events</span>
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
              className="px-1 sm:px-2 hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
            >
              <Card
                imageUrl={event.imageUrl}
                status={event.status}
                title={event.title}
                time={event.time}
                price={event.price}
                id={event?.id}
              />
            </div>
          ))}
        </AliceCarousel>
      </div>
    </div>
  );
};

export default EventDetails;
