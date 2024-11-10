import React from "react";
import PavilionTable from "../../components/tabel/PavilionTable";

const Event: React.FC = () => {
  return (
    <>
      <div className="w-[100%] h-[100%] relative overflow-x-hidden">
        <div className="flex flex-col gap-2 px-5 md:px-0  sm:mt-[2.5rem] mt-1">
          <div className="flex align-center md:flex-row flex-col sm:gap-10 w-auto justify-between">
            <span className="text-sm  font-extrabold text-[#2E7D31]">
              Pavilion
            </span>
          </div>

          <div>
            <div className="w-[103px] h-[8px] bg-[#2E7D31]"></div>
            <hr
              style={{
                height: "1px",
                backgroundColor: "#2E7D31",
                border: "none",
              }}
            />
          </div>
        </div>
        <div>
          <PavilionTable />
        </div>
      </div>
    </>
  );
};

export default Event;
