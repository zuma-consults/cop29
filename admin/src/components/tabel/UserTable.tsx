import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { GoArrowRight, GoDownload } from "react-icons/go";
import saveAsCSV from "json-to-csv-export";
import {
  useAddAmin,
  useGetAllProfile,
  useGetAllRoles,
} from "../../hooks/useAuth";
import Loader from "../ui/Loader";

interface TableRow {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
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
  const { isFetching, data, refetch: refetchAllProfile } = useGetAllProfile();
  const [_, setPage] = useState(1);
  const [, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TableRow | null>(null);

  const reset = () => {
    setSelectedEvent(null);
  };

  const { data: roleData } = useGetAllRoles();
  const { mutate, isLoading } = useAddAmin({
    refetchAllProfile,
    setOpen,
    reset,
  });

  const extratedData = data?.data?.admins;

  const handleDownloadCSV = () => {
    saveAsCSV({ data: extratedData, filename: "Admins/users List" });
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleAccept = () => {
    if (selectedEvent) {
      const userPayload = {
        firstName: selectedEvent.firstName,
        lastName: selectedEvent.lastName,
        email: selectedEvent.email,
        password: selectedEvent.password,
        phone: selectedEvent.phone,
        role: selectedEvent.role.name,
      };
      mutate(userPayload);
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
    cells: {
      style: {
        textTransform: "capitalize" as "capitalize",
      },
    },
  };

  const columns: TableColumn<TableRow>[] = [
    {
      name: "Name",
      selector: (row: { name: any }) => row.name ?? "N/A",
    },

    {
      name: "Email",
      selector: (row: { email: any }) => row.email ?? "N/A",
    },
    {
      name: "Role",
      selector: (row) => row.role.name ?? "N/A",
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
      {isFetching || isLoading ? <Loader /> : null}
      <div className="rounded-[.5rem] px-2 bg-white shadow">
        <div className="flex items-center md:flex-row flex-col justify-between py-2">
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
            <h1 className="text-green-700 font-bold text-[26px] text-center md:text-left">
              User Details
            </h1>
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
                  variant="outlined"
                  value={selectedEvent?.role?.id || ""} // Ensure `value` is the role ID
                  fullWidth
                  margin="normal"
                  onChange={(e) =>
                    setSelectedEvent({
                      ...selectedEvent!,
                      role: {
                        id: e.target.value,
                        name:
                          roleData?.data?.find(
                            (role: any) => role.id === e.target.value
                          )?.name || "",
                      },
                    })
                  }
                >
                  {roleData?.data?.map((role: any) => (
                    <MenuItem key={role?.id} value={role?.id}>
                      {role.name}
                    </MenuItem>
                  ))}
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
