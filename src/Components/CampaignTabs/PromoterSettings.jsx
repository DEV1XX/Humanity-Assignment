import React from "react";

const PromoterSettings = ({
  campaignName,
  setCampaignName,
  rewardValue,
  setRewardValue,
  promoterMessage,
  setPromoterMessage
}) => {
  return (
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
  );
};

export default PromoterSettings;