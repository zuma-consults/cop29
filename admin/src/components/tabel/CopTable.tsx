import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import DataTable, { TableColumn } from "react-data-table-component";
import { GoArrowRight, GoDownload } from "react-icons/go";
import saveAsCSV from "json-to-csv-export";
import Loader from "../ui/Loader";
import { useGetAllCopApplicants } from "../../hooks/useEvent";
import ColumnFilter from "../columnFilter";

interface TableRow {
  _id: string;
  name: string;
  email: string;
  passport: string;
  delegatedBy: string;
  copApproved: boolean;
}

const CopTable: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TableRow | null>(null);

  const [_, setPage] = useState(1);

  const [filters, setFilters] = useState({
    copApproved: false,
  });

  const memoizedFilters = useMemo(() => filters, [filters]);

  const { data, isFetching, refetch } = useGetAllCopApplicants(memoizedFilters);

  const handleFilterChange = useCallback(
    (key: string, value: string | boolean) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key]: value,
      }));
    },
    []
  );

  const handleResetFilter = useCallback((key: string) => {
    setFilters((prevFilters: any) => {
      const { [key]: removedFilter, ...rest } = prevFilters;
      return rest;
    });
  }, []);

  const handleDownloadCSV = () => {
    saveAsCSV({ data, filename: "COP 29 List" });
  };

  const handlePageChange = (page: number) => {
    setPage(page);
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

  useEffect(() => {
    refetch();
  }, [memoizedFilters, refetch]);

  const columns: TableColumn<TableRow>[] = [
    {
      name: "Name",
      selector: (row) => row.name ?? "N/A",
    },
    {
      name: "Email",
      selector: (row) => row.email ?? "N/A",
    },
    {
      name: "Delegated By",
      selector: (row) => row.delegatedBy ?? "N/A",
    },
    {
      name: (
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography className="capitalize">COP Approved</Typography>
          <ColumnFilter
            columnKey="search"
            onFilterChange={handleFilterChange}
            onResetFilter={handleResetFilter}
          />
        </Box>
      ),
      cell: (row) =>
        row.copApproved ? (
          <Chip label="Approved" color="success" className="capitalize" />
        ) : (
          <Chip label="Pending" color="error" />
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
          data={data?.data}
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
                    height="200"
                    image={selectedEvent.passport}
                    alt={`${selectedEvent.name} Logo`}
                    sx={{
                      objectFit: "contain",
                      marginBottom: "16px",
                      maxWidth: "20%",
                    }}
                    loading="lazy"
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

                  {/* Render Organization Type */}
                  <Typography variant="body1" component="div">
                    <strong>Type: </strong> {selectedEvent.delegatedBy}
                  </Typography>

                  {/* Render Status */}
                  <Typography variant="body1" component="div">
                    <strong>Status: </strong>
                    {selectedEvent.copApproved ? (
                      <Chip
                        label="Approved"
                        color="success"
                        className="capitalize"
                      />
                    ) : (
                      <Chip label="Pending" color="error" />
                    )}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CopTable;
