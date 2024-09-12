import React from "react";
import Hero from "../../components/home/Hero";
// import LatestEvents from "../../components/home/LatestEvents";
import World from "../../components/home/World";
import Data from "../../components/home/Data";
import { useGetOverview } from "../../components/custom-hooks/useOverview";

const Home: React.FC = () => {

  const {data} = useGetOverview()
  return (
    <div className="w-[100vw] h-[100%] relative overflow-x-hidden">
      <Hero />
      {/* <LatestEvents /> */}
      <World />
      <Data overviewDetails={data?.data}/>
    </div>
  );
};

export default Home;
