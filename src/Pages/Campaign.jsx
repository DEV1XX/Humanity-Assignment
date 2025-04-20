import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Trash, 
  Eye,
  SidebarOpen 
} from "lucide-react";

const Campaign = () => {
  const [activeTab, setActiveTab] = useState("pastPromoters");
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Create & Manage Referral Campaigns</h1>
      </div>

      {/* Tabs */}
      <div className="p-3 bg-white rounded-md">
      <div className="flex mb-6">
        <div className="rounded-md overflow-hidden flex mr-4">
          <button 
            className={`py-2 px-6 text-sm ${activeTab === "pastPromoters" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"}`}
            onClick={() => setActiveTab("pastPromoters")}
          >
            Past Promoters
          </button>
          <button 
            className={`py-2 px-6 text-sm  ${activeTab === "newPromoters" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"}`}
            onClick={() => setActiveTab("newPromoters")}
          >
            New Promoters
          </button>
          <button 
            className={`py-2 px-6 text-sm  ${activeTab === "newLeads" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"}`}
            onClick={() => setActiveTab("newLeads")}
          >
            New Leads
          </button>
        </div>
      </div>
      </div>
     

      {/* Action Bar */}
      <div className="flex justify-between mb-6">
        <button className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors">
          <Plus size={16} className="mr-2" />
          <span>Create New Campaign</span>
        </button>
        <div className="flex items-center">
          <div className="relative mr-2">
            <input
              type="text"
              placeholder="Search campaigns..."
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search size={16} className="absolute right-3 top-2.5 text-gray-400" />
          </div>
          <button className="flex items-center border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
            <Filter size={16} className="mr-2" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Campaign List */}
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-4">2 Campaigns • 1 Active</div>

        {/* Campaigns in a single line */}
        <div className="flex space-x-4">
          {/* Campaign 1 */}
          <div className="border border-gray-200 rounded-lg flex-1">
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Summer Referral Program</h3>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-md">Active</span>
              </div>
              <div className="text-gray-500 text-sm mb-4">5/31/2024 - 8/30/2024</div>
              
              <div className="flex mb-4">
                <div className="flex-1 border-r border-gray-200 pr-4">
                  <div className="text-gray-500 text-sm mb-1">Referrals</div>
                  <div className="font-semibold text-lg">245</div>
                </div>
                <div className="flex-1 border-r border-gray-200 px-4">
                  <div className="text-gray-500 text-sm mb-1">Conversion</div>
                  <div className="font-semibold text-lg">32%</div>
                </div>
                <div className="flex-1 pl-4">
                  <div className="text-gray-500 text-sm mb-1">ROI</div>
                  <div className="font-semibold text-lg">287%</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-md p-3 mb-4 flex">
                <div className="h-2 w-2 bg-blue-600 rounded-full mt-1.5 mr-2"></div>
                <div className="text-sm text-gray-700">
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
          <div className="border border-gray-200 rounded-lg flex-1">
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Early Bird Special</h3>
                <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-md">Inactive</span>
              </div>
              <div className="text-gray-500 text-sm mb-4">8/20/2024 - 9/19/2024</div>
              
              <div className="flex mb-4">
                <div className="flex-1 border-r border-gray-200 pr-4">
                  <div className="text-gray-500 text-sm mb-1">Referrals</div>
                  <div className="font-semibold text-lg">300</div>
                </div>
                <div className="flex-1 border-r border-gray-200 px-4">
                  <div className="text-gray-500 text-sm mb-1">Conversion</div>
                  <div className="font-semibold text-lg">40%</div>
                </div>
                <div className="flex-1 pl-4">
                  <div className="text-gray-500 text-sm mb-1">ROI</div>
                  <div className="font-semibold text-lg">320%</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-md p-3 mb-4 flex">
                <div className="h-2 w-2 bg-blue-600 rounded-full mt-1.5 mr-2"></div>
                <div className="text-sm text-gray-700">
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
      <div className="bg-blue-600 text-white p-3 rounded-md flex justify-between items-center">
        <div>Sign up to comment, edit, inspect and more.</div>
        <div className="flex space-x-2">
          <button className="bg-white text-blue-600 px-3 py-1 rounded-md font-medium">Sign up</button>
          <button className="bg-white text-gray-700 px-3 py-1 rounded-md font-medium flex items-center">
            <SidebarOpen size={16} className="mr-1" />
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Campaign;