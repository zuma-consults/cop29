import React from "react";
import { DotLoader } from "react-spinners";

function Loader() {
  return (
    <div className="fixed inset-0 bg-co-primary  flex items-center justify-center z-50">
      <DotLoader color="green" size={60} />
    </div>
  );
}

export default Loader;
