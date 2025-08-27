import React, { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

const Toast = ({ message, isVisible, onClose, type = "success" }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-[60] transform transition-all duration-300 ease-in-out">
      <div
        className={`
        flex items-center gap-3 p-4 rounded-lg shadow-lg backdrop-blur-md
        ${
          type === "success"
            ? "bg-green-600/90 text-white"
            : "bg-red-600/90 text-white"
        }
      `}
      >
        <CheckCircle size={20} />
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-70">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

const useToast = () => {
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  return {
    toast,
    showToast,
    hideToast,
    ToastComponent: () => (
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
        type={toast.type}
      />
    ),
  };
};

export default useToast;
