import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye,
  MessageSquare,
  ChevronUp,
  UserCircle,
  Loader
} from "lucide-react";

const Promoters = () => {
  const [selectedPromoters, setSelectedPromoters] = useState([]);
  const [promoters, setPromoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [metricsLoading, setMetricsLoading] = useState(true);
  
  // Fallback static data
  const staticPromotersData = [
    {
      name: "Emery Dokidis",
      contact: "+979970174715",
      leads: 12,
      conversionRate: 50,
      lastFollowUp: "28-4-2024",
      revenueGenerated: "$50",
      status: "Active"
    },
    {
      name: "Kadin Lipshulz",
      contact: "+971501948279",
      leads: 8,
      conversionRate: 30,
      lastFollowUp: "27-5-2024",
      revenueGenerated: "$900",
      status: "Active"
    },
    {
      name: "Randy Culhane",
      contact: "+971501598978",
      leads: 15,
      conversionRate: 60,
      lastFollowUp: "29-5-2024",
      revenueGenerated: "$1000",
      status: "Inactive"
    },
    {
      name: "Jaxson Vaccaro",
      contact: "+971522503635",
      leads: 10,
      conversionRate: 45,
      lastFollowUp: "30-6-2024",
      revenueGenerated: "$500",
      status: "Completed"
    },
    {
      name: "Jocelyn Levin",
      contact: "+971554315300",
      leads: 6,
      conversionRate: 28,
      lastFollowUp: "01-7-2024",
      revenueGenerated: "$1,500",
      status: "Inactive"
    },
    {
      name: "Maren Septimus",
      contact: "+971525620832",
      leads: 18,
      conversionRate: 65,
      lastFollowUp: "03-7-2024",
      revenueGenerated: "$2,000",
      status: "Completed"
    },
    {
      name: "Haylie Saris",
      contact: "+971503328228",
      leads: 13,
      conversionRate: 58,
      lastFollowUp: "05-7-2024",
      revenueGenerated: "$300",
      status: "Active"
    },
    {
      name: "Randy Herwiitz",
      contact: "+971554231522",
      leads: 12,
      conversionRate: 50,
      lastFollowUp: "10-7-2024",
      revenueGenerated: "$600",
      status: "Inactive"
    }
  ];

  const staticMetricsData = [
    {
      title: "Total Customers",
      value: "8",
      change: "+24%",
      changeType: "positive",
      period: "vs last month",
      icon: "users"
    },
    {
      title: "New Customers",
      value: "94",
      change: "+63%",
      changeType: "positive",
      period: "vs last month",
      icon: "user-plus"
    },
    {
      title: "Average Conversion rate",
      value: "64%",
      change: "-3%",
      changeType: "negative",
      period: "vs last month",
      icon: "percent"
    },
    {
      title: "Total Revenue Generated",
      value: "$23,900",
      change: "+15%",
      changeType: "positive",
      period: "vs last month",
      icon: "dollar"
    }
  ];

  // Fetch promoters data
  useEffect(() => {
    const fetchPromoters = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://34.10.166.233/auth/create-promoter", {
          method: "GET",
          headers: {
            "Authorization": "Basic " + btoa("username:password"), // Replace with actual credentials
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch promoters");
        }

        const data = await response.json();
        
        // Transform API data to match component format
        const formattedData = data.map(promoter => ({
          id: promoter.promoter_id,
          name: `${promoter.promoter_first_name} ${promoter.promoter_last_name}`,
          contact: promoter.promoter_phno,
          email: promoter.promoter_email,
          leads: promoter.leads || 0,
          conversionRate: promoter.conversion_rate || 0,
          lastFollowUp: promoter.last_follow_up || "No follow-up",
          revenueGenerated: promoter.revenue_generated ? `$${promoter.revenue_generated}` : "$0",
          status: promoter.is_onboarded ? "Active" : "Inactive"
        }));

        setPromoters(formattedData);
      } catch (err) {
        console.error("Error fetching promoters:", err);
        setError("Failed to load promoters. Using fallback data.");
        setPromoters(staticPromotersData);
      } finally {
        setLoading(false);
      }
    };

    fetchPromoters();
  }, []);

  // Fetch metrics data
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setMetricsLoading(true);
        // This is a placeholder since there's no specific metrics endpoint in the provided API docs
        // In a real app, you'd call the appropriate endpoint
        const response = await fetch("/api/proxy/metrics/promoter-metrics", {
          method: "GET",
          headers: {
            "Authorization": "Basic " + btoa("username:password"), // Replace with actual credentials
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch metrics");
        }

        const data = await response.json();
        setMetrics(data);
      } catch (err) {
        console.error("Error fetching metrics:", err);
        setMetrics(staticMetricsData);
      } finally {
        setMetricsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const togglePromoterSelection = (index) => {
    if (selectedPromoters.includes(index)) {
      setSelectedPromoters(selectedPromoters.filter(i => i !== index));
    } else {
      setSelectedPromoters([...selectedPromoters, index]);
    }
  };

  const createNewPromoter = async () => {
    // Implementation for creating a new promoter
    try {
      // Navigate to a form or open a modal
      console.log("Create new promoter");
    } catch (err) {
      console.error("Error creating promoter:", err);
    }
  };

  const askForReferrals = async () => {
    // Implementation for asking past customers for referrals
    try {
      console.log("Ask for referrals");
    } catch (err) {
      console.error("Error asking for referrals:", err);
    }
  };

  const renderMetricIcon = (iconName) => {
    switch (iconName) {
      case "users":
        return (
          <div className="bg-gray-100 p-2 rounded-full">
            <UserCircle size={20} className="text-gray-500" />
          </div>
        );
      case "user-plus":
        return (
          <div className="bg-red-50 p-2 rounded-full">
            <UserCircle size={20} className="text-red-300" />
          </div>
        );
      case "percent":
        return (
          <div className="bg-purple-50 p-2 rounded-full">
            <span className="text-purple-400 font-medium">%</span>
          </div>
        );
      case "dollar":
        return (
          <div className="bg-blue-50 p-2 rounded-full">
            <span className="text-blue-400 font-medium">$</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-7xl mx-auto">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <div className="flex gap-3">
          <button 
            className="flex items-center bg-gradient-to-r from-[rgba(48,90,255,0.8)] to-[#B5D2FF] text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={createNewPromoter}
          >
            <Plus size={16} className="mr-2" />
            <span>New Promoter</span>
          </button>
          <button 
            className="flex items-center border border-blue-500 text-blue-500 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
            onClick={askForReferrals}
          >
            <span>Ask Past Customers For Referrals</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metricsLoading ? (
          Array(4).fill(0).map((_, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 flex items-start shadow-sm animate-pulse">
              <div className="mr-3 mt-1 h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="w-full">
                <div className="h-4 bg-gray-200 mb-1 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 mb-1 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))
        ) : (
          metrics.map((metric, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 flex items-start shadow-sm">
              <div className="mr-3 mt-1">
                {renderMetricIcon(metric.icon)}
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">{metric.title}</div>
                <div className="font-semibold text-xl mb-1">{metric.value}</div>
                <div className="flex items-center text-xs">
                  <span className={`${metric.changeType === "positive" ? "text-green-500" : "text-red-500"} mr-1 font-medium`}>
                    {metric.change}
                  </span>
                  <span className="text-gray-400">{metric.period}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Promoters Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Promoters</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-9 pr-3 py-2 border border-gray-200 rounded-md w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button className="flex items-center border border-gray-200 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
              <Filter size={16} className="mr-2" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Promoters Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="animate-spin text-blue-500 mr-2" size={24} />
              <span className="text-gray-600">Loading promoters...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 p-4 rounded-md mb-4 text-red-600">
              {error}
            </div>
          ) : (
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-gray-50">
                  <th className="sticky top-0 py-2 px-3 whitespace-nowrap border-b border-gray-200 text-left">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600"
                    />
                  </th>
                  <th className="sticky top-0 py-2 px-3 whitespace-nowrap border-b border-gray-200 text-left font-medium text-gray-700 flex items-center">
                    Promoter Name <ChevronUp size={14} className="ml-1 text-gray-400" />
                  </th>
                  <th className="sticky top-0 py-2 px-3 whitespace-nowrap border-b border-gray-200 text-left font-medium text-gray-700">
                    Contact No.
                  </th>
                  <th className="sticky top-0 py-2 px-3 whitespace-nowrap border-b border-gray-200 text-left font-medium text-gray-700">
                    Leads
                  </th>
                  <th className="sticky top-0 py-2 px-3 whitespace-nowrap border-b border-gray-200 text-left font-medium text-gray-700">
                    Conversion Rate
                  </th>
                  <th className="sticky top-0 py-2 px-3 whitespace-nowrap border-b border-gray-200 text-left font-medium text-gray-700">
                    Last Follow-Up
                  </th>
                  <th className="sticky top-0 py-2 px-3 whitespace-nowrap border-b border-gray-200 text-left font-medium text-gray-700">
                    Revenue Generated
                  </th>
                  <th className="sticky top-0 py-2 px-3 whitespace-nowrap border-b border-gray-200 text-left font-medium text-gray-700">
                    Referrer Status
                  </th>
                  <th className="sticky top-0 py-2 px-3 whitespace-nowrap border-b border-gray-200 text-left font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {promoters.map((promoter, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-gray-100 hover:bg-gray-50 ${selectedPromoters.includes(index) ? "bg-blue-50" : ""}`}
                  >
                    <td className="px-3 py-3 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        checked={selectedPromoters.includes(index)}
                        onChange={() => togglePromoterSelection(index)}
                        className="rounded border-gray-300 text-blue-600"
                      />
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap font-medium">{promoter.name}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-gray-500">{promoter.contact}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-gray-500">{promoter.leads}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-gray-500">{promoter.conversionRate}%</td>
                    <td className="px-3 py-3 whitespace-nowrap text-gray-500">{promoter.lastFollowUp}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-gray-500">{promoter.revenueGenerated}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className={`
                        px-3 py-1 rounded-full text-xs
                        ${promoter.status === "Active" ? "bg-blue-100 text-blue-600" : 
                          promoter.status === "Completed" ? "bg-green-100 text-green-600" : 
                          "bg-orange-100 text-orange-600"
                        }
                      `}>
                        {promoter.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex space-x-1 relative group">
                        <button className="p-1 hover:bg-gray-100 rounded-md">
                          <Eye size={16} className="text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-md">
                          <MessageSquare size={16} className="text-gray-400" />
                        </button>
                        {index === 1 && (
                          <div className="absolute bg-white shadow-lg border border-gray-200 rounded-md p-2 -top-2 right-8 z-10">
                            <div className="text-xs whitespace-nowrap px-1 py-0.5 hover:bg-gray-100">
                              View Profile
                            </div>
                            <div className="text-xs whitespace-nowrap px-1 py-0.5 hover:bg-gray-100">
                              Send follow-up message
                            </div>
                          </div>
                        )}
                        {index === 6 && (
                          <div className="absolute bg-white shadow-lg border border-gray-200 rounded-md p-1 -bottom-8 right-8 z-10">
                            <div className="flex items-center text-blue-500 text-xs whitespace-nowrap px-1 py-0.5">
                              <MessageSquare size={12} className="mr-1" />
                              <span>1</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Promoters;