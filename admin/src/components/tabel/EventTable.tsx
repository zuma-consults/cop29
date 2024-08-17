"use client";
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
import React, { useState, useEffect, useCallback, useMemo } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { GoArrowRight, GoDownload } from "react-icons/go";
import saveAsCSV from "json-to-csv-export";
import { useGetAllEvents } from "../../hooks/useEvent";
import ColumnFilter from "../columnFilter";
import { formatDate, formatDuration } from "../../utils/helper";
import Loader from "../ui/Loader";

interface TableRow {
  id: number;
  image: string;
  status: string;
  title: string;
  date: any;
  tags: string;
  invoice?: string;
  description: string;
  start: string;
  end: string;
}

const EventTable: React.FC = () => {
  const [_, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<TableRow | null>(null);

  console.log("xxxx", selectedEvent);

  const [filters, setFilters] = useState({
    search: "",
    tags: "",
  });

  const memoizedFilters = useMemo(
    () => ({
      search: filters.search,
      tag: filters.tags,
    }),
    [filters.search, filters.tags]
  );

  const { data, isFetching, refetch } = useGetAllEvents(memoizedFilters);

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
    saveAsCSV({ data: extratedData?.events, filename: "COP29 Events List" });
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
      name: (
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography className="capitalize">Title</Typography>
          <ColumnFilter
            columnKey="search"
            onFilterChange={handleFilterChange}
            onResetFilter={handleResetFilter}
          />
        </Box>
      ),
      selector: (row) => row.title ?? "N/A",
    },
    {
      name: "Date",
      selector: (row) => row.start, // Assuming `start` contains the date
      format: (row) => (
        <Typography variant="body2" color="text.secondary">
          {new Date(row.start).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      name: "Duration",
      selector: (row) => row.start, // Need `start` to calculate duration
      format: (row) => (
        <Typography variant="body2" color="text.secondary">
          {formatDuration(row.start, row.end)}
        </Typography>
      ),
    },
    {
      name: "Tags",
      selector: (row) =>
        Array.isArray(row.tags) ? row.tags.join(", ") : "N/A",
    },
    {
      name: "Status",
      selector: (row) => row.status ?? "N/A",
      cell: (row) => (
        <div className="text-left capitalize flex items-center">
          {row.status === "approved" ? (
            <Chip label={row.status} color="success" />
          ) : (
            <Chip label={row.status} color="warning" />
          )}
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-end cursor-pointer">
          <Button
            sx={{
              backgroundColor: "green",
              color: "white",
              width: "150px",
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
            View event
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
          data={extratedData?.events}
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
            {selectedEvent && (
              <Card>
                <CardMedia
                  component="img"
                  sx={{
                    width: "800px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                  image={selectedEvent?.image}
                  alt={selectedEvent?.title}
                />
                <CardContent className="flex flex-col gap-3">
                  <Typography
                    variant="h5"
                    component="div"
                    className="capitalize"
                  >
                    <strong>Title: </strong>
                    {selectedEvent.title}
                  </Typography>
                  <Typography component="span" className="capitalize">
                    <strong>Description: </strong>
                    {selectedEvent.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Date: </strong>
                    {new Date(selectedEvent?.start).toLocaleDateString()}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <strong>Duration: </strong>
                    {formatDuration(selectedEvent?.start, selectedEvent?.end)}
                  </Typography>
                  <div className="mb-4">
                    <strong>Status: </strong>

                    <Chip
                      className="capitalize"
                      label={selectedEvent.status}
                      color={
                        selectedEvent.status == "approved" ? "success" : "error"
                      }
                    />
                  </div>

                  {selectedEvent?.status === "processing" && (
                    <Box className="flex flex-col gap-2">
                      {selectedEvent.invoice ? (
                        <>
                          <Typography variant="h6" className="capitalize">
                            Invoice
                          </Typography>
                          <CardMedia
                            title="Invoice"
                            component="img"
                            height="150"
                            image={selectedEvent.invoice}
                            alt="Invoice"
                          />
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            /* Function to generate invoice */
                          }}
                        >
                          Click to Generate Invoice
                        </Button>
                      )}
                      <Box className="flex justify-between mt-4">
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

export default EventTable;
