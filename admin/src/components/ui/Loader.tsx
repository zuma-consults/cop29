import React from "react";
import { DotLoader } from "react-spinners";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-co-primary  flex items-center justify-center z-[9999999999999]">
      <DotLoader color="green" size={60} />
    </div>
  );
};

export default Loader;
