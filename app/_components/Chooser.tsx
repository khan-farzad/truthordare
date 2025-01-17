'use client';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const Chooser: React.FC<ModalProps> = ({ isOpen, onClose, url }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-4/5 md:w-4/5 h-4/5 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition text-2xl"
        >
          &times;
        </button>
        <iframe
          src={url}
          title="Chooser"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
};

export default Chooser;
