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

  if (isLoading) {
    return <Loader />;
  }

  return (
    // <section className=" mt-[10vh] md:mt-0">
    //   <div className=" h-[40%] w-full overflow-hidden">
    //     <img
    //       src="/images/seal.png"
    //       alt="seal of the president of Nigeria."
    //       className="rounded-lg object-cover w-full h-[250px]"
    //       loading="lazy"
    //     />
    //   </div>
    //   <div className=" h-[40%] w-full overflow-hidden">
    //     <img
    //       src="/images/seal.png"
    //       alt="seal of the president of Nigeria."
    //       className="rounded-lg object-cover w-full h-[250px]"
    //       loading="lazy"
    //     />
    //   </div>
    //   {/* <div className="flex justify-between items-center">
    //     <p className="text-[32px] text-gray-800">Side Events</p>
    //     <Link
    //       to="/events"
    //       className="bg-green-200 w-max h-max py-2 px-3 rounded"
    //     >
    //       View all Events
    //     </Link>
    //   </div>
    //   <AliceCarousel
    //     mouseTracking
    //     responsive={responsive}
    //     controlsStrategy="responsive"
    //     autoPlay={true}
    //     autoPlayInterval={2000}
    //     infinite={true}
    //     keyboardNavigation={true}
    //     disableButtonsControls
    //   >
    //     {eventData.map((event: any) => (
    //       <div
    //         key={event.id}
    //         className="px-2 hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
    //       >
    //         <Card key={event.id} event={event} />
    //       </div>
    //     ))}
    //   </AliceCarousel> */}
    // </section>
    <section className="flex flex-wrap justify-center gap-4 py-10">
      <div className="w-[40%] h-[40%] md:w-[30%] md:h-[30%] lg:w-[20%] lg:h-[20%] overflow-hidden rounded-full">
        <img
          src="/images/coat.png"
          alt="seal of the president of Nigeria."
          className="object-cover w-full h-full rounded-full"
          loading="lazy"
        />
      </div>
      <div className="w-[40%] h-[40%] md:w-[30%] md:h-[30%] lg:w-[20%] lg:h-[20%] overflow-hidden rounded-full">
        <img
          src="/images/unfccc.png"
          alt="UNFCCC logo"
          className="object-cover w-full h-full rounded-full"
          loading="lazy"
        />
      </div>
      {/* Add your carousel or other content below if needed */}
    </section>
  );
};
export default LatestEvents;
