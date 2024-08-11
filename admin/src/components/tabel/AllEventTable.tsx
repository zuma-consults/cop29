"use client";
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
  title: string;
  time: string;
  price: string;
  category: string;
}

const EventDatas = [
  {
    id: 1,
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Approved",
    title: "Kaduna Young Entrepreneurship Summit 2024",
    time: "Sat, October 17 • 6:00 PM GMT+1",
    price: "Free",
    category: "Kaduna",
  },
  {
    id: 2,
    imageUrl:
      "https://images.pexels.com/photos/3100960/pexels-photo-3100960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Approved",
    title: "Tech Conference 2024",
    time: "Mon, November 20 • 10:00 AM GMT+1",
    price: "$10",
    category: "Tech",
  },
  {
    id: 3,
    imageUrl:
      "https://images.pexels.com/photos/210682/pexels-photo-210682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Pending",
    title: "Music Festival 2024",
    time: "Fri, December 5 • 8:00 PM GMT+1",
    price: "$50",
    category: "Music",
  },
  {
    id: 4,
    imageUrl:
      "https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Approved",
    title: "Art Exhibition 2024",
    time: "Sun, October 22 • 2:00 PM GMT+1",
    price: "Free",
    category: "Art",
  },
  {
    id: 6,
    imageUrl:
      "https://images.pexels.com/photos/212286/pexels-photo-212286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Pending",
    title: "Startup Pitch Competition 2024",
    time: "Tue, November 11 • 3:00 PM GMT+1",
    price: "$15",
    category: "Startup",
  },
  {
    id: 7,
    imageUrl:
      "https://images.pexels.com/photos/1629225/pexels-photo-1629225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Approved",
    title: "Cooking Masterclass 2024",
    time: "Wed, December 12 • 11:00 AM GMT+1",
    price: "$30",
    category: "Cooking",
  },
  {
    id: 8,
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Approved",
    title: "Photography Workshop 2024",
    time: "Thu, January 25 • 9:00 AM GMT+1",
    price: "$25",
    category: "Photography",
  },
  {
    id: 9,
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Pending",
    title: "Business Networking Event 2024",
    time: "Fri, February 14 • 5:00 PM GMT+1",
    price: "Free",
    category: "Business",
  },
  // Additional data
  {
    id: 10,
    imageUrl:
      "https://images.pexels.com/photos/1742720/pexels-photo-1742720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Approved",
    title: "Web Development Bootcamp 2024",
    time: "Mon, March 1 • 10:00 AM GMT+1",
    price: "$200",
    category: "Web Development",
  },
  {
    id: 11,
    imageUrl:
      "https://images.pexels.com/photos/2933350/pexels-photo-2933350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Approved",
    title: "AI Innovations Summit 2024",
    time: "Wed, April 10 • 1:00 PM GMT+1",
    price: "$50",
    category: "AI",
  },
  {
    id: 12,
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Pending",
    title: "Digital Marketing Workshop 2024",
    time: "Sat, May 15 • 9:00 AM GMT+1",
    price: "$75",
    category: "Digital Marketing",
  },
];

const AllEventTable: React.FC = () => {
  const [_, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<TableRow | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDownloadCSV = () => {
    saveAsCSV({ data: filteredData, filename: "COP29 All Events List" });
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = EventDatas.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
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
      name: "Title",
      selector: (row: { title: any }) => row.title,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row: { time: any }) => row.time,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: { price: any }) => row.price,
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
            maxHeight: "90vh",
            overflowY: "auto",
            transform: "translate(-50%, -50%)",
            width: 800,
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
                alt={selectedEvent.title}
              />
              <CardContent className="flex flex-col gap-3">
                <Typography variant="h5" component="div">
                  {selectedEvent.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedEvent.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedEvent.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedEvent.category}
                </Typography>
                <div className="">
                  {selectedEvent.status === "Approved" ? (
                    <Chip label={selectedEvent.status} color="success" />
                  ) : (
                    <Chip label={selectedEvent.status} color="warning" />
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AllEventTable;
