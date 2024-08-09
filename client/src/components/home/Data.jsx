import React from "react";

function Data() {
  return (
    <section className="relative flex flex-col gap-20 pt-10 h-[80vh] w-full bg-cover bg-center">
      <div className="flex justify-center items-center">
        <p className="text-[42px] text-gray-800">Testing Simulation Data</p>
      </div>
      <div className="flex h-[60%]">
        <div className="flex flex-col text-green-800 border-r-[1px] border-b-[1px] border-t-[1px] border-green-200 h-full items-center justify-center w-1/3 text-[80px] font-bold">
          30 +
          <span className="text-[20px] font-semibold">
            Participating Organisations
          </span>
        </div>
        <div className="flex flex-col text-green-800 border-r-[1px] border-b-[1px] border-t-[1px] border-green-200 h-full items-center justify-center w-1/3 text-[80px] font-bold">
          11 +
          <span className="text-[20px] font-semibold">
            National Governments
          </span>
        </div>
        <div className="flex flex-col text-green-800 border-r-[1px] border-b-[1px] border-t-[1px] border-green-200 h-full items-center justify-center w-1/3 text-[80px] font-bold">
          58 +
          <span className="text-[20px] font-semibold">Testing Sessions</span>
        </div>
      </div>
    </section>
  );
}

export default Data;
