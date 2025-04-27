import React from "react";
import { CheckCircle, Circle } from "lucide-react";

const SetupSteps = ({ setupSteps, completedSteps, inProgressStep }) => {
  const renderStepIndicator = (step) => {
    if (completedSteps.includes(step.id)) {
      return (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            {/* Modified tick to match Figma design */}
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <CheckCircle size={20} className="text-white" />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{step.title}</p>
            <p className="text-xs text-emerald-500">Completed</p>
          </div>
        </div>
      );
    } else if (inProgressStep === step.id) {
      return (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <Circle size={12} className="text-white fill-white" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{step.title}</p>
            <p className="text-xs text-blue-600">In Progress</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
            <Circle size={16} className="text-gray-300" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{step.title}</p>
            <p className="text-xs text-gray-500">Not Started</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full md:w-96 bg-blue-50 rounded-lg overflow-hidden border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-blue-600">Get Started with ReferralHub</h2>
        <p className="text-sm text-gray-600 mt-1">
          To get started with better referrals & rewards, complete your account setup in a few easy steps.
        </p>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-6">
          {setupSteps.map((step) => (
            <div key={step.id}>{renderStepIndicator(step)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetupSteps;