import React, { useEffect, useState } from "react";
import Hero from "../../components/home/Hero";
// import LatestEvents from "../../components/home/LatestEvents";
import World from "../../components/home/World";
import Data from "../../components/home/Data";
import { getOverview } from "../../services/overview";
import VideoWithForm from "../../components/home/Pavilion";

interface OverviewData {
  totalDelegates: number;
  totalOrganizations: number;
  bookedSlots: number;
}

const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] sm:w-[500px] p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">
          Nigeria's Official Pavilion at COP29 – Now in the Blue Zone
        </h2>
        <p className="text-gray-700 mb-6">
          We are thrilled to announce the opening of Nigeria’s official pavilion
          at the Blue Zone for COP29! You are invited to apply to host side
          events at the pavilion for a fee. Simply log in and visit your profile
          page to submit your application.
        </p>
        {/* <p className="text-red-500 font-semibold mb-4">
          Disclaimer: This is the only official pavilion representing Nigeria at
          COP29.
        </p> */}
        <button
          className="px-6 py-2 bg-green-800 text-white rounded-md hover:bg-green-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

  const handleCloseModal = () => {
    setIsModalVisible(false);
    localStorage.setItem("copNotice", "closed");
  };

  useEffect(() => {
    const modalStatus =
      localStorage.getItem("copNotice") === "closed" ? false : true;
    setIsModalVisible(modalStatus);
    fetchOverview();
  }, []);

  return (
    <div className="w-[100vw] h-[100%] relative overflow-x-hidden">
      {isModalVisible && <Modal onClose={handleCloseModal} />}
      <Hero />
      <VideoWithForm />
      <World />

      {loading ? (
        <div className="flex justify-center items-center h-[500px]">
          <p className="text-gray-500">Loading data...</p>
        </div>
      ) : (
        data && <Data overviewDetails={data} />
      )}
    </div>
  );
};

export default Home;
