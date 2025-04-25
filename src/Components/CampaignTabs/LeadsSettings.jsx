import React from "react";
import { Clock, Mail, MessageSquare, Eye, Trash, Plus } from "lucide-react";

const LeadsSettings = ({ followUpSteps, setFollowUpSteps }) => {
  // Function to add steps to the follow-up sequence
  const addStep = (type) => {
    const newStep = type === "wait" 
      ? { type: "wait", days: 1, enabled: true }
      : { type, wait: 0, enabled: true };
    
    setFollowUpSteps([...followUpSteps, newStep]);
  };

  // Function to remove a step from the follow-up sequence
  const removeStep = (index) => {
    const newSteps = [...followUpSteps];
    newSteps.splice(index, 1);
    setFollowUpSteps(newSteps);
  };

  // Function to toggle step visibility/preview (no actual implementation needed for this demo)
  const previewStep = (index) => {
    alert(`Preview for step ${index + 1} would appear here`);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Follow-Up Strategy*
      </label>
      <div className="bg-blue-50 p-3 sm:p-4 rounded-md">
        {followUpSteps.map((step, index) => (
          <div key={index} className="mb-3 last:mb-0">
            {step.type === "wait" ? (
              <div className="flex items-center bg-white rounded-md p-2 pl-4">
                <Clock size={16} className="text-blue-500 mr-2 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Wait {step.days} days</span>
              </div>
            ) : step.type === "email" ? (
              <div className="flex items-center justify-between bg-white rounded-md p-2 pl-4">
                <div className="flex items-center">
                  <Mail size={16} className="text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Email</span>
                </div>
                <div className="flex items-center">
                  <button 
                    className="p-1 hover:bg-gray-100 rounded-md mr-1"
                    onClick={() => previewStep(index)}
                  >
                    <Eye size={16} className="text-gray-400" />
                  </button>
                  <button 
                    className="p-1 hover:bg-gray-100 rounded-md"
                    onClick={() => removeStep(index)}
                  >
                    <Trash size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-white rounded-md p-2 pl-4">
                <div className="flex items-center">
                  <MessageSquare size={16} className="text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">SMS</span>
                </div>
                <div className="flex items-center">
                  <button 
                    className="p-1 hover:bg-gray-100 rounded-md mr-1"
                    onClick={() => previewStep(index)}
                  >
                    <Eye size={16} className="text-gray-400" />
                  </button>
                  <button 
                    className="p-1 hover:bg-gray-100 rounded-md"
                    onClick={() => removeStep(index)}
                  >
                    <Trash size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Add more steps */}
        <div className="flex justify-center mt-3 space-x-2">
          <button 
            onClick={() => addStep("email")}
            className="bg-white hover:bg-gray-50 px-3 py-1 text-xs rounded-md border border-gray-200 flex items-center"
          >
            <Plus size={12} className="mr-1" />
            Email
          </button>
          <button 
            onClick={() => addStep("sms")}
            className="bg-white hover:bg-gray-50 px-3 py-1 text-xs rounded-md border border-gray-200 flex items-center"
          >
            <Plus size={12} className="mr-1" />
            SMS
          </button>
          <button 
            onClick={() => addStep("wait")}
            className="bg-white hover:bg-gray-50 px-3 py-1 text-xs rounded-md border border-gray-200 flex items-center"
          >
            <Plus size={12} className="mr-1" />
            Wait
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadsSettings;