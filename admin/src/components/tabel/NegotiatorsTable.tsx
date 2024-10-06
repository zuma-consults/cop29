import { Button, Chip } from "@mui/material";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { GoArrowRight, GoDownload } from "react-icons/go";
import saveAsCSV from "json-to-csv-export";
import {
  useApproveOrganisation,
  useDeclineOrganisation,
  useNegotiators,
} from "../../hooks/useOrganisation";
import Loader from "../ui/Loader";
import { Link } from "react-router-dom";
import { useGetProfile } from "../../hooks/useAuth";

interface TableRow {
  id: number;
  name: string;
  phone: string;
  email: string;
  category: string;
  state: string;
  status: string;
  organizationType: string;
  image: string;
}

const NegotiatorsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [iteamsPerPage, setIteamsPerPage] = useState<number>(50);
  const [selectedNegotiators, setSelectedNegotiators] = useState<any>(null);

  const [filters, setFilters] = useState({
    userType: "organization",
    page,
  });

  const memoizedFilters = useMemo(
    () => ({
      userType: filters?.userType,
      page: filters?.page,
      perPage: iteamsPerPage,
    }),
    [filters.userType, filters.page, iteamsPerPage]
  );

  const { mutate: mutateApproval, isLoading: loadingOrganisation } =
    useApproveOrganisation();
  const { mutate: mutateDecline, isLoading: loadingDecline } =
    useDeclineOrganisation();

  const { data, isFetching, refetch } = useNegotiators(memoizedFilters);

  useEffect(() => {
    if (data?.data) {
      setTotalRows(data.data.totalItems);
      setIteamsPerPage(data.data.itemsPerPage);
    }
  }, [data]);

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  }, []);

  const handleResetFilter = useCallback((key: string) => {
    setFilters((prevFilters: any) => {
      const { [key]: removedFilter, ...rest } = prevFilters;
      return rest;
    });
  }, []);

  const handlePageChange = (page: number) => {
    setPage(page);
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    setIteamsPerPage(newPerPage);
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  };

  const extratedData = useMemo(() => data?.data, [data]);

  const handleDownloadCSV = useCallback(() => {
    saveAsCSV({
      data: extratedData?.users,
      filename: "Organisation/Members List",
    });
  }, [extratedData?.events]);

  const handelActionEvent = async (type: string) => {
    if (type === "approve") {
      mutateApproval(selectedNegotiators?.id);
      setSelectedNegotiators(null);
    } else {
      mutateDecline(selectedNegotiators?.d);
      setSelectedNegotiators(null);
    }
  };

  useEffect(() => {
    refetch();
  }, [memoizedFilters]);

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
      selector: (row: { name: any }) => row?.name ?? "N/A",
    },
    {
      name: "Email",
      selector: (row: { email: any }) => row?.email ?? "N/A",
    },
    {
      name: "Phone",
      selector: (row: { phone: any }) => row?.phone ?? "N/A",
    },
    {
      name: "Organization Type",
      selector: (row: { organizationType: any }) =>
        row.organizationType ?? "N/A",
    },

    {
      name: "Status",
      selector: (row: { status: any }) => row?.status ?? "N/A",
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
          {row.status == "approved" ? (
            <Chip label={row?.status} color="success" />
          ) : (
            <Chip label={row?.status} color="warning" />
          )}
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-end cursor-pointer">
          <Link
            to={`/negotiators/${row?.id}`}
            state={{ ...row }}
            className="w-[150px] cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
          >
            <Button
              sx={{
                backgroundColor: "green",
                color: "white",
                width: "100%",
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
            >
              View Details
              <GoArrowRight size={19} />
            </Button>
          </Link>
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
      {isFetching && <Loader />}
      <div className="rounded-[.5rem] px-2 bg-white shadow">
        <div className="flex items-center md:flex-row flex-col justify-start py-2">
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
        </div>
        <DataTable
          highlightOnHover={true}
          responsive={true}
          customStyles={customStyles}
          columns={columns}
          data={extratedData?.users}
          fixedHeader
          fixedHeaderScrollHeight="600px"
          pagination
          paginationServer
          paginationPerPage={iteamsPerPage}
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
          paginationComponentOptions={{
            noRowsPerPage: true,
          }}
        />
      </div>
    </>
  );
};

export default NegotiatorsTable;
