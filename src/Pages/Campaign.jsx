import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Trash, 
  Eye,
  SidebarOpen,
  Clock,
  Mail,
  MessageSquare,
  X,
  Menu
} from "lucide-react";

const Campaign = () => {
  const [activeTab, setActiveTab] = useState("pastPromoters");
  const [activeSection, setActiveSection] = useState("promoterSettings");
  const [campaignName, setCampaignName] = useState("Summer Referral Special");
  const [rewardValue, setRewardValue] = useState("200 points");
  const [promoterMessage, setPromoterMessage] = useState("Hey! Share this with your friends and get $20 for each successful signup!");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Sequence steps for follow-up strategy
  const [followUpSteps, setFollowUpSteps] = useState([
    { type: "sms", wait: 0, enabled: true },
    { type: "wait", days: 1, enabled: true },
    { type: "email", wait: 0, enabled: true },
    { type: "wait", days: 2, enabled: true },
    { type: "sms", wait: 0, enabled: true },
    { type: "wait", days: 3, enabled: true },
    { type: "sms", wait: 0, enabled: true }
  ]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const renderCampaignListing = () => {
    return (
      <>
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
          <button className="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors">
            <Plus size={16} className="mr-2" />
            <span>Create New Campaign</span>
          </button>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search campaigns..."
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search size={16} className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <button className="flex items-center justify-center border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors w-full sm:w-auto">
              <Filter size={16} className="mr-2" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Campaign List */}
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-4">2 Campaigns • 1 Active</div>

          {/* Campaigns in grid layout that stacks on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campaign 1 */}
            <div className="border border-gray-200 rounded-lg">
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Summer Referral Program</h3>
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-md">Active</span>
                </div>
                <div className="text-gray-500 text-sm mb-4">5/31/2024 - 8/30/2024</div>
                
                <div className="grid grid-cols-3 mb-4">
                  <div className="border-r border-gray-200 pr-2">
                    <div className="text-gray-500 text-xs sm:text-sm mb-1">Referrals</div>
                    <div className="font-semibold text-base sm:text-lg">245</div>
                  </div>
                  <div className="border-r border-gray-200 px-2">
                    <div className="text-gray-500 text-xs sm:text-sm mb-1">Conversion</div>
                    <div className="font-semibold text-base sm:text-lg">32%</div>
                  </div>
                  <div className="pl-2">
                    <div className="text-gray-500 text-xs sm:text-sm mb-1">ROI</div>
                    <div className="font-semibold text-base sm:text-lg">287%</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-md p-3 mb-4 flex">
                  <div className="h-2 w-2 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                  <div className="text-xs sm:text-sm text-gray-700">
                    Increase reward by 10% to boost conversion rates during peak season
                  </div>
                </div>
                
                <div className="flex">
                  <button className="text-gray-400 hover:text-gray-600 mr-4">
                    <Trash size={20} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Campaign 2 */}
            <div className="border border-gray-200 rounded-lg">
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Early Bird Special</h3>
                  <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-md">Inactive</span>
                </div>
                <div className="text-gray-500 text-sm mb-4">8/20/2024 - 9/19/2024</div>
                
                <div className="grid grid-cols-3 mb-4">
                  <div className="border-r border-gray-200 pr-2">
                    <div className="text-gray-500 text-xs sm:text-sm mb-1">Referrals</div>
                    <div className="font-semibold text-base sm:text-lg">300</div>
                  </div>
                  <div className="border-r border-gray-200 px-2">
                    <div className="text-gray-500 text-xs sm:text-sm mb-1">Conversion</div>
                    <div className="font-semibold text-base sm:text-lg">40%</div>
                  </div>
                  <div className="pl-2">
                    <div className="text-gray-500 text-xs sm:text-sm mb-1">ROI</div>
                    <div className="font-semibold text-base sm:text-lg">320%</div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-md p-3 mb-4 flex">
                  <div className="h-2 w-2 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                  <div className="text-xs sm:text-sm text-gray-700">
                    Extend your campaign! Strong engagement suggests higher conversions with more time.
                  </div>
                </div>
                
                <div className="flex">
                  <button className="text-gray-400 hover:text-gray-600 mr-4">
                    <Trash size={20} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sign up Footer */}
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

  const renderCampaignCreation = () => {
    if (activeTab === "newPromoters") {
      return (
        <div className="border border-blue-500 rounded-lg p-4 sm:p-6">
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
            <>
              {/* Campaign Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Reward Type & Value */}
              <div className="flex flex-col sm:flex-row mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-full sm:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reward Type*
                  </label>
                  <div className="bg-blue-50 p-3 rounded-md text-center">
                    <span className="text-blue-600">Points</span>
                    <div className="text-xs text-gray-500 mt-1">($1 is equivalent to 10 points)</div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reward Value*
                  </label>
                  <input
                    type="text"
                    value={rewardValue}
                    onChange={(e) => setRewardValue(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Promoter Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Promoter Message*
                </label>
                <textarea
                  value={promoterMessage}
                  onChange={(e) => setPromoterMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 h-24"
                />
              </div>
            </>
          ) : (
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
                          <button className="p-1 hover:bg-gray-100 rounded-md mr-1">
                            <Eye size={16} className="text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-md">
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
                          <button className="p-1 hover:bg-gray-100 rounded-md mr-1">
                            <Eye size={16} className="text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded-md">
                            <Trash size={16} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
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
                    Every successful referral earns you 200 points
                  </div>
                  <button className="bg-blue-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md text-sm">
                    Start Promoting & Earning
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button className="bg-blue-600 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-md text-sm">
                Edit
              </button>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "newLeads") {
      return (
        <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg font-medium mb-4">Leads Settings</h2>
          
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
                        <button className="p-1 hover:bg-gray-100 rounded-md mr-1">
                          <Eye size={16} className="text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-md">
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
                        <button className="p-1 hover:bg-gray-100 rounded-md mr-1">
                          <Eye size={16} className="text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-md">
                          <Trash size={16} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

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
              <span className="text-xs sm:text-sm font-medium">Kevin Stanton</span>
              <span className="text-xs text-gray-500 ml-1 hidden sm:inline">Product Manager</span>
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

      {activeTab === "pastPromoters" ? renderCampaignListing() : renderCampaignCreation()}
    </div>
  );
};

export default Campaign;