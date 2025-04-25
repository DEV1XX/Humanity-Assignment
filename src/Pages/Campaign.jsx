import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import PastPromotersTab from "../Components/CampaignTabs/PastPromotersTab";
import NewPromotersTab from "../Components/CampaignTabs/NewPromotersTab";
import NewLeadsTab from "../Components/CampaignTabs/NewLeadsTab";

const Campaign = () => {
  const [activeTab, setActiveTab] = useState("pastPromoters");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  
  // Fetch user data and campaigns when component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    setUserData(user);
    fetchCampaigns();
  }, []);

  // Function to fetch all campaigns from API
  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem('access_token') || localStorage.getItem('accessToken') || 
                    sessionStorage.getItem('accessToken');
                    
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://34.10.166.233/campaigns/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching campaigns: ${response.status}`);
      }

      const data = await response.json();
      setCampaigns(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "pastPromoters":
        return <PastPromotersTab campaigns={campaigns} loading={loading} error={error} refreshCampaigns={fetchCampaigns} />;
      case "newPromoters":
        return <NewPromotersTab />;
      case "newLeads":
        return <NewLeadsTab />;
      default:
        return null;
    }
  };

  // Get user name from stored user data
  const userName = userData?.name || "Kevin Stanton";
  const userRole = userData?.role || "Product Manager";

  return (
    <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Create & Manage Referral Campaigns</h1>
        {activeTab !== "pastPromoters" && (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
            <span className="text-xs sm:text-sm text-gray-500 mr-2 sm:mr-4">Draft</span>
            <img 
              src="/api/placeholder/32/32" 
              alt="User avatar" 
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2"
            />
            <div>
              <span className="text-xs sm:text-sm font-medium">{userName}</span>
              <span className="text-xs text-gray-500 ml-1 hidden sm:inline">{userRole}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Tabs - Desktop */}
      <div className="hidden sm:block p-3 bg-white rounded-md">
        <div className="flex mb-6 bg-blue-100 p-1 w-fit rounded-md">
          <button 
            className={`py-2 px-6 rounded-l-md ml-1 text-sm ${activeTab === "pastPromoters" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"}`}
            onClick={() => handleTabChange("pastPromoters")}
          >
            Past Promoters
          </button>
          <button 
            className={`py-2 px-6 text-sm ${activeTab === "newPromoters" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"}`}
            onClick={() => handleTabChange("newPromoters")}
          >
            New Promoters
          </button>
          <button 
            className={`py-2 px-6 rounded-r-md mr-1 text-sm ${activeTab === "newLeads" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"}`}
            onClick={() => handleTabChange("newLeads")}
          >
            New Leads
          </button>
        </div>
      </div>

      {/* Main Tabs - Mobile */}
      <div className="sm:hidden p-3 bg-white rounded-md mb-4">
        <div className="flex justify-between items-center">
          <div className="font-medium text-sm">
            {activeTab === "pastPromoters" ? "Past Promoters" : activeTab === "newPromoters" ? "New Promoters" : "New Leads"}
          </div>
          <button 
            className="bg-gray-100 p-2 rounded-md"
            onClick={toggleMobileMenu}
          >
            <Menu size={18} />
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="absolute bg-white shadow-lg rounded-md mt-2 p-2 z-10 right-4 left-4">
            <button 
              className={`block w-full text-left py-2 px-3 rounded-md text-sm mb-1 ${activeTab === "pastPromoters" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
              onClick={() => handleTabChange("pastPromoters")}
            >
              Past Promoters
            </button>
            <button 
              className={`block w-full text-left py-2 px-3 rounded-md text-sm mb-1 ${activeTab === "newPromoters" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
              onClick={() => handleTabChange("newPromoters")}
            >
              New Promoters
            </button>
            <button 
              className={`block w-full text-left py-2 px-3 rounded-md text-sm ${activeTab === "newLeads" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
              onClick={() => handleTabChange("newLeads")}
            >
              New Leads
            </button>
          </div>
        )}
      </div>

      {renderActiveTab()}
    </div>
  );
};

export default Campaign;