import React from "react";
import { useLocation } from "react-router-dom";
import Pills from "../../components/ui/Pills";
import VideoPlayer from "../../components/ui/VideoPlayer";
import { formatDate1 } from "../../util/formattedDate";

const EventDetails: React.FC = () => {
  const location = useLocation();

  console.log(location);
  const event = location.state as {
    image: string;
    status: string;
    title: string;
    start: string;
    end: string;
    location: string;
    price: string;
    tags: string[];
    organizer: string;
    description: string;
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  const {
    image,
    status,
    title,
    start,
    end,
    location: eventLocation,
    price,
    tags,
    description,
    organizer,
  } = event;
  const tagArr = tags[0].split(",");
  return (
    <div className="p-6 sm:p-10 md:p-20 md:px-[120px] bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <div className="h-[200px] sm:h-[300px] md:h-[400px] w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-3xl shadow-lg"
          />
        </div>
      </div>
      <div className="relative border-b-[1px] border-green-200 pb-6 sm:pb-8 md:pb-10">
        <div className="mt-6 sm:mt-8 md:mt-10 grid gap-4 sm:gap-6 md:gap-8">
          <div>
            <div className="w-max py-[3px] sm:py-[5px] h-max bg-green-300 rounded font-semibold px-2 capitalize text-[10px] sm:text-[12px] flex items-center justify-center mb-3 sm:mb-5">
              {status}
            </div>
            <div className="text-gray-900 text-[24px] sm:text-[32px] md:text-[40px] w-full md:w-[50%] font-bold">
              {title}
            </div>
          </div>
          <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-1 sm:gap-2 md:gap-3">
            Date and Time
            <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
              {`From ${formatDate1(start)} to ${formatDate1(end)}`}
            </p>
          </div>
          {/* <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-1 sm:gap-3">
            Location
            <div className="flex items-start gap-2 sm:gap-3">
              <ImLocation />
              <span className="text-gray-900 font-semibold text-[12px] sm:text-[14px]">
                {eventLocation}
              </span>
            </div>
          </div> */}
          {/* <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-1 sm:gap-3">
            Price
            <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
              {price}
            </p>
          </div> */}
          <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-2 sm:gap-3">
            About this Event
            <div className="w-full text-[12px] sm:text-[14px] text-gray-600 font-normal">
              {description}
            </div>
          </div>
          <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-2 sm:gap-3">
            Tags
            <div className="flex items-center justify-start gap-2 flex-wrap">
              {tagArr.map((el) => (
                <Pills label={el} />
              ))}
            </div>
          </div>
          <div className="text-[18px] sm:text-[20px] md:text-[22px] font-bold grid gap-2 sm:gap-3">
            Organized by
            <p className="text-gray-600 text-[12px] sm:text-[14px] font-medium">
              {organizer}
            </p>
          </div>
        </div>
        {/* <div className="md:absolute md:top-0 md:right-0 w-full md:w-[40%] bg-green-300 rounded-lg p-5 mt-5">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-between w-full">
              <span className="text-[16px] sm:text-[18px] font-bold">
                Get your spot
              </span>
              <div className="flex items-center gap-4 mt-3 sm:mt-0">
                <button className="px-2 sm:px-3 py-1 rounded bg-green-400 text-[16px] sm:text-[18px] text-green-800">
                  -
                </button>
                <span className="text-green-800 text-[14px] sm:text-[16px]">
                  1
                </span>
                <button className="px-2 sm:px-3 py-1 rounded bg-green-400 text-[16px] sm:text-[18px] text-green-800">
                  +
                </button>
              </div>
            </div>
            <button className="bg-green-500 text-white p-2 rounded w-full">
              Reserve a Spot
            </button>
          </div>
        </div> */}
      </div>
      <div className="flex flex-col gap-5 pt-8 sm:pt-10 md:pt-12">
        <span className="text-[20px] sm:text-[24px] md:text-[26px] font-bold">
          Live Event Excerpts
        </span>
        <VideoPlayer src="https://www.youtube.com/watch?v=UFfzpvVnoM8" />
      </div>
    </div>
  );
};

export default EventDetails;
