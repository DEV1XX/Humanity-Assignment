// components/CampaignTabs/CampaignCard.jsx
import React from "react";
import { Trash, Eye } from "lucide-react";

const CampaignCard = ({ campaign }) => {
  const { 
    title, 
    status, 
    dateRange, 
    referrals, 
    conversion, 
    roi, 
    recommendation 
  } = campaign;
  
  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">{title}</h3>
          <span className={`${status === "Active" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"} text-xs px-2 py-1 rounded-md`}>
            {status}
          </span>
        </div>
        <div className="text-gray-500 text-sm mb-4">{dateRange}</div>
        
        <div className="grid grid-cols-3 mb-4">
          <div className="border-r border-gray-200 pr-2">
            <div className="text-gray-500 text-xs sm:text-sm mb-1">Referrals</div>
            <div className="font-semibold text-base sm:text-lg">{referrals}</div>
          </div>
          <div className="border-r border-gray-200 px-2">
            <div className="text-gray-500 text-xs sm:text-sm mb-1">Conversion</div>
            <div className="font-semibold text-base sm:text-lg">{conversion}</div>
          </div>
          <div className="pl-2">
            <div className="text-gray-500 text-xs sm:text-sm mb-1">ROI</div>
            <div className="font-semibold text-base sm:text-lg">{roi}</div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-md p-3 mb-4 flex">
          <div className="h-2 w-2 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
          <div className="text-xs sm:text-sm text-gray-700">
            {recommendation}
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
  );
};

export default CampaignCard;