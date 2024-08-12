import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { GoArrowRight, GoDownload } from "react-icons/go";
import saveAsCSV from "json-to-csv-export";
import { useGetAllProfile } from "../../hooks/useAuth";
import Loader from "../ui/Loader";

interface TableRow {
  id: string;
  role: {
    id: string;
    name: string;
  };
  name: string;
  email: string;
  status: string;
  phone: string;
  createdAt: string;
  suspended: boolean;
}

const UserTable: React.FC = () => {
  const { isFetching, data } = useGetAllProfile();

  const extratedData = data?.data?.admins;
  console.log("extratedData", extratedData);
  const [_, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<TableRow | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDownloadCSV = () => {
    saveAsCSV({ data: extratedData, filename: "Admins/users List" });
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAccept = () => {
    if (selectedEvent) {
      // Example: Update the user data in your state or send an API request
      console.log("User details updated:", selectedEvent);

      // const updatedData = EventDatas.map((event) =>
      //   event.id === selectedEvent.id ? selectedEvent : event
      // );

      setSelectedEvent(null);
    }
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#ffff",
        fontWeight: "bold",
        fontSize: "14px",
      },
    },
  };

  const columns: TableColumn<TableRow>[] = [
    {
      name: "Name",
      selector: (row: { name: any }) => row.name,
      sortable: true,
    },

    {
      name: "Email",
      selector: (row: { email: any }) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role.name,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-end cursor-pointer">
          <Button
            sx={{
              backgroundColor: "green",
              color: "white",
              width: "100px",
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
            onClick={() => setSelectedEvent(row)}
          >
            View
            <GoArrowRight size={19} />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "15rem",
    },
  ];

  return (
    <>
      {isFetching ? (
        <div className="fixed inset-0 bg-co-primary  flex items-center justify-center z-[9999999999999]">
          <Loader />
        </div>
      ) : null}
      <div className="rounded-[.5rem] px-2 bg-white shadow">
        <div className="flex items-center md:flex-row flex-col justify-between px-5 py-2">
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
            onClick={handleDownloadCSV}
          >
            Export to Excel
            <GoDownload size={20} />
          </Button>
          <TextField
            label="Search"
            variant="outlined"
            color="success"
            margin="normal"
            hiddenLabel
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <DataTable
          highlightOnHover={true}
          responsive={true}
          customStyles={customStyles}
          columns={columns}
          data={extratedData}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="500px"
          onChangePage={handlePageChange}
        />

        <Modal open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              bgcolor: "background.paper",
              boxShadow: 24,
              maxHeight: "90vh",
              overflowY: "auto",
              p: 4,
              outline: "none",
              borderRadius: "8px",
            }}
          >
            {selectedEvent && (
              <form>
                <TextField
                  label="Name"
                  value={selectedEvent.name}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={(e) =>
                    setSelectedEvent({ ...selectedEvent, name: e.target.value })
                  }
                />
                <TextField
                  label="Email"
                  value={selectedEvent.email}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent,
                      email: e.target.value,
                    })
                  }
                />
                <TextField
                  select
                  label="Role"
                  value={selectedEvent?.role?.name || ""} // Adjust this if `role` is an object
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent!,
                      role: { ...selectedEvent!.role, name: e.target.value }, // Update `role` object
                    })
                  }
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                  <MenuItem value="COP Desk Officer">COP Desk Officer</MenuItem>
                </TextField>

                <Box className="flex justify-between mt-4">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleAccept}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => setSelectedEvent(null)}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default UserTable;
