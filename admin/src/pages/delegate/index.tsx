import { Box, Grid } from "@mui/material";
import React from "react";
import { SummaryCard } from "../../components/custom";
import { DelegateSummaryCardData } from "../../utils/datas/summary-card";
import DelegateTable from "../../components/tabel/DelegateTable";

const Delegate: React.FC = () => {
  return (
    <div>
      <div className="w-[100%] h-[100%] relative overflow-x-hidden">
        <Box sx={{ marginTop: "10px" }}>
          <Grid container spacing={3}>
            {DelegateSummaryCardData?.map((card, index) => (
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
            All Delegates
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
          <DelegateTable />
        </div>
      </div>
    </div>
  );
};

export default Delegate;
