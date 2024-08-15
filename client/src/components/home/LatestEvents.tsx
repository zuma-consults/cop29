import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import Card from "../ui/Card";
import { useGetEvents } from "../custom-hooks/useEvents";
import Loader from "../ui/Loader";

const responsive = {
  0: { items: 1 },
  300: { items: 2 },
  450: { items: 2 },
  800: { items: 3 },
  1024: { items: 3 },
};

const LatestEvents: React.FC = () => {
  const { data, isLoading } = useGetEvents();
  const eventData = data?.data?.events;
  console.log(data, "data");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="relative flex flex-col p-10 w-full h-[80vh]">
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
        {eventData.map((event: any) => (
          <div
            key={event.id}
            className="px-2 hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
          >
            <Card key={event.id} event={event} />
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
};
export default LatestEvents;
