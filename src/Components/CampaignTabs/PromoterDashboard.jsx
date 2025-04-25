import React, { useState, useEffect } from "react";
import { Eye, AlertTriangle } from "lucide-react";
import NewPromotersTab from "./CampaignTabs/NewPromotersTab";

const PromoterDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("newPromoters");

  // Fetch campaigns from API
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('/campaigns/get-all-campaigns', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        
        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        setError(err.message);
        
        // Fallback to static data if API call fails
        setCampaigns([
          {
            campaign_id: 1,
            campaign_name: "Summer Referral Special",
            campaign_description: "Special summer promotion for new customer acquisition",
            campaign_start_date: "2025-04-01",
            promoter_reward_points: 200
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCampaigns();
  }, []);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading campaigns...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Promoter Campaigns</h1>
      
      {error && (
        <div className="mb-4 flex items-center bg-yellow-50 p-3 rounded-md border border-yellow-200">
          <AlertTriangle size={18} className="text-yellow-500 mr-2" />
          <span className="text-sm text-yellow-700">
            {error}. Using fallback data.
          </span>
        </div>
      )}
      
      {/* Campaign Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button 
          className={`py-2 px-4 sm:px-6 text-sm whitespace-nowrap ${activeTab === "newPromoters" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
          onClick={() => handleTabChange("newPromoters")}
        >
          New Promoters Campaign
        </button>
        <button 
          className={`py-2 px-4 sm:px-6 text-sm whitespace-nowrap ${activeTab === "existing" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
          onClick={() => handleTabChange("existing")}
        >
          Existing Campaigns
        </button>
      </div>
      
      {/* Tab Content */}
      {activeTab === "newPromoters" ? (
        <NewPromotersTab />
      ) : (
        <div className="border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Existing Campaigns</h2>
          
          {campaigns.length === 0 ? (
            <p className="text-gray-500">No existing campaigns found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns.map(campaign => (
                <div key={campaign.campaign_id} className="border rounded-md p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{campaign.campaign_name}</h3>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Eye size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {campaign.campaign_description}
                  </p>
                  <div className="text-xs text-gray-500 mb-2">
                    Start date: {campaign.campaign_start_date}
                  </div>
                  <div className="text-xs text-blue-600">
                    Reward: {campaign.promoter_reward_points} points
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PromoterDashboard;