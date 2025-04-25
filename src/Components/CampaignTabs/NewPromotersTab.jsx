import React, { useState, useEffect } from "react";
import { Plus, Eye } from "lucide-react";
import PromoterSettings from "./PromoterSettings";
import LeadsSettings from "./LeadsSettings";

const NewPromotersTab = () => {
  const [activeSection, setActiveSection] = useState("promoterSettings");
  const [campaign, setCampaign] = useState({
    campaign_name: "Summer Referral Special",
    campaign_description: "",
    campaign_start_date: new Date().toISOString().split('T')[0],
    promoter_reward_points: 200,
    lead_reward_discount: "0"
  });
  const [promoterMessage, setPromoterMessage] = useState("Hey! Share this with your friends and get $20 for each successful signup!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Follow-up strategy steps for the campaign
  const [followUpSteps, setFollowUpSteps] = useState([
    { type: "sms", wait: 0, enabled: true },
    { type: "wait", days: 1, enabled: true },
    { type: "email", wait: 0, enabled: true },
    { type: "wait", days: 2, enabled: true },
    { type: "sms", wait: 0, enabled: true },
    { type: "wait", days: 3, enabled: true },
    { type: "sms", wait: 0, enabled: true }
  ]);

  // Create campaign function
  const createCampaign = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/campaigns/create-campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(campaign)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create campaign');
      }
      
      const result = await response.json();
      
      // Create follow-up strategy for the campaign
      if (result && result.campaign_id) {
        const formattedStrategies = followUpSteps.map((step, index) => {
          if (step.type === "wait") {
            return null; // Skip wait steps as they're just visual indicators
          }
          
          return {
            day_offset: step.type === "wait" ? step.days : 0,
            communication_method: step.type,
            target_type: "lead",
            step_order: index
          };
        }).filter(Boolean); // Remove nulls

        await createFollowUpStrategy(result.campaign_id, formattedStrategies);
      }
      
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  // Create follow-up strategy function
  const createFollowUpStrategy = async (campaignId, strategies) => {
    try {
      const response = await fetch('/campaigns/create-follow-up-strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          campaign_id: campaignId,
          strategies: strategies
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create follow-up strategy');
      }
      
      return await response.json();
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleCampaignNameChange = (value) => {
    setCampaign({...campaign, campaign_name: value});
  };

  const handleRewardValueChange = (value) => {
    setCampaign({...campaign, promoter_reward_points: parseInt(value) || 0});
  };

  return (
    <div className="border border-blue-500 rounded-lg p-4 sm:p-6">
      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-md">
          {error}
        </div>
      )}
      
      {/* Tabs for Promoter vs Leads Settings */}
      <div className="flex mb-6 overflow-x-auto">
        <button 
          className={`py-2 px-4 sm:px-6 text-xs sm:text-sm rounded-md ${activeSection === "promoterSettings" ? "bg-blue-100 text-blue-600" : "bg-gray-50 text-gray-600"}`}
          onClick={() => handleSectionChange("promoterSettings")}
        >
          Promoter Settings
        </button>
        <button 
          className={`py-2 px-4 sm:px-6 text-xs sm:text-sm rounded-md ml-2 ${activeSection === "leadsSettings" ? "bg-blue-100 text-blue-600" : "bg-gray-50 text-gray-600"}`}
          onClick={() => handleSectionChange("leadsSettings")}
        >
          Leads Settings
        </button>
      </div>

      {activeSection === "promoterSettings" ? (
        <PromoterSettings 
          campaignName={campaign.campaign_name}
          setCampaignName={handleCampaignNameChange}
          rewardValue={campaign.promoter_reward_points.toString()}
          setRewardValue={handleRewardValueChange}
          promoterMessage={promoterMessage}
          setPromoterMessage={setPromoterMessage}
        />
      ) : (
        <LeadsSettings 
          followUpSteps={followUpSteps} 
          setFollowUpSteps={setFollowUpSteps}
        />
      )}

      {/* Landing Page Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Landing Page Preview
        </label>
        <div className="border border-gray-200 rounded-md">
          <div className="flex overflow-x-auto border-b border-gray-200 p-2">
            <button className="text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium whitespace-nowrap">Chat with AI</button>
            <button className="text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium whitespace-nowrap">My Leads</button>
            <button className="text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium whitespace-nowrap">My Rewards</button>
            <div className="flex-1"></div>
            <button className="text-gray-400 mr-1">
              <Plus size={14} />
            </button>
            <button className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-xs text-gray-600">
              ?
            </button>
          </div>
          <div className="p-4 bg-gray-50">
            <div className="text-center p-2 sm:p-4">
              <h2 className="text-base sm:text-lg font-medium mb-1">Welcome back! You're promoting:</h2>
              <h3 className="text-base sm:text-lg font-semibold mb-3">SnackNation Express</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">
                SnackNation delivers hand-picked, chef-curated snacks — from tasty pantry staples to sweet (savory) treats — delivered fresh to your door in under 45 minutes.
              </p>
              <div className="mb-4 text-blue-600 text-sm">
                Every successful referral earns you {campaign.promoter_reward_points} points
              </div>
              <button className="bg-blue-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md text-sm">
                Start Promoting & Earning
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button 
            className="bg-blue-600 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-md text-sm"
            onClick={createCampaign}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Campaign'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPromotersTab;