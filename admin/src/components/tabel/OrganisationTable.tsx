import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { GoArrowRight, GoDownload } from "react-icons/go";
import saveAsCSV from "json-to-csv-export";

interface TableRow {
  id: number;
  imageUrl: string;
  status: string;
  name: string;
  date: string;
  state: string;
  category: string;
}

const EventDatas = [
  {
    id: 1,
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Approved",
    name: "Kaduna Young Entrepreneurship Summit 2024",
    date: "Sat, October 17 ",
    category: "Tech",
    state: "Kaduna",
  },
  {
    id: 2,
    imageUrl:
      "https://images.pexels.com/photos/3100960/pexels-photo-3100960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Pending",
    name: "Tech Conference 2024",
    date: "Mon, November 20 ",
    category: "Tech",
    state: "Kaduna",
  },
  {
    id: 3,
    imageUrl:
      "https://images.pexels.com/photos/210682/pexels-photo-210682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Pending",
    name: "Music Festival 2024",
    date: "Fri, December 5 ",
    category: "Music",
    state: "Kaduna",
  },
  {
    id: 4,
    imageUrl:
      "https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Approved",
    name: "Tech Conference 2024",
    date: "Mon, November 20 ",
    category: "Tech",
    state: "Kaduna",
  },
];

const OrganisationTable: React.FC = () => {
  const [_, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<TableRow | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDownloadCSV = () => {
    saveAsCSV({
      data: filteredData,
      filename: "COP29 Members/organisation List",
    });
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAccept = () => {
    console.log("Accepted");
    // Handle accept logic here
    setSelectedEvent(null);
  };

  const handleReject = () => {
    console.log("Rejected");
    // Handle reject logic here
    setSelectedEvent(null);
  };

  const filteredData = EventDatas.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      selector: (row: { name: any }) => row.name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: { date: any }) => row.date,
      sortable: true,
    },
    {
      name: "State",
      selector: (row: { state: any }) => row.state,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row: { category: any }) => row.category,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row: { status: any }) => row.status,
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
          {row.status === "Approved" ? (
            <Chip label={row?.status} color="success" />
          ) : (
            <Chip label={row?.status} color="warning" />
          )}
        </div>
      ),
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
        <TextField
          label="Search events by title"
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
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: "none",
            borderRadius: "8px",
          }}
        >
          {selectedEvent && (
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={selectedEvent.imageUrl}
                alt={selectedEvent.name}
              />
              <CardContent className="flex flex-col gap-3">
                <Typography variant="h5" component="div">
                  {selectedEvent.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedEvent.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedEvent.state}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedEvent.category}
                </Typography>

                <div className="mb-4">
                  {selectedEvent.status === "Approved" ? (
                    <Chip label={selectedEvent.status} color="success" />
                  ) : (
                    <Chip label={selectedEvent.status} color="error" />
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
  );
};

export default OrganisationTable;
