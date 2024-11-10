import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { GoArrowRight, GoDownload } from "react-icons/go";
import saveAsCSV from "json-to-csv-export";
import { useGetAllSideEvents } from "../../hooks/useEvent";
import ColumnFilter from "../columnFilter";
import { formatTime } from "../../utils/helper";
import Loader from "../ui/Loader";
import { Link } from "react-router-dom";
import { useGetProfile } from "../../hooks/useAuth";

interface TableRow {
  id: number;
  countId: number;
  image: string;
  status: string;
  title: string;
  date: any;
  organizer: string;
  invoice?: string;
  description: string;
  start: string;
  end: string;
  proofOfPayment: any;
}

const EventTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [iteamsPerPage, setIteamsPerPage] = useState<number>(200);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    tags: "",
    page,
  });

  const memoizedFilters = useMemo(
    () => ({
      search: filters?.search,
      tag: filters?.tags,
      page: filters?.page,
      perPage: iteamsPerPage,
    }),
    [filters.search, filters.tags, filters.page, iteamsPerPage]
  );

  const { data, isFetching, refetch } = useGetAllSideEvents(memoizedFilters);

  useEffect(() => {
    if (data?.data) {
      setTotalRows(data.data.totalItems);
      setIteamsPerPage(data.data.itemsPerPage);
    }
  }, [data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data?.data?.events || [];
    return data?.data?.events.filter(
      (event: TableRow) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

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

  const handlePageChange = (page: number) => {
    setPage(page);
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    setIteamsPerPage(newPerPage);
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  };

  const handleDownloadCSV = useCallback(() => {
    saveAsCSV({ data: filteredData, filename: "COP29 Events List" });
  }, [filteredData]);

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
          <Typography className="capitalize">Organization</Typography>
        </Box>
      ),
      selector: (row) => row?.organizer ?? "N/A",
    },
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
      selector: (row) => row?.title ?? "N/A",
    },
    {
      name: "Date",
      selector: (row) => row?.start,
      format: (row) => (
        <Typography variant="body2" color="text.secondary">
          {new Date(row?.start).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      name: "Duration",
      selector: (row) => row?.start,
      format: (row) => (
        <Typography variant="body2" color="text.secondary">
          {formatTime(row?.start)} - {formatTime(row?.end)}
        </Typography>
      ),
    },
    {
      name: "Paid",
      selector: (row) => row?.proofOfPayment ?? "N/A",
      cell: (row) => (
        <div className="text-left capitalize flex items-center">
          {row?.proofOfPayment && row.proofOfPayment.length > 0 ? (
            <Chip
              label="Yes"
              color="success"
              sx={{
                textTransform: "capitalize",
              }}
            />
          ) : (
            <Chip
              label="No"
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
      name: "Status",
      selector: (row) => row?.status ?? "N/A",
      cell: (row) => {
        return row?.status === "approved" ? (
          <Chip label="approved" color="success" className="capitalize" />
        ) : row?.status === "pending" ? (
          <Chip label="pending" color="warning" />
        ) : (
          <Chip label="declined" color="error" />
        );
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-end cursor-pointer">
          <Link
            to={`/pavilion/${row?.countId}`}
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
              View Details
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

  const { data: userData } = useGetProfile();
  const userProfile = useMemo(() => userData?.data, [userData]);
  const hasExportModule = useMemo(
    () => userProfile?.role?.modules?.includes("export"),
    [userProfile]
  );

  return (
    <>
      {isFetching && <Loader />}
      <div className="rounded-[.5rem] px-2 bg-white shadow">
        <div className="flex items-center md:flex-row flex-col justify-between py-2">
          {hasExportModule && (
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
          )}
          <div className="my-4">
            <TextField
              label="Search by title or organizer"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <DataTable
          highlightOnHover={true}
          responsive={true}
          customStyles={customStyles}
          columns={columns}
          data={filteredData}
          fixedHeader
          fixedHeaderScrollHeight="600px"
          pagination
          paginationServer
          paginationPerPage={iteamsPerPage}
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
          paginationComponentOptions={{
            noRowsPerPage: true,
          }}
        />
      </div>
    </>
  );
};

export default EventTable;
