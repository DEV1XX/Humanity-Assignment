import React, { useState } from "react";
import SetupSteps from "./SetupSteps";
import BusinessProfileStep from "./steps/BusinessProfileStep";
import CustomerDataStep from "./steps/CustomerDataStep";
import AIAgentRulesStep from "./steps/AIAgentRulesStep";
import FirstCampaignStep from "./steps/FirstCampaignStep";

const PlatformSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [inProgressStep, setInProgressStep] = useState(currentStep);

  const goToNextStep = () => {
    if (currentStep < 4) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
      setInProgressStep(currentStep + 1);
    }
  };

  const setupSteps = [
    { id: 1, title: "Set Up Business Profile" },
    { id: 2, title: "Sync Your Customer Data" },
    { id: 3, title: "Set Up AI Agent Rules" },
    { id: 4, title: "Set Up First Campaign" },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BusinessProfileStep onNext={goToNextStep} />;
      case 2:
        return <CustomerDataStep onNext={goToNextStep} />;
      case 3:
        return <AIAgentRulesStep onNext={goToNextStep} />;
      case 4:
        return <FirstCampaignStep />;
      default:
        return <BusinessProfileStep onNext={goToNextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="container mx-auto py-6 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left - Steps */}
          <SetupSteps 
            setupSteps={setupSteps} 
            completedSteps={completedSteps} 
            inProgressStep={inProgressStep} 
          />

          {/* Right - Current Step Content */}
          <div className="flex-grow bg-white rounded-lg border border-gray-200 p-6">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSetup;