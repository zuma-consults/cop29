import Pagination from "../../components/ui/Pagination";
import Card from "../../components/ui/Card";
import { useGetEvents } from "../../components/custom-hooks/useEvents";
import Loader from "../../components/ui/Loader";

function Events() {
const {data, isLoading} = useGetEvents()
const eventData = data?.data?.events

if(isLoading){
  return <Loader/>
}

  return (
    <section
      className="pb-[5%] md:pb-[2%] flex items-center justify-center flex-col gap-20 px-5 md:px-20 relative"
    >
      {/* Gradient Divs */}
      <div className="absolute top-10 right-0 w-50 h-50 bg-gradient-to-r from-green-400 via-green-600 to-green-700 opacity-70 rounded-full mix-blend-multiply filter blur-[100px] md:w-52 md:h-52 lg:w-[500px] lg:h-[200px] animate-blob animation-delay-4000 z-0"></div>

      {/* Content */}
      <div
        style={{
          backgroundImage: `url("/images/globe.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="rounded-lg w-[100%] md:w-full flex justify-center items-center md:items-start py-10 mt-20 relative z-10"
      >
     <div className="absolute inset-0 bg-co-primary opacity-50 rounded-lg"></div>
        <div>
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold opacity-90">
            Latest Events
          </h1>
        </div>
      </div>

      {/* Search and Filter Inputs */}
      {/* <div className="flex flex-col md:flex-row items-center justify-center gap-4 px-10 flex-wrap w-full">
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
      </div> */}

      {/* Events Grid */}
      <div className="md:w-full w-3/4 md:m-0 flex flex-col md:flex-row flex-wrap gap-[20px] items-center px-[30px] text-black">
        {eventData?.map((event: any) => (
          <Card key={event.id} event={event} />
        ))}
      </div>
      {/* Pagination */}
      {/* <Pagination
        currentPage={1}
        totalPages={12}
        onPageChange={()=>{}}
      /> */}
    </section>
  );
}
export default Events;
