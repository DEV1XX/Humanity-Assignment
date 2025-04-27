import React from "react";
import { ChevronDown, Plus } from "lucide-react";

const FirstCampaignStep = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create New Campaign</h2>
      <p className="text-sm text-gray-600 mb-6">
        Create a new referral campaign in just few steps.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Campaign Name</label>
          <input
            type="text"
            placeholder="e.g., Summer Referral Special"
            className="w-full border border-gray-300 rounded p-2 text-sm"
          />
        </div>

        <div>
          <h3 className="text-md font-medium mb-4">Promoter Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Reward Type* <span className="text-gray-400"></span>
              </label>
              <div className="bg-blue-50 text-center py-2 px-4 rounded">
                <span className="text-blue-600 text-sm">Points</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">($1 is equivalent to 10 points)</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Reward Value* <span className="text-gray-400"></span>
              </label>
              <input
                type="text"
                placeholder="e.g., 200 points"
                className="w-full border border-gray-300 rounded p-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Promoter Message*</label>
            <textarea
              placeholder="e.g., 'Hey! Share this with your friends and get $20 for each successful signup!'"
              className="w-full border border-gray-300 rounded p-2 text-sm"
              rows={3}
            />
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-md font-medium mb-3">Follow-Up Strategy*</h3>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center border border-gray-300">
                <div className="w-4 h-4 rounded-full bg-blue-600"></div>
              </div>
              <span className="text-sm">SMS</span>
            </div>
            
            <div className="bg-white px-4 py-1 rounded">
              <span className="text-sm text-gray-800">Wait: 3 days</span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Action Type</label>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <input type="radio" id="email" name="actionType" />
                <label htmlFor="email" className="text-sm">Email</label>
              </div>
              <div className="flex items-center gap-1">
                <input type="radio" id="sms" name="actionType" defaultChecked />
                <label htmlFor="sms" className="text-sm">SMS</label>
              </div>
              <div className="flex items-center gap-1">
                <input type="radio" id="wait" name="actionType" />
                <label htmlFor="wait" className="text-sm">Wait Duration</label>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded p-2 text-sm appearance-none">
                <option>Select</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Follow-Up Message</label>
            <textarea
              placeholder="Enter message..."
              className="w-full border border-gray-300 rounded p-2 text-sm"
              rows={2}
            />
          </div>
          
          <button className="flex items-center gap-1 bg-blue-500 text-white rounded px-4 py-1 text-sm">
            <Plus size={16} />
            <span>Add Action</span>
          </button>
        </div>
      </div>

      <div className="mt-8">
        <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md text-sm hover:from-blue-600 hover:to-blue-700 transition duration-200">
          Launch
        </button>
      </div>
    </div>
  );
};

export default FirstCampaignStep;