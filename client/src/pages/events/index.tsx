import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/ui/Pagination";
import Card from "../../components/ui/Card";

const eventData = [
  {
    id: 1,
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Just added",
    title: "Kaduna Young Entrepreneurship Summit 2024",
    time: "Sat, October 17 • 6:00 PM GMT+1",
    price: "Free",
    category: "Kaduna",
  },
  {
    id: 2,
    imageUrl:
      "https://images.pexels.com/photos/3100960/pexels-photo-3100960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Coming Soon",
    title: "Tech Conference 2024",
    time: "Mon, November 20 • 10:00 AM GMT+1",
    price: "$10",
    category: "Tech",
  },
  {
    id: 3,
    imageUrl:
      "https://images.pexels.com/photos/210682/pexels-photo-210682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "New Event",
    title: "Music Festival 2024",
    time: "Fri, December 5 • 8:00 PM GMT+1",
    price: "$50",
    category: "Music",
  },
  {
    id: 4,
    imageUrl:
      "https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Just added",
    title: "Art Exhibition 2024",
    time: "Sun, October 22 • 2:00 PM GMT+1",
    price: "Free",
    category: "Art",
  },
  {
    id: 6,
    imageUrl:
      "https://images.pexels.com/photos/212286/pexels-photo-212286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "New Event",
    title: "Startup Pitch Competition 2024",
    time: "Tue, November 11 • 3:00 PM GMT+1",
    price: "$15",
    category: "Startup",
  },
  {
    id: 7,
    imageUrl:
      "https://images.pexels.com/photos/1629225/pexels-photo-1629225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Coming Soon",
    title: "Cooking Masterclass 2024",
    time: "Wed, December 12 • 11:00 AM GMT+1",
    price: "$30",
    category: "Cooking",
  },
  {
    id: 8,
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Just added",
    title: "Photography Workshop 2024",
    time: "Thu, January 25 • 9:00 AM GMT+1",
    price: "$25",
    category: "Photography",
  },
  {
    id: 9,
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "New Event",
    title: "Business Networking Event 2024",
    time: "Fri, February 14 • 5:00 PM GMT+1",
    price: "Free",
    category: "Business",
  },
  // Additional data
  {
    id: 10,
    imageUrl:
      "https://images.pexels.com/photos/1742720/pexels-photo-1742720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Just added",
    title: "Web Development Bootcamp 2024",
    time: "Mon, March 1 • 10:00 AM GMT+1",
    price: "$200",
    category: "Web Development",
  },
  {
    id: 11,
    imageUrl:
      "https://images.pexels.com/photos/2933350/pexels-photo-2933350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Coming Soon",
    title: "AI Innovations Summit 2024",
    time: "Wed, April 10 • 1:00 PM GMT+1",
    price: "$50",
    category: "AI",
  },
  {
    id: 12,
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "New Event",
    title: "Digital Marketing Workshop 2024",
    time: "Sat, May 15 • 9:00 AM GMT+1",
    price: "$75",
    category: "Digital Marketing",
  },
];

function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleCategoryChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page on category change
  };

  const filteredEvents = eventData.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? event.category === selectedCategory : true)
    );
  });

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  return (
    <section
      id="getStarted"
      className="pb-[5%] md:pb-[2%] flex items-center justify-center flex-col gap-20 px-5 md:px-20 relative"
    >
      {/* Gradient Divs */}
      <div className="absolute top-10 right-0 w-50 h-50 bg-gradient-to-r from-green-400 via-green-600 to-green-700 opacity-70 rounded-full mix-blend-multiply filter blur-[100px] md:w-52 md:h-52 lg:w-[500px] lg:h-[200px] animate-blob animation-delay-4000 z-0"></div>

      {/* Content */}
      <div
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/209154/pexels-photo-209154.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="rounded-lg w-[100%] md:w-full flex justify-center items-center md:items-start py-10 mt-20 relative z-10"
      >
        <div>
          <h1 className="text-white text-[36px] sm:text-[48px] md:text-[64px] lg:text-[88px] font-extrabold">
            Latest Event
          </h1>
        </div>
      </div>

      {/* Search and Filter Inputs */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 px-10 flex-wrap w-full">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4 text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Tech">Tech</option>
          <option value="Art">Art</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded focus:outline-none hover:bg-green-700 transition">
          Search
        </button>
      </div>

      {/* Events Grid */}
      <div className="w-full grid md:grid-cols-3 gap-5 text-black relative z-10">
        {filteredEvents.map((event, index) => (
          <Card
            key={index}
            id={event.id}
            imageUrl={event.imageUrl}
            status={event.status}
            title={event.title}
            time={event.time}
            price={event.price}
          />
        ))}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
export default Events;
