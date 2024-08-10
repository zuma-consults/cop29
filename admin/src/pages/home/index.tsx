import { Box, Grid } from "@mui/material";
import React from "react";
import { SummaryCard } from "../../components/custom";
import AllEventTable from "../../components/tabel/AllEventTable";
import { HomeSummaryCardData } from "../../utils/datas/summary-card";

const Home: React.FC = () => {
  return (
    <div className="w-[100%] h-[100%] relative overflow-x-hidden">
      <Box sx={{ marginTop: "10px" }}>
        <Grid container spacing={3}>
          {HomeSummaryCardData?.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={6}>
              <SummaryCard
                icon={card.icon}
                title={card.title}
                number={card.number}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <div className="flex flex-col gap-2 px-4 md:px-0  sm:mt-[2.5rem] mt-1">
        <span className="text-sm font-extrabold text-[#2E7D31]">
          All Events
        </span>
        <div className="">
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
        <AllEventTable />
      </div>
    </div>
  );
};

export default Home;
