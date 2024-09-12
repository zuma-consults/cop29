import React, { useEffect, useState } from "react";
import Hero from "../../components/home/Hero";
// import LatestEvents from "../../components/home/LatestEvents";
import World from "../../components/home/World";
import Data from "../../components/home/Data";
import { getOverview } from "../../services/overview";

const Home: React.FC = () => {
  const [data, setData] = useState(null)
  const Overview = async () => {
    const response = await getOverview();
    response && setData(response) 
  };

  useEffect(()=>{
    Overview()
  }, [])

  return (
    <div className="w-[100vw] h-[100%] relative overflow-x-hidden">
      <Hero />
      {/* <LatestEvents /> */}
      <World />
      <Data overviewDetails={data?.data} />
    </div>
  );
};

export default Home;
