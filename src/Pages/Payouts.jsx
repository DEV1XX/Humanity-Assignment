import { useState } from 'react';
import { Eye } from 'lucide-react';

const Payouts = () => {
  const [activeTab, setActiveTab] = useState('allPayouts');
  const [togglePreload, setTogglePreload] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  
  const tabData = [
    { id: 'allPayouts', label: 'All Payouts' },
    { id: 'disputes', label: 'Disputes' },
    { id: 'payoutSettings', label: 'Payout Settings' }
  ];

  const payoutData = [
    { 
      id: 'P-1048', 
      promoter: 'Emery Dokidis', 
      points: '500 pts', 
      date: '28-4-2024', 
      reward: 'Spring Boost', 
      status: 'Paid' 
    },
    { 
      id: 'P-1047', 
      promoter: 'Kadin Lipshutz', 
      points: '250 pts', 
      date: '27-5-2024', 
      reward: 'Summer Referral Program', 
      status: 'Paid' 
    },
    { 
      id: 'P-1046', 
      promoter: 'Randy Culhane', 
      points: '300 pts', 
      date: '29-5-2024', 
      reward: 'Early Bird Special', 
      status: 'Disputed' 
    },
    { 
      id: 'P-1045', 
      promoter: 'Jaxson Vaccaro', 
      points: '100 pts', 
      date: '30-6-2024', 
      reward: 'Early Bird Special', 
      status: 'Paid' 
    },
    { 
      id: 'P-1044', 
      promoter: 'Jocelyn Levin', 
      points: '200 pts', 
      date: '01-7-2024', 
      reward: 'Summer Referral Program', 
      status: 'Disputed' 
    },
    { 
      id: 'P-1043', 
      promoter: 'Maren Septimus', 
      points: '300 pts', 
      date: '03-7-2024', 
      reward: 'Summer Referral Program', 
      status: 'Paid' 
    },
    { 
      id: 'P-1042', 
      promoter: 'Haylie Saris', 
      points: '220 pts', 
      date: '05-7-2024', 
      reward: 'Spring Boost', 
      status: 'Paid' 
    },
    { 
      id: 'P-1041', 
      promoter: 'Randy Herwitz', 
      points: '400 pts', 
      date: '10-7-2024', 
      reward: 'Spring Boost', 
      status: 'Disputed' 
    }
  ];

  const disputeData = [
    { 
      id: 'D-3012', 
      promoter: 'Emery Dokidis', 
      points: '500 pts', 
      date: '28-4-2024', 
      reward: 'Spring Boost', 
      status: 'Resolved' 
    },
    { 
      id: 'D-3013', 
      promoter: 'Kadin Lipshutz', 
      points: '250 pts', 
      date: '27-5-2024', 
      reward: 'Summer Referral Program', 
      status: 'Resolved' 
    },
    { 
      id: 'D-3014', 
      promoter: 'Randy Culhane', 
      points: '300 pts', 
      date: '29-5-2024', 
      reward: 'Early Bird Special', 
      status: 'Under Review' 
    },
    { 
      id: 'D-3015', 
      promoter: 'Jaxson Vaccaro', 
      points: '100 pts', 
      date: '30-6-2024', 
      reward: 'Early Bird Special', 
      status: 'Resolved' 
    },
    { 
      id: 'D-3016', 
      promoter: 'Jocelyn Levin', 
      points: '200 pts', 
      date: '01-7-2024', 
      reward: 'Summer Referral Program', 
      status: 'Under Review' 
    },
    { 
      id: 'D-3017', 
      promoter: 'Maren Septimus', 
      points: '300 pts', 
      date: '03-7-2024', 
      reward: 'Summer Referral Program', 
      status: 'Resolved' 
    },
    { 
      id: 'D-3018', 
      promoter: 'Haylie Saris', 
      points: '220 pts', 
      date: '05-7-2024', 
      reward: 'Spring Boost', 
      status: 'Resolved' 
    },
    { 
      id: 'D-3019', 
      promoter: 'Randy Herwitz', 
      points: '400 pts', 
      date: '10-7-2024', 
      reward: 'Spring Boost', 
      status: 'Under Review' 
    }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-600';
      case 'Disputed':
        return 'bg-orange-100 text-orange-400';
      case 'Resolved':
        return 'bg-green-100 text-green-600';
      case 'Under Review':
        return 'bg-orange-100 text-orange-400';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg min-h-screen p-6 font-sans ml-8 mr-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 flex items-center">
            <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center mr-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.09 9.00005L5.5 14L8 12.5L10.5 14L9.91 9.00005" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Points Given</p>
              <p className="font-bold text-gray-900">12,500</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 flex items-center">
            <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center mr-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4H3.33333H14" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.33334 4.00001V2.66667C5.33334 2.31305 5.47382 1.97391 5.7239 1.72386C5.97397 1.47381 6.31311 1.33334 6.66668 1.33334H9.33334C9.68691 1.33334 10.026 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31305 10.6667 2.66667V4.00001M12.6667 4.00001V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2762C12.026 14.5262 11.6869 14.6667 11.3333 14.6667H4.66668C4.31311 14.6667 3.97397 14.5262 3.7239 14.2762C3.47382 14.0261 3.33334 13.687 3.33334 13.3333V4.00001H12.6667Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.33334 7.33334V11.3333" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.66666 7.33334V11.3333" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Current Point Balance</p>
              <p className="font-bold text-gray-900">1,250</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 flex items-center">
            <div className="bg-pink-100 w-10 h-10 rounded-full flex items-center justify-center mr-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 9.33334V12.6667C14 13.0203 13.8595 13.3595 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3595 2 13.0203 2 12.6667V9.33334" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.66666 6.00001L8 9.33334L11.3333 6.00001" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 9.33334V2" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Last Points Transfer</p>
              <p className="font-bold text-gray-900">April 9, 2025</p>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg mb-6 mr-191 ">
          <div className="flex border-b border-gray-200 p-1">
            {tabData.map((tab) => (
              <button
                key={tab.id}
                className={`py-1 px-6 rounded-md ${activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'allPayouts' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-900 font-medium">All Payouts</h2>
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                Filter
              </button>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Payout ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Promoter Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Points</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Reward Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Reward Earned For</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payoutData.map((payout, index) => (
                      <tr key={payout.id} className="border-b border-gray-200">
                        <td className="px-4 py-3 text-sm text-gray-900">{payout.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{payout.promoter}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{payout.points}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{payout.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{payout.reward}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 text-xs rounded-full ${getStatusClass(payout.status)}`}>
                            {payout.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 relative">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Eye size={18} className="text-gray-600" />
                            </button>
                            <button className={`text-xs text-blue-600 ${payout.status === 'Disputed' ? 'hidden' : ''}`}>
                              Request Dispute
                            </button>
                            <button className={`text-xs text-blue-600 ${payout.status !== 'Disputed' ? 'hidden' : ''}`}>
                              Track Dispute
                            </button>
                            {index === 0 && (
                              <div className="absolute right-0 top-8 px-2 py-1 bg-gray-600 text-white text-xs rounded whitespace-nowrap">
                                View Profile
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'disputes' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-900 font-medium">Disputes</h2>
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                Filter
              </button>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Dispute ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Promoter Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Points</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Submitted On</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Reward Earned For</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disputeData.map((dispute) => (
                      <tr key={dispute.id} className="border-b border-gray-200">
                        <td className="px-4 py-3 text-sm text-gray-900">{dispute.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{dispute.promoter}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{dispute.points}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{dispute.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{dispute.reward}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 text-xs rounded-full ${getStatusClass(dispute.status)}`}>
                            {dispute.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Eye size={18} className="text-gray-600" />
                            </button>
                            {dispute.status === 'Under Review' && (
                              <button className="text-xs text-blue-600">
                                Resolve
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'payoutSettings' && (
          <div>
            <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-gray-900 font-medium mb-2">Preload Money</h2>
              <div className="flex items-center mb-4">
                <span className="text-gray-600 text-sm mr-4">Use Points to Reward Promoters Instantly</span>
                <div 
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${togglePreload ? 'bg-blue-500' : 'bg-gray-300'}`}
                  onClick={() => setTogglePreload(!togglePreload)}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${togglePreload ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-md mb-6">
                <p className="text-gray-700">Current Point Balance: <span className="text-blue-600 font-bold text-lg">1,250</span> Points</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Enter Amount</label>
                <input 
                  type="text" 
                  placeholder="Enter amount..." 
                  className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <p className="text-gray-500 text-xs mt-2">You'll receive 10 points per $1</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-gray-700 mb-4">Payment Methods</h3>
                <div className="flex flex-wrap gap-4 mb-6">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                      checked={paymentMethod === 'creditCard'}
                      onChange={() => setPaymentMethod('creditCard')}
                    />
                    <span className="ml-2 text-gray-700">Credit/Debit/ATM Card</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                    />
                    <span className="ml-2 text-gray-700">Paypal account</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                      checked={paymentMethod === 'bankTransfer'}
                      onChange={() => setPaymentMethod('bankTransfer')}
                    />
                    <span className="ml-2 text-gray-700">Bank Transfer</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                    <span className="ml-2 text-gray-700">UPI</span>
                  </label>
                </div>
                
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  Buy Points
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payouts;