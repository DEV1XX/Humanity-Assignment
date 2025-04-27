import React from "react";
import { ChevronDown } from "lucide-react";

const AIAgentRulesStep = ({ onNext }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Set Up AI Agent Rules</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Tone of Communication</label>
          <div className="relative">
            <select className="w-full border border-gray-300 rounded p-2 text-sm appearance-none">
              <option>Select</option>
              <option>Professional</option>
              <option>Friendly</option>
              <option>Casual</option>
              <option>Formal</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Response Style</label>
          <div className="relative">
            <select className="w-full border border-gray-300 rounded p-2 text-sm appearance-none">
              <option>Select</option>
              <option>Concise</option>
              <option>Detailed</option>
              <option>Conversational</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Auto-offer help</p>
            <p className="text-xs text-gray-500">AI pops up suggestions automatically when user lands on a page.</p>
          </div>
          <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
            <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">User-initiated only</p>
            <p className="text-xs text-gray-500">AI only responds when clicked or messaged.</p>
          </div>
          <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
            <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
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

export default AIAgentRulesStep;