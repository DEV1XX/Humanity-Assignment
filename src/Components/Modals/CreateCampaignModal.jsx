import React, { useState } from "react";
import { X } from "lucide-react";

const CreateCampaignModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    campaign_name: "",
    campaign_description: "",
    campaign_start_date: new Date().toISOString().split('T')[0],
    campaign_end_date: "",
    promoter_reward_points: 100,
    lead_reward_discount: "10.00",
    target_promoter_type: "past"
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.campaign_name.trim()) {
      tempErrors.campaign_name = "Campaign name is required";
      isValid = false;
    }

    if (!formData.campaign_description.trim()) {
      tempErrors.campaign_description = "Campaign description is required";
      isValid = false;
    }

    if (!formData.campaign_start_date) {
      tempErrors.campaign_start_date = "Start date is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    
    if (!isNaN(value)) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Format date string in YYYY-MM-DD format for API
  const formatDateForAPI = (dateString) => {
    if (!dateString) return null;
    
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (err) {
      console.error('Error formatting date:', err);
      return dateString; // Return original if parsing fails
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Prepare data in the format expected by the API
      const campaignData = {
        campaign_name: formData.campaign_name,
        campaign_description: formData.campaign_description,
        campaign_start_date: formatDateForAPI(formData.campaign_start_date),
        campaign_end_date: formData.campaign_end_date ? formatDateForAPI(formData.campaign_end_date) : null,
        promoter_reward_points: parseInt(formData.promoter_reward_points, 10),
        lead_reward_discount: formData.lead_reward_discount,
        target_promoter_type: formData.target_promoter_type
      };
      
      onSubmit(campaignData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-medium">Create New Campaign</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            {/* Campaign Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Name*
              </label>
              <input
                type="text"
                name="campaign_name"
                value={formData.campaign_name}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.campaign_name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter campaign name"
              />
              {errors.campaign_name && (
                <p className="text-red-500 text-xs mt-1">{errors.campaign_name}</p>
              )}
            </div>

            {/* Campaign Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Description*
              </label>
              <textarea
                name="campaign_description"
                value={formData.campaign_description}
                onChange={handleChange}
                rows="3"
                className={`w-full p-2 border rounded-md ${
                  errors.campaign_description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter campaign description"
              ></textarea>
              {errors.campaign_description && (
                <p className="text-red-500 text-xs mt-1">{errors.campaign_description}</p>
              )}
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date*
              </label>
              <input
                type="date"
                name="campaign_start_date"
                value={formData.campaign_start_date}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.campaign_start_date ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.campaign_start_date && (
                <p className="text-red-500 text-xs mt-1">{errors.campaign_start_date}</p>
              )}
            </div>

            {/* End Date (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date (Optional)
              </label>
              <input
                type="date"
                name="campaign_end_date"
                value={formData.campaign_end_date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <p className="text-gray-500 text-xs mt-1">Leave blank for an ongoing campaign</p>
            </div>

            {/* Promoter Reward Points */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Promoter Reward Points
              </label>
              <input
                type="number"
                name="promoter_reward_points"
                value={formData.promoter_reward_points}
                onChange={handleNumberChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                min="0"
              />
            </div>

            {/* Lead Reward Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lead Reward Discount (%)
              </label>
              <input
                type="text"
                name="lead_reward_discount"
                value={formData.lead_reward_discount}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="10.00"
              />
            </div>

            {/* Target Promoter Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Promoter Type
              </label>
              <select
                name="target_promoter_type"
                value={formData.target_promoter_type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="past">Past Promoters</option>
                <option value="new">New Promoters</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaignModal;