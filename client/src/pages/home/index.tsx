import React, { useEffect, useState } from "react";
import Hero from "../../components/home/Hero";
// import LatestEvents from "../../components/home/LatestEvents";
import World from "../../components/home/World";
import Data from "../../components/home/Data";
import { getOverview } from "../../services/overview";

interface OverviewData {
  totalDelegates: number;
  totalOrganizations: number;
  bookedSlots: number;
}

const Home: React.FC = () => {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOverview = async () => {
    try {
      const response = await getOverview();
      if (response) {
        setData(response.data); // Ensure this matches the API response structure
      }
    } catch (error) {
      console.error("Error fetching overview data:", error);
    } finally {
      setLoading(false); // Set loading to false after the API call finishes
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div className="w-[100vw] h-[100%] relative overflow-x-hidden">
      <Hero />
      {/* <LatestEvents /> */}
      <World />

      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <p className="text-gray-500">Loading data...</p>
        </div>
      ) : (
        data && <Data overviewDetails={data} />
      )}
    </div>
  );
};

export default Home;
