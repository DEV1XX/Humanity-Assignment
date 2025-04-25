// components/CampaignTabs/NewLeadsTab.jsx
import React, { useState } from "react";
import LeadsSettings from "./LeadsSettings";

const NewLeadsTab = () => {
  const [followUpSteps, setFollowUpSteps] = useState([
    { type: "sms", wait: 0, enabled: true },
    { type: "wait", days: 1, enabled: true },
    { type: "email", wait: 0, enabled: true },
    { type: "wait", days: 2, enabled: true },
    { type: "sms", wait: 0, enabled: true },
    { type: "wait", days: 3, enabled: true },
    { type: "sms", wait: 0, enabled: true }
  ]);

  return (
    <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
      <h2 className="text-lg font-medium mb-4">Leads Settings</h2>
      <LeadsSettings followUpSteps={followUpSteps} />
    </div>
  );
};

export default NewLeadsTab;