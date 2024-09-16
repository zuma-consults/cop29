import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useGetProfile } from "../../components/custom-hooks/useAuth";
import Loader from "../../components/ui/Loader";
import { Link } from "react-router-dom";
import AddDelegateModal from "./add-delegate-modal";

interface Delegate {
  name: string;
  email: string;
  passport: string;
  delegatedBy: string;
  copApproved: boolean;
  _id: string;
}

const delegateColumns = [
  {
    name: "Name",
    selector: (row: Delegate) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: Delegate) => row.email,
    sortable: true,
  },
  {
    name: "Delegated By",
    selector: (row: Delegate) => row.delegatedBy,
    sortable: true,
  },
  {
    name: "COP Status",
    cell: (row: Delegate) => (
      <span
        className={`inline-block px-3 py-1 text-white rounded-full ${
          row.copApproved ? "bg-green-500" : "bg-yellow-500"
        }`}
      >
        {row.copApproved ? "Approved" : "Pending"}
      </span>
    ),
    sortable: true,
  },
];

const Profile: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: user, isLoading, refetch } = useGetProfile();

  const accreditationType = localStorage.getItem("accreditationType");

  if (isLoading) {
    return <Loader />;
  }

  const organizationData = user?.data;

  return (
    <div className="pb-[5%] md:pb-[2%] flex items-center justify-center flex-col gap-10 px-5 md:px-20 relative">
      {!organizationData ? (
        <div className="flex items-center w-full justify-center text-center p-[50px] border-2 border-orange-600 my-20 bg-orange-100 mx-10 h-[50vh]">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              You need to create an account to request for accreditation
            </h1>
            <p className="text-gray-600 mb-6">
              Please log in or create account.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link
                to="/login"
                className="bg-co-primary text-white py-2 px-4 rounded hover:bg-green-800 transition"
              >
                Log In
              </Link>
              {accreditationType === "delegates" ? (
                <Link
                  to="/signup"
                  className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                >
                  Create Account as Organisation
                </Link>
              ) : (
                <Link
                  to="/negotiator"
                  className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                >
                  Create Account as Negotiator
                </Link>
              )}
            </div>
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
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold opacity-90 capitalize">
              Welcome {organizationData.name}!
            </h1>
          </div>

          <div className="w-full flex items-start justify-between bg-green-50 shadow rounded-lg p-6">
            <div>
              {/* <h2 className="text-xl md:text-2xl font-bold text-gray-800 capitalize">
              Email: {organizationData.email}
              </h2> */}
              <p className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                Email:{" "}
                <span className="lowercase">{organizationData.email}</span>
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                Phone: {organizationData.phone}
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                User Type: {organizationData.userType}
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                Organization Type: {organizationData.organizationType}
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                State: {organizationData.state}
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                Category: {organizationData.category}
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                Status:{" "}
                <span
                  className={`inline-block px-3 py-1 text-white rounded-full ${
                    organizationData.status === "approved"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {organizationData.status}
                </span>
              </p>
            </div>
            {/* <img
              src={organizationData.image}
              alt="Organization"
              className="w-32 h-32 object-cover rounded-full shadow-lg"
            /> */}
            {organizationData.userType === "organization" && (
              <button
                onClick={() => setModalOpen(true)}
                className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              >
                Add Delegate(s) / Nominee(s) for your Organization
              </button>
            )}
          </div>

          <div className="w-full bg-gray-100 rounded-lg p-6 mt-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              Delegates
            </h2>
            <DataTable
              columns={delegateColumns}
              data={organizationData.delegates || []}
              pagination
              highlightOnHover
              pointerOnHover
              responsive
            />
          </div>

          {/* Custom Modal Component */}
          <AddDelegateModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            refetch={refetch}
            id={user?.data?.id}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
