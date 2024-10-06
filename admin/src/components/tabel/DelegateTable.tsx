import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { GoArrowRight, GoDownload } from "react-icons/go";
import saveAsCSV from "json-to-csv-export";
import { useGetAllDelegates } from "../../hooks/useDelegate";
import Loader from "../ui/Loader";
import ColumnFilter from "../columnFilter";
import { useGetProfile } from "../../hooks/useAuth";

interface TableRow {
  id: number;
  status: string;
  name: string;
  email: string;
  userType: string;
  phone: string;
}

const DelegateTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [iteamsPerPage, setIteamsPerPage] = useState<number>(50);
  const [selectedEvent, setSelectedEvent] = useState<TableRow | null>(null);

  const [filters, setFilters] = useState({
    userType: "delegate",
    page,
  });

  const memoizedFilters = useMemo(
    () => ({
      userType: filters.userType,
      page: filters?.page,
    }),
    [filters.userType, filters.page, iteamsPerPage]
  );

  const { data, isFetching, refetch } = useGetAllDelegates(memoizedFilters);

  useEffect(() => {
    if (data?.data) {
      setTotalRows(data.data.totalItems);
      setIteamsPerPage(data.data.itemsPerPage);
    }
  }, [data]);

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
    saveAsCSV({ data: extratedData?.users, filename: "Delegates List" });
  }, [extratedData?.events]);

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

  const handleAccept = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  const handleReject = useCallback(() => {
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

      selector: (row: { name: any }) => row?.name ?? "N/A",
    },
    {
      name: "Email",
      selector: (row: { email: any }) => row?.email ?? "N/A",
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
      selector: (row: { userType: any }) => row?.userType ?? "N/A",
    },
    {
      name: "Phone",
      selector: (row: { phone: any }) => row?.phone ?? "N/A",
    },

    {
      name: "Status",
      selector: (row: { status: any }) => row?.status ?? "N/A",
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
        </div>
        <DataTable
          highlightOnHover={true}
          responsive={true}
          customStyles={customStyles}
          columns={columns}
          data={extratedData?.users}
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

        <Modal open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "80%", md: "60%" },
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
              <Card>
                <CardContent className="flex flex-col justify-center items-center gap-3">
                  <Typography variant="h5" component="div">
                    {selectedEvent?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedEvent?.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedEvent?.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedEvent?.userType}
                  </Typography>

                  <div className="mb-4">
                    {selectedEvent?.status == "approved" ? (
                      <Chip label={selectedEvent?.status} color="success" />
                    ) : (
                      <Chip label={selectedEvent?.status} color="error" />
                    )}
                  </div>

                  {selectedEvent.status === "Pending" && (
                    <Box className="flex justify-between">
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

export default DelegateTable;
