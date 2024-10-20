import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useState, useMemo } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { GoArrowRight } from "react-icons/go";
import { useForm, Controller } from "react-hook-form";
import { useContactUs } from "../../hooks/useContactUs";
import Loader from "../ui/Loader";

interface TableRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  messageType: string;
  reasonForMeeting: string;
  preferredDateTime: string;
  isRead: boolean;
  createdAt: string;
}

const ContactUsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(200);
  const [selectedEvent, setSelectedEvent] = useState<TableRow | null>(null);

  const [filters, setFilters] = useState({
    messageType: "contact",
    page,
  });

  const memoizedFilters = useMemo(
    () => ({
      messageType: filters.messageType,
      page: filters?.page,
      perPage: itemsPerPage,
    }),
    [filters.messageType, filters.page, itemsPerPage]
  );

  const { data, isFetching, refetch } = useContactUs(memoizedFilters);

  React.useEffect(() => {
    if (data?.data) {
      setTotalRows(data.data.totalUsers);
      setItemsPerPage(data.data.itemsPerPage);
    }
  }, [data]);

  const [rows, setRows] = useState<TableRow[]>([]);

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

  React.useEffect(() => {
    if (data && data.status) {
      const transformedData = data.data.messages.map((message: any) => ({
        id: message.id,
        name: message.name,
        email: message.email,
        phone: message.phone,
        messageType: message.messageType,
        reasonForMeeting: message.reasonForMeeting,
        preferredDateTime: message.preferredDateTime,
        isRead: message.isRead,
        createdAt: message.createdAt,
      }));
      setRows(transformedData);
    }
  }, [data]);

  const { control, handleSubmit, reset } = useForm<TableRow>({
    defaultValues: selectedEvent || {
      id: "",
      name: "",
      email: "",
      phone: "",
      messageType: "",
      reasonForMeeting: "",
      preferredDateTime: "",
      isRead: false,
      createdAt: "",
    },
  });

  React.useEffect(() => {
    refetch();
  }, [memoizedFilters]);

  const onSubmit = () => {
    setSelectedEvent(null);
    reset();
  };

  React.useEffect(() => {
    if (selectedEvent) {
      reset(selectedEvent); // Reset form with the selected event data
    }
  }, [selectedEvent, reset]);

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
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    // {
    //   name: "Message Type",
    //   selector: (row) => row.messageType,
    //   sortable: true,
    // },
    {
      name: "Subject",
      selector: (row) => row.reasonForMeeting,
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
      {isFetching && <Loader />}
      <div className="rounded-[.5rem] px-2 bg-white shadow">
        <DataTable
          highlightOnHover={true}
          responsive={true}
          customStyles={customStyles}
          columns={columns}
          data={rows}
          fixedHeader
          fixedHeaderScrollHeight="500px"
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="name"
                  control={control}
                  disabled
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  disabled
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  disabled
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
                <Controller
                  name="messageType"
                  control={control}
                  disabled
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Message Type"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
                <Controller
                  name="reasonForMeeting"
                  control={control}
                  disabled
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Reason For Meeting"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                    />
                  )}
                />

                <Box className="flex justify-between mt-4">
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => setSelectedEvent(null)}
                  >
                    Close
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

export default ContactUsTable;
