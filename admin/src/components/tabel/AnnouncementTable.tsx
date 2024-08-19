import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { GoArrowRight } from "react-icons/go";
import { useForm, Controller } from "react-hook-form";

interface TableRow {
  id: number;
  subject: string;
  message: string;
  sender: string;
}

const EventDatas = [
  {
    id: 1,
    subject: "User",
    message: "lorem ipsum",
    sender: "Muhammad",
  },
  {
    id: 2,
    subject: "Admin",
    message: "lorem ipsum",
    sender: "Chris",
  },
  {
    id: 3,
    subject: "Finance",
    message: "lorem ipsum",
    sender: "Brown",
  },
  {
    id: 4,
    subject: "Super Admin",
    message: "lorem ipsum",
    sender: "James",
  },
  {
    id: 5,
    subject: "COP Desk Officer",
    message: "lorem ipsum",
    sender: "Faith",
  },
];

const AnnouncementTable: React.FC = () => {
  const [_, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<TableRow | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const { control, handleSubmit, reset } = useForm<TableRow>({
    defaultValues: selectedEvent || {
      subject: "",
      message: "",
      sender: "",
    },
  });

  const onSubmit = (data: TableRow) => {
    console.log("User details updated:", data);
    // Handle form submission here, e.g., update state or make an API call
    setSelectedEvent(null);
    reset(); // Reset form after submission
  };

  const filteredData = EventDatas.filter((event) =>
    event.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      name: "subject",
      selector: (row: { subject: any }) => row.subject,
      sortable: true,
    },

    {
      name: "message",
      selector: (row: { message: any }) => row.message,
      sortable: true,
    },
    {
      name: "sender",
      selector: (row: { sender: any }) => row.sender,
      sortable: true,
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
    <div className="rounded-[.5rem] px-2 bg-white shadow">
      <div className="flex items-center md:flex-row flex-col justify-between px-5 py-2">
        <TextField
          label="Search"
          variant="outlined"
          color="success"
          margin="normal"
          hiddenLabel
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <DataTable
        highlightOnHover={true}
        responsive={true}
        customStyles={customStyles}
        columns={columns}
        data={filteredData}
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
                name="subject"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Subject"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Message"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                  />
                )}
              />
              <Controller
                name="sender"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Sender"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
              <Box className="flex justify-between mt-4">
                <Button type="submit" variant="contained" color="success">
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
  );
};

export default AnnouncementTable;
