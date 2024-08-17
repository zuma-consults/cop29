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
    </section>
  );
};
export default LatestEvents;
