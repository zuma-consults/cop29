import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  useGetMySideEvents,
  useGetProfile,
  useLogout,
} from "../../components/custom-hooks/useAuth";
import Loader from "../../components/ui/Loader";
import { Link } from "react-router-dom";
import AddDelegateModal from "./add-delegate-modal";
import { Cookies } from "react-cookie";
import SideEvent from "./sideEvent";
import ProofOfPaymentModal from "./ProofOfPaymentModal";
// import SideEvent from "./sideEvent";

interface Delegate {
  name: string;
  email: string;
  passport: string;
  delegatedBy: string;
  copApproved: string;
  _id: string;
}

interface ISideEvent {
  title: string;
  noOfSpeakers: string;
  preferredSlotId: any;
  pavillionSlotId?: any;
  status: string;
  requirements?: string;
  createdAt: Date;
  id: string;
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
          row.copApproved === "approved"
            ? "bg-green-500"
            : row.copApproved === "rejected"
            ? "bg-red-500"
            : "bg-yellow-500"
        }`}
      >
        {row.copApproved.toUpperCase()}
      </span>
    ),
    sortable: true,
  },
];

const sideEventColumns = [
  {
    name: "Title",
    selector: (row: ISideEvent) => row.title,
    sortable: true,
  },
  {
    name: "Number of Speakers",
    selector: (row: ISideEvent) => row.noOfSpeakers,
    sortable: true,
  },
  {
    name: "Time Slot",
    selector: (row: ISideEvent) => {
      if (!row.pavillionSlotId) {
        return "N/A";
      }

      const formattedDate = new Date(row.pavillionSlotId.date)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(/ /g, "-");

      const timeSpan = row.pavillionSlotId.timeSpan;

      return `${formattedDate} from ${timeSpan}`;
    },
    // sortable: true,
  },
  {
    name: "Requirements",
    selector: (row: ISideEvent) => {
      if (!row.requirements) {
        return "N/A";
      }
      return row.requirements;
    },
    // sortable: true,
  },
  {
    name: "Created",
    selector: (row: ISideEvent) => {      
      return new Date(row.createdAt).toLocaleString("en-GB", {
        year: "numeric",    // '2024'
        month: "short",     // 'Nov'
        day: "numeric",     // '11'
        hour: "2-digit",    // '11'
        minute: "2-digit",  // '00'
        second: "2-digit"   // '00'
      });
    },
    // sortable: true,
  },
  {
    name: "Status",
    cell: (row: ISideEvent) => (
      <span
        className={`inline-block px-3 py-1 text-white rounded-full ${
          row.status === "approved"
            ? "bg-green-500"
            : row.status === "declined"
            ? "bg-red-500"
            : "bg-yellow-500"
        }`}
      >
        {row.status.toUpperCase()}
      </span>
    ),
    // sortable: true,
  },
];

const Profile: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isProofModalOpen, setProofModalOpen] = useState(false);
  const [isSideModalOpen, setSideModalOpen] = useState(false);
  const { data: user, isLoading, refetch } = useGetProfile();
  const accreditationType = localStorage.getItem("accreditationType");
  const allow = localStorage.getItem("allow");
  const cookies = new Cookies();
  const { mutate: logout } = useLogout();

  useEffect(() => {
    if (allow === null) {
      cookies.remove("accessToken");
      cookies.remove("profile");
      localStorage.removeItem("allow");
      localStorage.removeItem("copNotice");
      localStorage.removeItem("userProfile");
      logout();
    }
  }, []);

  const { data: sideEvents, refetch: sideRefetch } = useGetMySideEvents();

  if (isLoading) {
    return <Loader />;
  }

  const organizationData = user?.data;

  return (
    <div className="pb-[5%] md:pb-[2%] flex items-center justify-center flex-col gap-10 px-5 md:px-20 relative">
      {allow !== "profile" ? (
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
                  Create Account as Organization
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
              Welcome {organizationData?.name}!
            </h1>
          </div>
          {organizationData?.userType === "organization" &&
            organizationData?.category !== "Negotiator" && (
              <button
                onClick={() => setSideModalOpen(true)}
                className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              >
                Apply for Side Event
              </button>
            )}
          <div className="w-full flex items-start md:justify-between flex-wrap gap-5 bg-green-50 shadow rounded-lg p-6">
            <div>
              <p className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                Email:{" "}
                <span className="lowercase">{organizationData?.email}</span>
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                Phone: {organizationData?.phone}
              </p>
              {/* <p className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                User Type: {organizationData?.userType}
              </p> */}
              <p className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                Organization Type: {organizationData?.organizationType}
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                State: {organizationData?.state}
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                Category: {organizationData?.category}
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2 capitalize">
                Status:{" "}
                <span
                  className={`inline-block px-3 py-1 text-white rounded-full ${
                    organizationData?.status === "approved"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {organizationData?.status}
                </span>
              </p>
            </div>

            {organizationData?.userType === "organization" &&
              organizationData?.category !== "Negotiator" && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                >
                  Add Delegate(s) / Nominee(s) for your Organization
                </button>
              )}
          </div>
          {organizationData?.category !== "Negotiator" && (
            <div className="w-full bg-gray-100 rounded-lg p-6 mt-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Delegates
              </h2>
              <DataTable
                columns={delegateColumns}
                data={organizationData?.delegates || []}
                highlightOnHover
                pointerOnHover
                responsive
              />
            </div>
          )}

          {organizationData?.category !== "Negotiator" &&
            sideEvents?.length > 0 && (
              <div className="w-full bg-gray-100 rounded-lg p-6 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                    Side Event Details
                  </h2>

                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => {
                      setProofModalOpen(true);
                    }}
                  >
                    Upload Proof of Payment
                  </button>
                </div>

                <DataTable
                  columns={sideEventColumns}
                  data={sideEvents || []}
                  highlightOnHover
                  pointerOnHover
                  responsive
                />
              </div>
            )}
          {/* Custom Modal Component */}
          {/* <AddDelegateModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            refetch={refetch}
            id={user?.data?.id}
          />
          <SideEvent
            isOpen={isSideModalOpen}
            onClose={() => setSideModalOpen(false)}
            refetch={sideRefetch}
            id={user?.data?.id}
          />
          <ProofOfPaymentModal
            isOpen={isProofModalOpen}
            onClose={() => setProofModalOpen(false)}
            refetch={sideRefetch}
          />
        </>
      )}
    </div>
  );
};

export default Profile