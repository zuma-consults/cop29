import React from "react";
import Hero from "../../components/home/Hero";
import World from "../../components/home/World";
import LatestEvents from "../../components/home/LatestEvents";
import Data from "../../components/home/Data";

function Home() {
  return (
    <div className="w-[100vw] h-[100%] relative overflow-x-hidden">
      <Hero />
      <LatestEvents />
      <World />
      <Data />
    </div>
  );
}

export default Home;
