/* eslint-disable react/prop-types */
import React from "react";

function ConfirmationModal({ 
  isVisible, 
  onClose, 
  onConfirm, 
  onCancel, 
  title, 
  message 
}) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {title || "Confirm Action"}
        </h3>
        <p className="text-gray-700 mb-6">
          {message || "Are you sure you want to proceed?"}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel || onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700"
          >
            Discard Changes
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700"
          >
            Submit Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
