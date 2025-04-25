import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Trash, Eye, SidebarOpen } from "lucide-react";

const PastPromotersTab = ({ campaigns = null, loading = false, error = null, refreshCampaigns }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [isUsingStaticData, setIsUsingStaticData] = useState(false);
  
  const staticCampaigns = [
    {
      campaign_id: "static-1",
      campaign_name: "Summer Referral Program",
      campaign_start_date: "2024-05-31",
      campaign_end_date: "2024-08-30",
      campaign_status: "active",
      referrals_count: 245,
      conversion_rate: "32%",
      roi: "287%",
      campaign_description: "Increase reward by 10% to boost conversion rates during peak season"
    },
    {
      campaign_id: "static-2",
      campaign_name: "Early Bird Special",
      campaign_start_date: "2024-08-20",
      campaign_end_date: "2024-09-19",
      campaign_status: "inactive",
      referrals_count: 300,
      conversion_rate: "40%",
      roi: "320%",
      campaign_description: "Extend your campaign! Strong engagement suggests higher conversions with more time."
    }
  ];

  useEffect(() => {
    if (loading) return;
    
    let dataToUse;
    
    if (error || !campaigns || campaigns.length === 0) {
      dataToUse = staticCampaigns;
      setIsUsingStaticData(true);
    } else {
      dataToUse = campaigns;
      setIsUsingStaticData(false);
    }
    
    const filtered = dataToUse.filter(campaign => 
      campaign.campaign_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCampaigns(filtered);
    
    const active = dataToUse.filter(campaign => {
      const endDate = campaign.campaign_end_date ? new Date(campaign.campaign_end_date) : null;
      const today = new Date();
      return endDate ? today <= endDate : true;
    });
    setActiveCampaigns(active);
  }, [campaigns, loading, error, searchTerm]);
  
  const handleCreateCampaign = () => {
    console.log("Create new campaign");
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilter = () => {
    console.log("Filter campaigns");
  };
  
  const handleDelete = (campaignId) => {
    console.log("Delete campaign", campaignId);
  };
  
  const handleViewCampaign = (campaignId) => {
    console.log("View campaign", campaignId);
  };

  if (loading) {
    return <div className="text-center py-8">Loading campaigns...</div>;
  }

  return (
    <>
      {isUsingStaticData && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md mb-4">
          Error loading API data. Showing static data for preview purposes.
        </div>
      )}
      
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        <button 
          className="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={handleCreateCampaign}
        >
          <Plus size={16} className="mr-2" />
          <span>Create New Campaign</span>
        </button>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search campaigns..."
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search size={16} className="absolute right-3 top-2.5 text-gray-400" />
          </div>
          <button 
            className="flex items-center justify-center border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors w-full sm:w-auto"
            onClick={handleFilter}
          >
            <Filter size={16} className="mr-2" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-4">
          {filteredCampaigns.length} Campaigns • {activeCampaigns.length} Active
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            No campaigns found. Create a new campaign to get started.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCampaigns.map(campaign => {
            const startDate = new Date(campaign.campaign_start_date);
            const endDate = campaign.campaign_end_date ? new Date(campaign.campaign_end_date) : null;
            const today = new Date();
            const isActive = endDate ? today <= endDate : true;
            
            const startDateFormatted = startDate.toLocaleDateString();
            const endDateFormatted = endDate ? endDate.toLocaleDateString() : "Ongoing";
            
            return (
              <div key={campaign.campaign_id} className="border border-gray-200 rounded-lg">
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{campaign.campaign_name}</h3>
                    <span className={`${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'} text-xs px-2 py-1 rounded-md`}>
                      {isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="text-gray-500 text-sm mb-4">
                    {startDateFormatted} - {endDateFormatted}
                  </div>
                  
                  <div className="grid grid-cols-3 mb-4">
                    <div className="border-r border-gray-200 pr-2">
                      <div className="text-gray-500 text-xs sm:text-sm mb-1">Referrals</div>
                      <div className="font-semibold text-base sm:text-lg">
                        {campaign.referrals_count || 0}
                      </div>
                    </div>
                    <div className="border-r border-gray-200 px-2">
                      <div className="text-gray-500 text-xs sm:text-sm mb-1">Conversion</div>
                      <div className="font-semibold text-base sm:text-lg">
                        {campaign.conversion_rate || "0%"}
                      </div>
                    </div>
                    <div className="pl-2">
                      <div className="text-gray-500 text-xs sm:text-sm mb-1">ROI</div>
                      <div className="font-semibold text-base sm:text-lg">
                        {campaign.roi || "0%"}
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-md p-3 mb-4 flex">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                    <div className="text-xs sm:text-sm text-gray-700">
                      {campaign.campaign_description || "No description available."}
                    </div>
                  </div>
                  
                  <div className="flex">
                    <button 
                      className="text-gray-400 hover:text-gray-600 mr-4"
                      onClick={() => handleDelete(campaign.campaign_id)}
                    >
                      <Trash size={20} />
                    </button>
                    <button 
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleViewCampaign(campaign.campaign_id)}
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-600 text-white p-3 rounded-md flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <div className="text-center sm:text-left">Sign up to comment, edit, inspect and more.</div>
        <div className="flex space-x-2">
          <button className="bg-white text-blue-600 px-3 py-1 rounded-md font-medium">Sign up</button>
          <button className="bg-white text-gray-700 px-3 py-1 rounded-md font-medium flex items-center">
            <SidebarOpen size={16} className="mr-1" />
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default PastPromotersTab;