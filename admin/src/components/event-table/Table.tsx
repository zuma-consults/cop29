"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { GoArrowRight } from "react-icons/go";
import { MdCheckCircle, MdPending } from "react-icons/md";

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
    status: "Just added",
    title: "Kaduna Young Entrepreneurship Summit 2024",
    time: "Sat, October 17 • 6:00 PM GMT+1",
    price: "Free",
    category: "Kaduna",
  },
  {
    id: 2,
    imageUrl:
      "https://images.pexels.com/photos/3100960/pexels-photo-3100960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Coming Soon",
    title: "Tech Conference 2024",
    time: "Mon, November 20 • 10:00 AM GMT+1",
    price: "$10",
    category: "Tech",
  },
  {
    id: 3,
    imageUrl:
      "https://images.pexels.com/photos/210682/pexels-photo-210682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "New Event",
    title: "Music Festival 2024",
    time: "Fri, December 5 • 8:00 PM GMT+1",
    price: "$50",
    category: "Music",
  },
  {
    id: 4,
    imageUrl:
      "https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Just added",
    title: "Art Exhibition 2024",
    time: "Sun, October 22 • 2:00 PM GMT+1",
    price: "Free",
    category: "Art",
  },
  {
    id: 6,
    imageUrl:
      "https://images.pexels.com/photos/212286/pexels-photo-212286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "New Event",
    title: "Startup Pitch Competition 2024",
    time: "Tue, November 11 • 3:00 PM GMT+1",
    price: "$15",
    category: "Startup",
  },
  {
    id: 7,
    imageUrl:
      "https://images.pexels.com/photos/1629225/pexels-photo-1629225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Coming Soon",
    title: "Cooking Masterclass 2024",
    time: "Wed, December 12 • 11:00 AM GMT+1",
    price: "$30",
    category: "Cooking",
  },
  {
    id: 8,
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Just added",
    title: "Photography Workshop 2024",
    time: "Thu, January 25 • 9:00 AM GMT+1",
    price: "$25",
    category: "Photography",
  },
  {
    id: 9,
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "New Event",
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
    status: "Just added",
    title: "Web Development Bootcamp 2024",
    time: "Mon, March 1 • 10:00 AM GMT+1",
    price: "$200",
    category: "Web Development",
  },
  {
    id: 11,
    imageUrl:
      "https://images.pexels.com/photos/2933350/pexels-photo-2933350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "Coming Soon",
    title: "AI Innovations Summit 2024",
    time: "Wed, April 10 • 1:00 PM GMT+1",
    price: "$50",
    category: "AI",
  },
  {
    id: 12,
    imageUrl:
      "https://images.pexels.com/photos/3611092/pexels-photo-3611092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    status: "New Event",
    title: "Digital Marketing Workshop 2024",
    time: "Sat, May 15 • 9:00 AM GMT+1",
    price: "$75",
    category: "Digital Marketing",
  },
];

const Table: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<TableRow | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
    rows: {
      style: {
        minHeight: "56px",
        textTransform: "capitalize",
        cursor: "default",
      },
    },
  };

  const columns: TableColumn<TableRow>[] = [
    {
      name: "Banner",
      selector: (row: { imageUrl: any }) => row.imageUrl,
      cell: (row: {
        imageUrl: string | undefined;
        title: string | undefined;
      }) => (
        <img
          src={row.imageUrl}
          alt={row.title}
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
      sortable: true,
    },
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
          <span className="mr-2">{row.status}</span>
          {row.status === "Just added" && <MdCheckCircle color="blue" />}
          {row.status === "Coming Soon" && <MdPending color="orange" />}
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
              paddingY: "12px",
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
            View Details
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
      <div className="flex items-center justify-end px-5 py-2">
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
        customStyles={customStyles}
        columns={columns}
        data={filteredData}
        pagination
        onChangePage={handlePageChange}
      />

      <Modal open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
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
              <CardContent>
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
                <Typography variant="body2" color="text.secondary">
                  {selectedEvent.status}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Table;