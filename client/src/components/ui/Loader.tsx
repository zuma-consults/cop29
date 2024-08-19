import React from "react";
import { DotLoader } from "react-spinners";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-co-primary opacity-80 flex items-center justify-center z-100">
      <DotLoader color="green" size={60} />
    </div>
  );
};

export default Loader;
