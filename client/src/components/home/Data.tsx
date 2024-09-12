import React from "react";

interface OverviewDetailsProps {
  overviewDetails: {
    totalDelegates: number;
    totalOrganizations: number;
    bookedSlots: number;
  };
}

const Data: React.FC<OverviewDetailsProps> = ({ overviewDetails }) => {
  console.log(overviewDetails)
  return (
    <section
      className="relative flex flex-col gap-10 md:gap-20 pt-10 h-auto md:h-[80vh] w-full bg-cover bg-center"
      data-aos="fade-up"
    >
      <div className="flex justify-center items-center mb-4" data-aos="fade-up" data-aos-duration="1000">
        <p className="text-[28px] md:text-[42px] text-gray-800 font-bold">Data Overview</p>
      </div>
      <div className="flex flex-col md:flex-row h-auto md:h-[60%] w-full">
        <div
          className="flex flex-col text-green-800 border-r-[1px] border-b-[1px] border-t-[1px] p-3 border-green-200 items-center justify-center w-full md:w-1/3 text-[50px] md:text-[80px] font-bold mb-8 md:mb-0"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="text-[50px]">{overviewDetails.totalDelegates}</div>
          <span className="text-[16px] md:text-[20px] font-semibold">Participating Delegates</span>
        </div>
        <div
          className="flex flex-col text-green-800 border-r-[1px] border-b-[1px] border-t-[1px] p-3 border-green-200 items-center justify-center w-full md:w-1/3 text-[50px] md:text-[80px] font-bold mb-8 md:mb-0"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="text-[50px]">{overviewDetails.totalOrganizations}</div>
          <span className="text-[16px] md:text-[20px] font-semibold">Organizations</span>
        </div>
        <div
          className="flex flex-col text-green-800 border-r-[1px] border-b-[1px] border-t-[1px] p-3 border-green-200 items-center justify-center w-full md:w-1/3 text-[50px] md:text-[80px] font-bold"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="text-[50px]">{overviewDetails.bookedSlots}</div>
          <span className="text-[16px] md:text-[20px] font-semibold">Booked Slots</span>
        </div>
      </div>
    </section>
  );
};

export default Data;
