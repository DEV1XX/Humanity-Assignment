import React from "react";
import { ChevronDown } from "lucide-react";

const BusinessProfileStep = ({ onNext }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Build Your Business Identity</h2>
      <p className="text-sm text-gray-600 mb-6">
        Help us tailor the referral experience by adding key details about your business
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Business Logo</label>
          <button className="px-4 py-2 border border-gray-300 rounded text-sm">
            Choose Image
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Business Description</label>
          <textarea
            placeholder="Enter business description..."
            className="w-full border border-gray-300 rounded p-2 text-sm"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Business Name</label>
            <input
              type="text"
              placeholder="Enter business name"
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Business Email</label>
            <input
              type="email"
              placeholder="e.g., robert.fox@myemail.com"
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Business Phone No.</label>
            <input
              type="text"
              placeholder="Enter phone no..."
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Industry</label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded p-2 text-sm appearance-none">
                <option>Select</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Services</label>
            <input
              type="text"
              placeholder="Enter services..."
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Products</label>
            <input
              type="text"
              placeholder="Enter products..."
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Size <span className="text-gray-400">(Optional)</span>
            </label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded p-2 text-sm appearance-none">
                <option>Select</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded p-2 text-sm appearance-none">
                <option>Select</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded p-2 text-sm appearance-none">
                <option>Select</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Zip Code</label>
            <input
              type="text"
              placeholder="Enter zip code"
              className="w-full border border-gray-300 rounded p-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button 
          onClick={onNext}
          className="w-full md:w-64 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md text-sm hover:from-blue-600 hover:to-blue-700 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BusinessProfileStep;