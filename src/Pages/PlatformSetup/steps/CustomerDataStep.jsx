import React from "react";
import { Upload } from "lucide-react";

const CustomerDataStep = ({ onNext }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Import Customer Data: Sync with Zapier or Upload CSV</h2>

      <div className="mb-6">
        <button className="w-full py-3 border border-blue-500 text-blue-600 rounded-md text-sm hover:bg-blue-50">
          Connect with Zapier
        </button>
      </div>

      <div className="flex items-center justify-center my-6">
        <div className="border-t border-gray-200 flex-grow"></div>
        <div className="px-4 text-gray-500 text-sm">or</div>
        <div className="border-t border-gray-200 flex-grow"></div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Upload size={24} />
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">Drag and drop files here</p>
        <p className="text-sm text-gray-500 mb-4">or</p>
        <button className="px-8 py-2 border border-blue-500 text-blue-600 rounded-md text-sm hover:bg-blue-50">
          Click to Upload CSV File
        </button>
      </div>

      <div className="mt-8">
        <button 
          onClick={onNext}
          className="w-full md:w-64 py-2 bg-gradient-to-r from-[rgba(48,90,255,0.8)] to-[#B5D2FF] text-white rounded-md text-sm hover:from-blue-600 hover:to-blue-700 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerDataStep;