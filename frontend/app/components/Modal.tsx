import { X } from "lucide-react";
import { useEffect, useState } from "react";
interface props {
  showModal: boolean;
  onClose: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  title: string;
  submitText: string;
  submitting:boolean,
  children: React.ReactNode;
}
const Modal = ({
  submitting,
  showModal,
  onClose,
  title,
  onSubmit,
  submitText,
  children,
}: props) => {


  useEffect(() => {
    if (showModal) {
      // Disable background scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      // Re-enable scroll when modal unmounts
      document.body.style.overflow = "";
    };
  }, [showModal]);

  if (!showModal) return null;


  return (
    <div
      onClick={onClose}
      className="fixed flex justify-center items-center overflow-hidden inset-0 w-full h-full bg-slate-100/70 z-10"
    >
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-[95%] max-w-[700px] border bg-white border-gray-200 sm:p-10 p-5 space-y-6 max-h-[90vh] overflow-y-auto  shadow-lg rounded-lg"
      >
        <div className="relative">
          <fieldset className="text-center text-xl font-semibold capitalize">
            {title}
          </fieldset>
          <button
            onClick={onClose}
            className="bg-gray-200 cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full"
          >
            <X className="text-gray-600" />
          </button>
        </div>
        <div className="h-[1px] w-full bg-gray-300 shadow-sm"></div>
        <div className="w-full space-y-6">{children}</div>

        <div className="w-full flex justify-end items-center gap-2">
          <button
            onClick={onClose}
            className="w-fit capitalize font-medium text-lg px-5 bg-white text-blue-600 h-10 hover:bg-slate-100 focsu:bg-slate-200 transition-colors  rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={submitting}
            type="submit"
            className="w-fit capitalize font-medium px-14 text-lg bg-blue-600 text-white h-10 hover:bg-blue-700 focsu:bg-blue-800 transition-colors shadow-sm rounded-md cursor-pointer"
          >
           {submitting ? "Processing..." : submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
