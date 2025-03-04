import React, { useState } from 'react';
import { FaBars, FaDownload, FaFilePdf, FaFileCode, FaSpinner } from 'react-icons/fa';

export const Navbar = ({ toggleSidebar, onDownload }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (format) => {
    setIsDownloading(true);
    try {
      await onDownload(format);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <nav className="bg-gray-800 text-white h-14 fixed w-full top-0 z-50 px-4">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-700 rounded"
            title="Toggle Sidebar"
          >
            <FaBars size={20} />
          </button>
          <span className="ml-4 text-xl font-semibold">LaTeX Editor</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative group">
            <button 
              className={`flex items-center space-x-2 px-4 py-2 ${
                isDownloading ? 'bg-blue-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } rounded`}
              disabled={isDownloading}
            >
              {isDownloading ? <FaSpinner className="animate-spin" /> : <FaDownload />}
              <span>Download</span>
            </button>
            {!isDownloading && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                <div className="py-1">
                  <button
                    onClick={() => handleDownload('tex')}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <FaFileCode />
                    <span>Download as .tex</span>
                  </button>
                  <button
                    onClick={() => handleDownload('pdf')}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <FaFilePdf />
                    <span>Download as PDF</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}; 