import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGetCode, useMarkPresent } from "../../hooks/useEvent";
import Loader from "../../components/ui/Loader";
import { toast } from "react-toastify";

interface UserDetails {
  organization: {
    id: string | null;
    name: string;
    category: string;
    contactName: string;
    phone: string;
  };
  delegates: {
    id: string;
    name: string;
    email: string;
    designation: string;
  }[];
  events: {
    title: string;
    start: string;
    end: string;
    description: string;
  }[];
}

const Reception: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [filters, setFilters] = useState({ code: "" });
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isFetching } = useGetCode(shouldFetch ? filters : undefined);
  const { mutate, isLoading } = useMarkPresent({ setOpen });

  const handleSearch = () => {
    setShouldFetch(true);
  };


  const handleAttendance = async () => {
    if (userDetails && userDetails?.delegates) {
      mutate({ id: userDetails.delegates[0]?.id });
    } else {
      toast.error("User details are missing. Cannot mark attendance.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ code: e.target.value });
    setShouldFetch(false);
  };

  React.useEffect(() => {
    if (data) {
      setUserDetails(data?.data);
      setOpen(true);
      setShouldFetch(false);
    }
  }, [data]);

  return (
    <>
      {isFetching || (isLoading && <Loader />)}
      <div className="w-[100%] h-[100%] relative overflow-x-hidden">
        <div className="flex flex-col gap-2 px-5 md:px-0 sm:mt-[2.5rem] mt-1">
          <div className="flex align-center md:flex-row flex-col sm:gap-10 w-auto justify-between">
            <span className="text-sm font-extrabold text-[#2E7D31]">
              Reception
            </span>
            <div className="flex flex-row gap-5">
              <TextField
                label="Search User by Unique Number"
                variant="outlined"
                value={filters.code}
                onChange={handleInputChange}
                size="small"
              />
              <Button
                onClick={handleSearch}
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  paddingY: "8px",
                  fontSize: "13px",
                  "&:hover": { backgroundColor: "#e8f5e9", color: "black" },
                }}
              >
                Search
              </Button>
            </div>
          </div>
          <div className="w-[103px] h-[8px] bg-[#2E7D31]"></div>
          <hr
            style={{
              height: "1px",
              backgroundColor: "#2E7D31",
              border: "none",
            }}
          />
        </div>
        <div>{/* <EventTable /> */}</div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="user-details-modal"
          aria-describedby="user-details-content"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "80%", md: "60%" },
              my: 10,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              maxHeight: "90vh",
              overflowY: "auto",
              margin: "auto",
              outline: "none",
              borderRadius: "8px",
            }}
          >
            {userDetails ? (
              <>
                <Box className="flex justify-around gap-5 items-center">
                  <Box>
                    <h1 className="text-green-700 font-bold text-[26px] text-center md:text-left">
                      Delegate Information
                    </h1>
                    {userDetails?.delegates?.map((delegate, index) => (
                      <Box key={index} sx={{ marginBottom: 2 }}>
                        <Typography variant="body1">
                          <strong>Name: </strong> {delegate?.name}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Email: </strong> {delegate?.email}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Designation: </strong> {delegate?.designation}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box>
                    <h1 className="text-green-700 font-bold text-[26px] text-center md:text-left">
                      Organization Information
                    </h1>
                    <Typography variant="body1">
                      <strong>Organization: </strong>{" "}
                      {userDetails?.organization?.name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Category: </strong>{" "}
                      {userDetails?.organization?.category}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Contact: </strong>
                      {userDetails.organization?.contactName} (
                      {userDetails.organization?.phone})
                    </Typography>
                  </Box>
                </Box>
                <Button
                  onClick={handleAttendance}
                  sx={{
                    marginTop: 2,
                    backgroundColor: "green",
                    color: "white",
                    "&:hover": { backgroundColor: "#2E7D31" },
                  }}
                  fullWidth
                >
                  Mark Attendance
                </Button>
              </>
            ) : (
              <Typography variant="body1">Loading user details...</Typography>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Reception;
