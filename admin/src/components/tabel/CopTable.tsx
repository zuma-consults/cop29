import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";
import { GoArrowRight, GoDownload } from "react-icons/go";
import saveAsCSV from "json-to-csv-export";
import Loader from "../ui/Loader";
import {
  useApproveCopEvent,
  useDeclineCopEvent,
  useGetAllCopApplicants,
} from "../../hooks/useEvent";
import { useGetProfile } from "../../hooks/useAuth";

interface TableRow {
  _id: any;
  name: string;
  email: string;
  passport: string;
  delegatedBy: string;
  copApproved: string;
  state: string;
  designation: string;
  department: string;
}

const CopTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(50);
  const [openApproveDialog, setOpenApproveDialog] = React.useState(false);
  const [openDeclineDialog, setOpenDeclineDialog] = React.useState(false);
  // const [status, setStatus] = useState(event.status);
  const handleApproveClick = () => setOpenApproveDialog(true);
  const handleDeclineClick = () => setOpenDeclineDialog(true);
  const handleClose = () => {
    setOpenApproveDialog(false);
    setOpenDeclineDialog(false);
  };

  const [selectedCop, setSelectedCop] = useState<TableRow | null>(null);
  const [filters, setFilters] = useState({
    copApproved: "",
    page,
  });

  const memoizedFilters = useMemo(
    () => ({
      page: filters?.page,
      perPage: itemsPerPage,
      copApproved: filters?.copApproved,
    }),
    [filters.copApproved, filters.page]
  );

  const { data, refetch, isFetching } = useGetAllCopApplicants(memoizedFilters);

  useEffect(() => {
    if (data?.data) {
      setTotalRows(data.data.totalUsers);
      setItemsPerPage(data.data.itemsPerPage);
    }
  }, [data]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  };

  useEffect(() => {
    refetch();
  }, [memoizedFilters]);

  const { mutate: mutateApproval, isLoading: loadingApproval } =
    useApproveCopEvent();

  const { mutate: mutateDecline, isLoading: loadingDecline } =
    useDeclineCopEvent();

  const handelActionCop = async (type: string) => {
    if (type === "approved") {
      mutateApproval(selectedCop?._id);
    } else {
      mutateDecline(selectedCop?._id);
    }
  };

  const handleDownloadCSV = useCallback(() => {
    saveAsCSV({
      data: data?.data ?? [],
      filename: "COP 29 List",
    });
  }, [data]);

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
      selector: (row) => row?.name ?? "N/A",
    },
    {
      name: "Email",
      selector: (row) => row?.email ?? "N/A",
    },
    {
      name: "Organization",
      selector: (row) => row?.delegatedBy ?? "N/A",
    },

    {
      name: (
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography>Status</Typography>
        </Box>
      ),
      cell: (row) => {
        // Check if copApproved is a string and compare its value
        return row?.copApproved === "approved" ? (
          <Chip label="Approved" color="success" className="capitalize" />
        ) : row?.copApproved === "pending" ? (
          <Chip label="Pending" color="warning" />
        ) : (
          <Chip label="Rejected" color="error" />
        );
      },
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
            onClick={() => setSelectedCop(row)}
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
      {(isFetching || loadingApproval || loadingDecline) && <Loader />}

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
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            <Select
              color="success"
              value={filters.copApproved}
              onChange={(e) =>
                handleFilterChange("copApproved", e.target.value)
              }
              displayEmpty
              inputProps={{ "aria-label": "Filter by COP Approved" }}
              style={{ minWidth: "120px" }}
            >
              <MenuItem color="success" value="">
                All
              </MenuItem>
              <MenuItem color="success" value="approved">
                Approved List
              </MenuItem>
              <MenuItem color="success" value="pending">
                Pending List
              </MenuItem>
              <MenuItem color="success" value="rejected">
                Rejected List
              </MenuItem>
            </Select>
          </Box>
        </div>
        <DataTable
          highlightOnHover={true}
          responsive={true}
          customStyles={customStyles}
          columns={columns}
          data={data?.data ?? []}
          fixedHeader
          fixedHeaderScrollHeight="600px"
          pagination
          paginationServer
          paginationPerPage={itemsPerPage}
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
          paginationComponentOptions={{
            noRowsPerPage: true,
          }}
        />

        <Modal open={!!selectedCop} onClose={() => setSelectedCop(null)}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "80%", md: "60%" },
              maxHeight: "90vh",
              overflowY: "auto",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              outline: "none",
              borderRadius: "8px",
            }}
          >
            {selectedCop && (
              <Card>
                {/* Render the Organization Logo */}
                <div className="flex justify-center items-center">
                  <CardMedia
                    component="img"
                    height="200"
                    image={selectedCop?.passport}
                    alt={`${selectedCop?.name} Logo`}
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
                    <strong>Name: </strong> {selectedCop?.name}
                  </Typography>

                  {/* Render Email */}
                  <Typography variant="body1" component="div">
                    <strong>Email: </strong> {selectedCop?.email}
                  </Typography>

                  {/* Render Organization Type */}
                  <Typography variant="body1" component="div">
                    <strong>Organization: </strong> {selectedCop?.delegatedBy}
                  </Typography>

                  {/* Render Designation */}
                  <Typography variant="body1" component="div">
                    <strong>Designation: </strong> {selectedCop?.designation}
                  </Typography>

                  {/* Render department if available */}
                  {selectedCop?.department && (
                    <Typography variant="body1" component="div">
                      <strong>Department: </strong> {selectedCop.department}
                    </Typography>
                  )}

                  {/* Render state if available */}
                  {selectedCop?.state && (
                    <Typography variant="body1" component="div">
                      <strong>State: </strong> {selectedCop.state}
                    </Typography>
                  )}

                  {/* Render Status */}
                  <Typography variant="body1" component="div">
                    <strong>Status: </strong>
                    {selectedCop?.copApproved === "approved" ? (
                      <Chip
                        label="Approved"
                        color="success"
                        className="capitalize"
                      />
                    ) : (
                      <Chip label="Pending" color="warning" />
                    )}
                  </Typography>
                  {selectedCop?.copApproved == "pending" && (
                    <div className="flex items-center justify-end gap-10">
                      <Button
                        variant="contained"
                        color="success"
                        className="absolute bottom-0 right-0"
                        onClick={handleApproveClick}
                        disabled={loadingApproval}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        className="absolute bottom-0 right-0"
                        onClick={handleDeclineClick}
                        disabled={loadingDecline}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </Box>
        </Modal>
      </div>
      <Dialog open={openApproveDialog} onClose={handleClose}>
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve this Delegate
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handelActionCop("approved");
            }}
            color="success"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeclineDialog} onClose={handleClose}>
        <DialogTitle>Confirm reject</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reject this Delegate
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handelActionCop("rejected");
            }}
            color="error"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CopTable;
