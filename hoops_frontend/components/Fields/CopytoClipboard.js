import React from "react";
import { toast, ToastContainer } from "react-toastify";

function CopytoClipboard({ value }) {
  const copy = () => {
    navigator.clipboard.writeText(value);
    notify();
  };

  const notify = () =>
    toast.success("Copied to clipboard", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  return (
    <div
      onClick={copy}
      data-tip="Copy to clipboard"
      className="tooltip flex cursor-pointer h-12 items-center bg-gray-100 text-gray-400 rounded mb-2 hover:bg-green-100 hover:text-green-500"
    >
      <div className="rounded flex items-center w-10/12 pl-3 border h-full overflow-scroll scrollbar-hide">
        <span className="whitespace-nowrap">{value}</span>
      </div>
      <div className="w-2/12 px-3  border-l-2 text-center">
        <i className="fa-regular fa-clipboard"></i>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CopytoClipboard;
