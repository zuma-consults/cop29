import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { GoArrowRight, GoDownload } from "react-icons/go";
import saveAsCSV from "json-to-csv-export";
import { useOrganisation } from "../../hooks/useOrganisation";
import Loader from "../ui/Loader";
import ColumnFilter from "../columnFilter";

interface TableRow {
  id: number;
  name: string;
  phone: string;
  email: string;
  category: string;
  state: string;
  status: string;
  userType: string;
  organizationType: string;
  image: string;
}

const OrganisationTable: React.FC = () => {
  const [_, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<TableRow | null>(null);

  const [filters, setFilters] = useState({
    userType: "organization",
  });

  const memoizedFilters = useMemo(
    () => ({
      userType: filters.userType,
    }),
    [filters.userType]
  );

  const { data, isFetching, refetch } = useOrganisation(memoizedFilters);

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  }, []);

  const handleResetFilter = useCallback((key: string) => {
    setFilters((prevFilters: any) => {
      const { [key]: removedFilter, ...rest } = prevFilters;
      return rest;
    });
  }, []);

  const extratedData = useMemo(() => data?.data, [data]);

  const handleDownloadCSV = useCallback(() => {
    saveAsCSV({
      data: extratedData?.users,
      filename: "Organisation/Members List",
    });
  }, [extratedData?.events]);

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  const handleAccept = useCallback(() => {
    console.log("Accepted");
    setSelectedEvent(null);
  }, []);

  const handleReject = useCallback(() => {
    console.log("Rejected");
    setSelectedEvent(null);
  }, []);

  useEffect(() => {
    refetch();
  }, [memoizedFilters]);

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
      name: "Phone",
      selector: (row: { phone: any }) => row.phone ?? "N/A",
    },
    {
      name: (
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography className="capitalize">Type</Typography>
          <ColumnFilter
            columnKey="userType"
            onFilterChange={handleFilterChange}
            onResetFilter={handleResetFilter}
          />
        </Box>
      ),
      selector: (row: { userType: any }) => row.userType ?? "N/A",
    },
    {
      name: "Organization Type",
      selector: (row: { organizationType: any }) =>
        row.organizationType ?? "N/A",
    },

    {
      name: "Status",
      selector: (row: { status: any }) => row.status ?? "N/A",
      cell: (row: {
        status:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | Iterable<React.ReactNode>
          | null
          | undefined;
      }) => (
        <div className="text-left capitalize flex items-center">
          {row.status == "approved" ? (
            <Chip label={row?.status} color="success" />
          ) : (
            <Chip label={row?.status} color="warning" />
          )}
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row: React.SetStateAction<TableRow | null>) => (
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
      {isFetching && <Loader />}
      <div className="rounded-[.5rem] px-2 bg-white shadow">
        <div className="flex items-center md:flex-row flex-col justify-start py-2">
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
          data={extratedData?.users}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="600px"
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
              maxHeight: "90vh",
              overflowY: "auto",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              outline: "none",
              borderRadius: "8px",
            }}
          >
            {selectedEvent && (
              <Card>
                {/* Render the Organization Logo */}
                <div className="flex justify-center items-center">
                  <CardMedia
                    component="img"
                    height="200" // You can adjust this value as needed
                    image={selectedEvent.image}
                    alt={`${selectedEvent.name} Logo`}
                    sx={{
                      objectFit: "contain",
                      marginBottom: "16px",
                      // Optional: Set a maximum width to prevent stretching
                      maxWidth: "20%",
                    }}
                  />
                </div>

                <CardContent className="flex flex-col justify-center items-center gap-5">
                  {/* Render Name */}
                  <Typography variant="body1" component="div">
                    <strong>Name: </strong> {selectedEvent.name}
                  </Typography>

                  {/* Render Email */}
                  <Typography variant="body1" component="div">
                    <strong>Email: </strong> {selectedEvent.email}
                  </Typography>

                  {/* Render Phone */}
                  <Typography variant="body1" component="div">
                    <strong>Phone: </strong> {selectedEvent.phone}
                  </Typography>

                  {/* Render State */}
                  <Typography
                    variant="body1"
                    component="div"
                    className="capitalize"
                  >
                    <strong>State: </strong> {selectedEvent.state}
                  </Typography>

                  {/* Render Category */}
                  <Typography variant="body1" component="div">
                    <strong>Category: </strong> {selectedEvent.category}
                  </Typography>

                  {/* Render Organization Type */}
                  <Typography variant="body1" component="div">
                    <strong>Organization Type: </strong>{" "}
                    {selectedEvent.organizationType}
                  </Typography>

                  {/* Render Status */}
                  <Typography variant="body1" component="div">
                    <strong>Status: </strong>
                    {selectedEvent.status === "approved" ? (
                      <Chip
                        label={selectedEvent.status}
                        color="success"
                        className="capitalize"
                      />
                    ) : (
                      <Chip label={selectedEvent.status} color="error" />
                    )}
                  </Typography>

                  {/* Action Buttons for Pending Status */}
                  {selectedEvent.status === "Pending" && (
                    <Box className="flex justify-between gap-5 mt-4">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleAccept}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleReject}
                      >
                        Reject
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default OrganisationTable;
