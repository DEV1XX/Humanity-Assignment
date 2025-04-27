import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import PastPromotersTab from "../Components/CampaignTabs/PastPromotersTab";
import NewPromotersTab from "../Components/CampaignTabs/NewPromotersTab";
import NewLeadsTab from "../Components/CampaignTabs/NewLeadsTab";
import CreateCampaignModal from "../Components/Modals/CreateCampaignModal";

const Campaign = () => {
  const [activeTab, setActiveTab] = useState("pastPromoters");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Get authentication token with a more reliable approach
  const getAuthToken = () => {
    // Check local storage first
    const token = localStorage.getItem('accessToken');
    
    // If token exists in local storage, return it
    if (token) return token;
    
    // Otherwise check for alternate keys
    return localStorage.getItem('access_token') || 
           sessionStorage.getItem('accessToken') || 
           sessionStorage.getItem('access_token');
  };
  
  // Fetch user data and campaigns when component mounts
  useEffect(() => {
    try {
      // Try to parse user data from storage
      const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserData(user);
      }
    } catch (err) {
      console.error('Failed to parse user data:', err);
    }
    
    fetchCampaigns();
  }, []);

  // Function to fetch all campaigns from API
  const fetchCampaigns = async () => {
    try {
      const token = getAuthToken();
                    
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://34.10.166.233/campaigns/get-all-campaigns', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        console.error('Authentication failed: Token may be expired or invalid');
        throw new Error('Authentication failed: Please log in again');
      }

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

  // Function to create a new campaign
  const createCampaign = async (campaignData) => {
    setLoading(true);
    try {
      const token = getAuthToken();
                    
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Sending campaign data:', JSON.stringify(campaignData));
      console.log('Using token:', token);

      const response = await fetch('http://34.10.166.233/campaigns/create-campaign', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(campaignData)
      });

      if (response.status === 401) {
        console.error('Authentication failed: Token may be expired or invalid');
        throw new Error('Authentication failed: Please log in again');
      }

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || `Error creating campaign: ${response.status}`;
        } catch (e) {
          errorMessage = `Error creating campaign: ${response.status} - ${errorText}`;
        }
        throw new Error(errorMessage);
      }

      // Close modal and refresh campaigns
      setShowCreateModal(false);
      fetchCampaigns();
    } catch (err) {
      console.error('Failed to create campaign:', err);
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
        return <PastPromotersTab 
                campaigns={campaigns} 
                loading={loading} 
                error={error} 
                refreshCampaigns={fetchCampaigns} 
                onCreateCampaign={() => setShowCreateModal(true)} 
               />;
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
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
          <button 
            className="text-sm underline" 
            onClick={() => setError(null)}
          >
            Dismiss
          </button>
        </div>
      )}
      
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

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <CreateCampaignModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={createCampaign}
        />
      )}
    </div>
  );
};

export default Campaign;






















// import React, { useState, useEffect } from "react";
// import { Menu } from "lucide-react";
// import PastPromotersTab from "../Components/CampaignTabs/PastPromotersTab";
// import NewPromotersTab from "../Components/CampaignTabs/NewPromotersTab";
// import NewLeadsTab from "../Components/CampaignTabs/NewLeadsTab";
// import CreateCampaignModal from "../Components/Modals/CreateCampaignModal";

// const Campaign = () => {
//   const [activeTab, setActiveTab] = useState("pastPromoters");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [campaigns, setCampaigns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [retryCount, setRetryCount] = useState(0);
//   const [authToken, setAuthToken] = useState('');
  
//   // Get authentication token
//   const getAuthToken = () => {
//     // Direct way to get token from localStorage as shown in Image 3
//     return localStorage.getItem('accessToken');
//   };
  
//   // Set token on component mount
//   useEffect(() => {
//     const token = getAuthToken();
//     setAuthToken(token);
    
//     try {
//       // Try to parse user data from storage
//       const userStr = localStorage.getItem('user');
//       if (userStr) {
//         const user = JSON.parse(userStr);
//         setUserData(user);
//       }
//     } catch (err) {
//       console.error('Failed to parse user data:', err);
//     }
    
//     if (token) {
//       fetchCampaigns(token);
//     } else {
//       setError('No authentication token found. Please log in again.');
//       setLoading(false);
//     }
//   }, []);

//   // Function to handle token refresh (mock implementation)
//   const refreshToken = () => {
//     // In a real implementation, you would make an API call to refresh the token
//     // For now, we'll just use this as a placeholder
//     console.log('Token refresh attempted');
//     return localStorage.getItem('refreshToken');
//   };

