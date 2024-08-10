import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { SummaryCard } from "../../components/custom";
import EventTable from "../../components/tabel/EventTable";
import { DelegateSummaryCardData } from "../../utils/datas/summary-card";
import { GroupAdd } from "@mui/icons-material";
import { IoCreateSharp } from "react-icons/io5";

const Event: React.FC = () => {
  return (
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
      <div className="flex flex-col gap-2 px-5 md:px-0  sm:mt-[2.5rem] mt-1">
        <div className="flex align-center md:flex-row flex-col sm:gap-10 w-auto justify-between">
          <span className="text-sm  font-extrabold text-[#2E7D31]">
            All Events
          </span>
          <Button
            sx={{
              backgroundColor: "green",
              color: "white",
              width: "fit-content",
              paddingY: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: "13px",
              gap: "8px",
              "&:hover": {
                backgroundColor: "#e8f5e9",
                color: "black",
              },
            }}
          >
            Create a new event
            <IoCreateSharp size={20} />
          </Button>
        </div>

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
        <EventTable />
      </div>
    </div>
  );
};

export default Event;
