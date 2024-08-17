"use client";
import { Box, Button, Chip, Typography } from "@mui/material";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { GoArrowRight, GoDownload } from "react-icons/go";
import saveAsCSV from "json-to-csv-export";
import { useGetAllEvents } from "../../hooks/useEvent";
import ColumnFilter from "../columnFilter";
import { formatDuration } from "../../utils/helper";
import Loader from "../ui/Loader";
import { Link } from "react-router-dom";

interface TableRow {
  id: number;
  countId: number;
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
      selector: (row) => row.start,
      format: (row) => (
        <Typography variant="body2" color="text.secondary">
          {new Date(row.start).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      name: "Duration",
      selector: (row) => row.start,
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
            <Chip
              label={row.status}
              color="success"
              sx={{
                textTransform: "capitalize",
              }}
            />
          ) : (
            <Chip
              label={row.status}
              color="warning"
              sx={{
                textTransform: "capitalize",
              }}
            />
          )}
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-end cursor-pointer">
          <Link
            to={`/event/${row.countId}`}
            state={{ ...row }}
            className="w-[150px] cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
          >
            <Button
              sx={{
                backgroundColor: "green",
                color: "white",
                width: "100%",
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
              View event
              <GoArrowRight size={19} />
            </Button>
          </Link>
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
          fixedHeaderScrollHeight="600px"
          onChangePage={handlePageChange}
        />
      </div>
    </>
  );
};

export default EventTable;