//   // Function to fetch all campaigns from API
//   const fetchCampaigns = async (token) => {
//     try {
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await fetch('http://34.10.166.233/campaigns/get-all-campaigns', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.status === 401) {
//         console.error('Authentication failed: Token may be expired or invalid');
        
//         // If we haven't tried to refresh the token yet, attempt to do so
//         if (retryCount === 0) {
//           const newToken = refreshToken();
//           if (newToken) {
//             setRetryCount(retryCount + 1);
//             setAuthToken(newToken);
//             fetchCampaigns(newToken);
//             return;
//           }
//         }
        
//         throw new Error('Authentication failed: Please log in again');
//       }
      
//       if (response.status === 403) {
//         throw new Error('You do not have permission to access campaigns');
//       }

//       if (response.status === 404) {
//         // This might actually be okay - could mean no campaigns exist yet
//         console.log('No campaigns found or endpoint not available');
//         setCampaigns([]);
//         setLoading(false);
//         return;
//       }

//       if (!response.ok) {
//         throw new Error(`Error fetching campaigns: ${response.status}`);
//       }

//       const data = await response.json();
//       setCampaigns(data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Failed to fetch campaigns:', err);
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   // Function to create a new campaign
//   const createCampaign = async (campaignData) => {
//     setLoading(true);
//     try {
//       const token = authToken;
                    
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       console.log('Sending campaign data:', JSON.stringify(campaignData));

//       const response = await fetch('http://34.10.166.233/campaigns/create-campaign', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(campaignData)
//       });

//       if (response.status === 401) {
//         console.error('Authentication failed: Token may be expired or invalid');
        
//         // If we haven't tried to refresh the token yet, attempt to do so
//         if (retryCount === 0) {
//           const newToken = refreshToken();
//           if (newToken) {
//             setRetryCount(retryCount + 1);
//             setAuthToken(newToken);
//             createCampaign(campaignData);
//             return;
//           }
//         }
        
//         throw new Error('Authentication failed: Please log in again');
//       }
      
//       if (response.status === 403) {
//         throw new Error('You do not have permission to create campaigns');
//       }

//       if (!response.ok) {
//         const errorText = await response.text();
//         let errorMessage;
//         try {
//           const errorData = JSON.parse(errorText);
//           errorMessage = errorData.error || `Error creating campaign: ${response.status}`;
//         } catch (e) {
//           errorMessage = `Error creating campaign: ${response.status} - ${errorText}`;
//         }
//         throw new Error(errorMessage);
//       }

//       // Close modal and refresh campaigns
//       setShowCreateModal(false);
//       fetchCampaigns(token);
//     } catch (err) {
//       console.error('Failed to create campaign:', err);
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setMobileMenuOpen(false);
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const renderActiveTab = () => {
//     switch (activeTab) {
//       case "pastPromoters":
//         return <PastPromotersTab 
//                 campaigns={campaigns} 
//                 loading={loading} 
//                 error={error} 
//                 refreshCampaigns={() => fetchCampaigns(authToken)} 
//                 onCreateCampaign={() => setShowCreateModal(true)} 
//                />;
//       case "newPromoters":
//         return <NewPromotersTab />;
//       case "newLeads":
//         return <NewLeadsTab />;
//       default:
//         return null;
//     }
//   };

//   // Get user name from stored user data
//   const userName = userData?.name || "Kevin Stanton";
//   const userRole = userData?.role || "Product Manager";

//   return (
//     <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm">
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           <p>{error}</p>
//           <button 
//             className="text-sm underline mt-1" 
//             onClick={() => setError(null)}
//           >
//             Dismiss
//           </button>
//         </div>
//       )}
      
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
//         <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Create & Manage Referral Campaigns</h1>
//         {activeTab !== "pastPromoters" && (
//           <div className="flex items-center">
//             <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
//             <span className="text-xs sm:text-sm text-gray-500 mr-2 sm:mr-4">Draft</span>
//             <img 
//               src="/api/placeholder/32/32" 
//               alt="User avatar" 
//               className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2"
//             />
//             <div>
//               <span className="text-xs sm:text-sm font-medium">{userName}</span>
//               <span className="text-xs text-gray-500 ml-1 hidden sm:inline">{userRole}</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Main Tabs - Desktop */}
//       <div className="hidden sm:block p-3 bg-white rounded-md">
//         <div className="flex mb-6 bg-blue-100 p-1 w-fit rounded-md">
//           <button 
//             className={`py-2 px-6 rounded-l-md ml-1 text-sm ${activeTab === "pastPromoters" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"}`}
//             onClick={() => handleTabChange("pastPromoters")}
//           >
//             Past Promoters
//           </button>
//           <button 
//             className={`py-2 px-6 text-sm ${activeTab === "newPromoters" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"}`}
//             onClick={() => handleTabChange("newPromoters")}
//           >
//             New Promoters
//           </button>
//           <button 
//             className={`py-2 px-6 rounded-r-md mr-1 text-sm ${activeTab === "newLeads" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600"}`}
//             onClick={() => handleTabChange("newLeads")}
//           >
//             New Leads
//           </button>
//         </div>
//       </div>

//       {/* Main Tabs - Mobile */}
//       <div className="sm:hidden p-3 bg-white rounded-md mb-4">
//         <div className="flex justify-between items-center">
//           <div className="font-medium text-sm">
//             {activeTab === "pastPromoters" ? "Past Promoters" : activeTab === "newPromoters" ? "New Promoters" : "New Leads"}
//           </div>
//           <button 
//             className="bg-gray-100 p-2 rounded-md"
//             onClick={toggleMobileMenu}
//           >
//             <Menu size={18} />
//           </button>
//         </div>
        
//         {mobileMenuOpen && (
//           <div className="absolute bg-white shadow-lg rounded-md mt-2 p-2 z-10 right-4 left-4">
//             <button 
//               className={`block w-full text-left py-2 px-3 rounded-md text-sm mb-1 ${activeTab === "pastPromoters" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
//               onClick={() => handleTabChange("pastPromoters")}
//             >
//               Past Promoters
//             </button>
//             <button 
//               className={`block w-full text-left py-2 px-3 rounded-md text-sm mb-1 ${activeTab === "newPromoters" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
//               onClick={() => handleTabChange("newPromoters")}
//             >
//               New Promoters
//             </button>
//             <button 
//               className={`block w-full text-left py-2 px-3 rounded-md text-sm ${activeTab === "newLeads" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
//               onClick={() => handleTabChange("newLeads")}
//             >
//               New Leads
//             </button>
//           </div>
//         )}
//       </div>

//       {renderActiveTab()}

//       {/* Create Campaign Modal */}
//       {showCreateModal && (
//         <CreateCampaignModal 
//           isOpen={showCreateModal}
//           onClose={() => setShowCreateModal(false)}
//           onSubmit={createCampaign}
//         />
//       )}
//     </div>
//   );
// };

// export default Campaign;