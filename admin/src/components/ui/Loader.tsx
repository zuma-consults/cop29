import React from "react";
import { DotLoader } from "react-spinners";

const Loader: React.FC = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", zIndex: 9999 }}
    >
      <DotLoader color="green" size={40} />
    </div>
  );
};

export default Loader;
