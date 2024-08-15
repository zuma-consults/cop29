import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaCalendarDay } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";

interface Event {
  image: string;
  status: string;
  title: string;
  start: string;
  end: string;
  location: string;
  id: string | number;
}

interface CardProps {
  event?: Event;  // event is optional
}

const Card: React.FC<CardProps> = ({ event }) => {
  // Provide default values for destructured properties to avoid errors
  const {
    image = "/images/globe.jpg",
    status = "Not Available",
    title = "Unknown Event",
    start = "TBD",
    end = "TBD",
    location = "Unknown Location",
    id = "0"
  } = event || {};

  return (
    <Link
      to={`/event/${id}`}
      data-aos="zoom-in-right"
      state={{ ...event }}
      className="w-[400px] cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
    >
      <div className="relative h-[40%] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="rounded-lg object-cover w-full h-[250px]"
          loading="lazy"
        />
      </div>
      <div className="h-[60%] w-full p-4 flex flex-col justify-between bg-white rounded-b-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="py-1 px-3 text-xs font-semibold text-green-800 bg-green-100 rounded-full capitalize">
            <MdEventAvailable className="inline mr-1" />
            {status}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 capitalize">{title}</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2 text-gray-500" />
            <span className="text-sm font-medium">{start}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaCalendarDay className="mr-2 text-gray-500" />
            <span className="text-sm font-medium">{end}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-gray-500" />
            <span className="text-sm font-medium">{location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
