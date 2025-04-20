import { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

// Updated dummy API structure based on the provided JSON and Figma design
const dashboardData = {     
  "metrics": {       
    "totalPromoters": { "count": 1234, "change": "+12.3%" },       
    "conversionRate": { "value": "23.5%", "change": "-2.4%" },       
    "revenueGenerated": { "amount": "$12,345", "change": "+8.7%" },       
    "activeCampaigns": 3     
  },     
  "referralStats": {       
    "repeatRate": "42%",       
    "engagementRate": "67%",       
    "churnRate": "28%",       
    "upsellRate": "19%"     
  },     
  "promoterPerformance": {       
    "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],       
    "data": [32, 30, 38, 36, 40, 42]     
  },     
  "conversionSuccess": {       
    "labels": ["Referrals sent", "Converted"],       
    "data": [57, 43]     
  },     
  "topChannels": [       
    { "platform": "Facebook", "percentage": 78 },       
    { "platform": "Twitter", "percentage": 45 },       
    { "platform": "LinkedIn", "percentage": 23 }     
  ],     
  "recentActivities": [       
    { "activity": "Julian earned $10", "date": "28-4-2024", "time": "10:30 AM" },       
    { "activity": "John Doe signed up from your referral link", "date": "29-4-2024", "time": "9:45 AM" },       
    { "activity": "You reached 50 referrals milestone!", "date": "30-4-2024", "time": "8:20 AM" },
    { "activity": "You updated your referral campaign", "date": "31-4-2024", "time": "7:00 AM" }
  ],
  "leaderboard": [
    { "rank": 1, "name": "Emery Dokins", "conversions": 150, "referrals": 80, "successRate": "60%", "revenue": "$1,100" },
    { "rank": 2, "name": "Kadin Lapishtz", "conversions": 132, "referrals": 90, "successRate": "65%", "revenue": "$950" },
    { "rank": 3, "name": "Randy Culhane", "conversions": 110, "referrals": 60, "successRate": "60%", "revenue": "$880" },
    { "rank": 4, "name": "Jaxson Valorem", "conversions": 100, "referrals": 65, "successRate": "75%", "revenue": "$500" },
    { "rank": 5, "name": "Jocelyn Leon", "conversions": 50, "referrals": 30, "successRate": "63%", "revenue": "$600" },
    { "rank": 6, "name": "Marin Septimus", "conversions": 80, "referrals": 35, "successRate": "25%", "revenue": "$300" },
    { "rank": 7, "name": "Elayna Fritz", "conversions": 110, "referrals": 75, "successRate": "45%", "revenue": "$450" },
    { "rank": 8, "name": "Raisa Culham", "conversions": 95, "referrals": 40, "successRate": "38%", "revenue": "$200" }
  ]
};

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulating API call with the embedded data
    setTimeout(() => {
      setData(dashboardData);
    }, 300);
  }, []);

  if (!data) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading dashboard data...</p>
      </div>
    </div>
  );

  const lineChartData = {
    labels: data.promoterPerformance.labels,
    datasets: [
      {
        label: "Performance",
        data: data.promoterPerformance.data,
        fill: false,
        borderColor: "#4F46E5",
        tension: 0.4,
        pointBackgroundColor: "#4F46E5",
        pointRadius: 4
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB",
        },
        ticks: {
          font: {
            size: 10
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 6
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 10,
        displayColors: false
      }
    },
    maintainAspectRatio: false
  };

  const doughnutChartData = {
    labels: data.conversionSuccess.labels,
    datasets: [
      {
        data: data.conversionSuccess.data,
        backgroundColor: ["#6366F1", "#A5B4FC"],
        borderWidth: 0,
        cutout: '70%'
      }
    ]
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 6,
          font: {
            size: 10
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 10
      }
    },
    cutout: '70%',
    maintainAspectRatio: false
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <MetricCard 
          label="Total Promoters" 
          value={data.metrics.totalPromoters.count.toLocaleString()} 
          change={data.metrics.totalPromoters.change} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          }
          bgColor="bg-gray-50"
        />
        <MetricCard 
          label="Conversion rate" 
          value={data.metrics.conversionRate.value} 
          change={data.metrics.conversionRate.change} 
          negative={true} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          }
          bgColor="bg-red-50"
        />
        <MetricCard 
          label="Revenue Generated" 
          value={data.metrics.revenueGenerated.amount} 
          change={data.metrics.revenueGenerated.change} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          }
          bgColor="bg-pink-50"
        />
        <MetricCard 
          label="Active Campaigns" 
          value={data.metrics.activeCampaigns} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          }
          bgColor="bg-blue-50"
        />
      </div>

      {/* Stat Cards with Pie */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <PieStatCard
          label="Repeat Referral Rate"
          value={data.referralStats.repeatRate}
          color="#10B981"
          helpIcon={true}
        />
        <PieStatCard
          label="Referral Engagement Rate"
          value={data.referralStats.engagementRate}
          color="#EF4444"
          helpIcon={true}
        />
        <PieStatCard
          label="Churn Rate of Leads"
          value={data.referralStats.churnRate}
          color="#3B82F6"
          helpIcon={true}
        />
        <PieStatCard
          label="Upsell Rate of Leads"
          value={data.referralStats.upsellRate}
          color="#A855F7"
          helpIcon={true}
        />
      </div>

      {/* Charts & Channel Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Promoter Performance Over Time</h3>
            <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
              <span>Last 6 months</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="h-64">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4">Conversion Success Rate</h3>
            <div className="flex items-center justify-center">
              <div className="h-48 w-64">
                <Doughnut data={doughnutChartData} options={doughnutOptions} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4">Top Performing Channel</h3>
            <div className="grid grid-cols-3 gap-3">
              {data.topChannels.map((channel, index) => (
                <div 
                  key={index} 
                  className={`${
                    channel.platform === 'Facebook' ? 'bg-red-50' : 
                    channel.platform === 'Twitter' ? 'bg-blue-50' : 'bg-blue-50'
                  } rounded-lg p-3 text-center`}
                >
                  <p className="text-sm text-gray-500">{channel.platform}</p>
                  <p className="font-medium text-lg">{channel.percentage}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <h3 className="font-medium text-gray-900 mb-4">Recent Activities</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="py-2 font-medium">Activities</th>
                <th className="py-2 font-medium">Date</th>
                <th className="py-2 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.recentActivities.map((item, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2">{item.activity}</td>
                  <td className="py-2 text-gray-500">{item.date}</td>
                  <td className="py-2 text-gray-500">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-gray-900 mb-4">Leaderboard Table View</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="py-2 font-medium">Rank</th>
                <th className="py-2 font-medium">Promoter Name</th>
                <th className="py-2 font-medium">Conversion Rate</th>
                <th className="py-2 font-medium">Referrals Sent</th>
                <th className="py-2 font-medium">Successful Conversions</th>
                <th className="py-2 font-medium">Revenue Generated</th>
              </tr>
            </thead>
            <tbody>
              {data.leaderboard.map((person, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3">{person.rank}</td>
                  <td className="py-3">{person.name}</td>
                  <td className="py-3">{person.conversions}</td>
                  <td className="py-3">{person.referrals}</td>
                  <td className="py-3">{person.successRate}</td>
                  <td className="py-3">{person.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Top metric card with icon
const MetricCard = ({ label, value, change, icon, negative = false, bgColor }) => (
  <div className={`${bgColor} rounded-lg p-4 shadow-sm border border-gray-100`}>
    <div className="flex justify-between mb-2">
      <p className="text-sm text-gray-500">{label}</p>
      {icon}
    </div>
    <h2 className="text-xl font-medium text-gray-900">{value}</h2>
    {change && (
      <p className={`text-xs ${negative ? 'text-red-500' : 'text-green-500'} font-medium`}>
        {change} vs last month
      </p>
    )}
  </div>
);

// Stat card with doughnut chart
const PieStatCard = ({ label, value, color, helpIcon }) => {
  const chartData = {
    labels: [],
    datasets: [
      {
        data: [parseInt(value), 100 - parseInt(value)],
        backgroundColor: [color, "#E5E7EB"],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    cutout: '75%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180 * 2
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-500">{label}</p>
        {helpIcon && (
          <span className="text-gray-400 cursor-help">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="h-20 w-20 relative">
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-medium text-gray-900">{value}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;