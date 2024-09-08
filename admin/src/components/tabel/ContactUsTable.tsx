import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useState, ChangeEvent, useMemo } from "react";
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
  const [selectedEvent, setSelectedEvent] = useState<TableRow | null>(null);
  const [filters, setFilters] = useState({
    messageType: "contact",
  });

  const memoizedFilters = useMemo(
    () => ({
      userType: filters.messageType,
    }),
    [filters.messageType, page]
  );

  const { data, isFetching, refetch } = useContactUs(memoizedFilters);
  const [rows, setRows] = useState<TableRow[]>([]);

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

  const onSubmit = (data: TableRow) => {
    console.log("User details updated:", data);
    // Handle form submission here, e.g., update state or make an API call
    setSelectedEvent(null);
    reset(); // Reset form after submission
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
    {
      name: "Message Type",
      selector: (row) => row.messageType,
      sortable: true,
    },
    {
      name: "Reason For Meeting",
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
          pagination
          fixedHeader
          fixedHeaderScrollHeight="500px"
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
