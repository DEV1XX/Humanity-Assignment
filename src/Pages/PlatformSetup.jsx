import React, { useState } from "react";
import { 
  CheckCircle, 
  Circle, 
  ChevronDown, 
  Bell, 
  Upload,
  Plus
} from "lucide-react";

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
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="container mx-auto py-6 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left - Steps */}
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

          {/* Right - Current Step Content */}
          <div className="flex-grow bg-white rounded-lg border border-gray-200 p-6">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 1: Business Profile
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
          className="w-full md:w-64 py-2 bg-gradient-to-r from-blue-500  to-blue-600 text-white rounded-md text-sm hover:from-blue-600 hover:to-blue-700 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Step 2: Customer Data
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
          className="w-full md:w-64 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md text-sm hover:from-blue-600 hover:to-blue-700 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Step 3: AI Agent Rules
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

// Step 4: First Campaign
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
                <input type="radio" id="sms" name="actionType" checked />
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

export default PlatformSetup;