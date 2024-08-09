import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import { IoTimerOutline } from "react-icons/io5";
import Pills from "../../components/ui/Pills";
import AliceCarousel from "react-alice-carousel";
import Card from "../../components/ui/Card";

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

function EventDetails() {
  const location = useLocation();
  const { imageUrl, status, title, time, price } = location.state || {};

  return (
    <div className=" p-20 px-[120px]">
      <div className="flex items-center justify-center">
        <div className="h-[400px] w-[100%]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
      <div className="relative border-b-[1px] border-green-200 pb-10">
        <div className="mt-10 grid gap-8">
          <div>
            <div className="w-max py-[5px] h-max bg-green-300 rounded font-semibold px-2 text-[12px] flex items-center justify-center mb-5">
              {status}
            </div>
            <h1 className="text-[14px] font-bold text-gray-800 w-[50%]">
              {time}
            </h1>
            <div className="text-gray-900  text-[40px] w-[50%] font-bold">
              {title}
            </div>
          </div>
          <span>
            Get ready for the ultimate gathering of young, ambitious
            entrepreneurs it's going to be epic!
          </span>
          <div className="text-[22px] font-bold grid gap-3">
            Date and time
            <p className="text-gray-600 text-[14px] font-medium">{time}</p>
          </div>
          <div className="text-[22px] font-bold grid gap-2">
            Location
            <div className="flex items-start gap-3">
              <ImLocation />
              <span className="text-gray-900 font-semibold text-[14px]">
                KADA Hive(Innovation & Tech Hub)
              </span>
            </div>
            <div>
              <span className="text-gray-600 font-normal text-[14px]">
                NO11B Sambo Road Kaduna, KD 800283
              </span>
            </div>
          </div>
          <div className="text-[22px] font-bold grid gap-3">
            Price
            <p className="text-gray-600 text-[14px] font-medium">{price}</p>
          </div>
          <div className="text-[22px] font-bold grid gap-5">
            About this event
            <div className="flex gap-3 text-gray-900 text-[14px] font-medium items-center">
              <div className="w-max h-max bg-green-100 p-2 rounded">
                <IoTimerOutline size={20} color="green" />
              </div>
              Event lasts 5 hours
            </div>
            <div className="w-[70%] text-[14px] text-gray-600 font-normal">
              Kaduna Young Entrepreneurship Summit 2024 is where the future of
              business in Kaduna will be shaped! Join us at KADA Hive
              (Innovation & Tech Hub) for a day filled with inspiration,
              networking, and learning. Whether you're a budding entrepreneur or
              already running your own business, this summit is the place to be.
              Connect with like-minded individuals, gain valuable insights from
              industry experts, and take your entrepreneurial journey to the
              next level. Don't miss out on this opportunity to be part of
              something big!
            </div>
          </div>
          <div className="text-[22px] font-bold grid gap-3">
            Tags
            <div className="flex items-center justify-start gap-2  flex-wrap">
              <Pills label={"Nigerian Events"} />
              <Pills label={"Abuja Events"} />
              <Pills label={"Lagos Events"} />
              <Pills label={"#submit"} />
              <Pills label={"#2024"} />
              <Pills label={"#Enterprenuer"} />
            </div>
          </div>
          <div className="text-[22px] font-bold grid gap-3">
            Organized by
            <p className="text-gray-600 text-[14px] font-medium">
              okike consult entertainment
            </p>
          </div>
        </div>
        <div className=" absolute top-0 right-0 w-[40%] gap-y-3 rounded-lg p-3 bg-green-300">
          <div className="grid gap-2 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-[18px] font-bold">Get your spot</span>
              <div className="flex items-center justify-center gap-4">
                <button className="px-3 py-1 rounded bg-green-400 text-[18px] text-green-800">
                  -
                </button>
                <span className="text-green-800 text-[16px]">1</span>
                <button className="px-3 py-1 rounded bg-green-400 text-[18px] text-green-800">
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
      <div className="flex flex-col gap-5 pt-12">
        <span className="text-[26px] font-bold ">Other Related Events</span>
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
      </div>
    </div>
  );
}

export default EventDetails;
