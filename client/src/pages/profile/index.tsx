import React from "react";
import DataTable from "react-data-table-component";
import { useGetProfile } from "../../components/custom-hooks/useAuth";
import Loader from "../../components/ui/Loader";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  title: string;
  date: string;
  start: string;
  end: string;
  externalLink: string;
  price: string;
  description: string;
  location: string;
  tags: string[];
}

// Define your columns
const columns = [
  {
    name: "Title",
    selector: (row: Event) => row.title,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row: Event) => new Date(row.date).toLocaleDateString(),
    sortable: true,
  },
  {
    name: "Start Time",
    selector: (row: Event) => new Date(row.start).toLocaleTimeString(),
    sortable: true,
  },
  {
    name: "End Time",
    selector: (row: Event) => new Date(row.end).toLocaleTimeString(),
    sortable: true,
  },
  {
    name: "Price",
    selector: (row: Event) => row.price,
    sortable: true,
  },
];

const data: Event[] = [
  {
    id: 1,
    title: "Social Climate Kaduna",
    date: "2024-08-12",
    start: "2024-08-12T10:00:00.000Z",
    end: "2024-08-12T10:45:00.000Z",
    externalLink: "https://zoom.com",
    price: "Free",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
    location: "Kaduna",
    tags: ["climate", "dark", "gun"],
  },
];

const ExpandedComponent: React.FC<{ data: Event }> = ({ data }) => (
  <div className="p-4 bg-gray-100">
    <p>
      <strong>Description:</strong> {data.description}
    </p>
    <p>
      <strong>Location:</strong> {data.location}
    </p>
    <p>
      <strong>Tags:</strong> {data.tags.join(", ")}
    </p>
    <p>
      <strong>External Link:</strong>{" "}
      <a
        href={data.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600"
      >
        {data.externalLink}
      </a>
    </p>
  </div>
);

const Profile: React.FC = () => {
  const { data: user, isLoading } = useGetProfile();
  console.log(user, 'user')

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="pb-[5%] md:pb-[2%] flex items-center justify-center flex-col gap-10 px-5 md:px-20 relative">
      {!user ? (
        <div className="text-center py-[50px] border-2 border-orange-600 w-full my-20 bg-orange-100">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            You need to log in to view your activities.
          </h1>
          <p className="text-gray-600 mb-6">
            Please log in or register to access your profile and view events.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="bg-co-primary text-white py-2 px-4 rounded hover:bg-green-800 transition"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
              Register
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              backgroundImage: `url("/images/globe.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="rounded-lg w-[100%] md:w-full flex justify-center items-center md:items-start py-20 mt-10 relative"
          >
            <div className="absolute inset-0 bg-co-primary opacity-50 rounded-lg"></div>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold opacity-90">
              Welcome {user?.data?.name}!
            </h1>
          </div>

          <div className="w-full flex items-start justify-between bg-green-50 shadow rounded-lg p-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 capitalize">
                {user?.data?.name}
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                {user?.data?.email}
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                {user?.data?.phone}
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                {user?.data?.userType}
              </p>
            </div>
            {/* Uncomment if you want to add a logout button */}
            {/* <button
              className="bg-green-800 text-white p-4 rounded hover:bg-green-700"
              onClick={handleLogout}
            >
              Logout
            </button> */}
          </div>

          {/* Activities Section */}
          <div className="w-full bg-gray-100 rounded-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              Events
            </h2>
            <DataTable
              columns={columns}
              data={data}
              expandableRows
              expandableRowsComponent={ExpandedComponent}
              pagination
              highlightOnHover
              pointerOnHover
              responsive
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
