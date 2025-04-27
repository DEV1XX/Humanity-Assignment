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

  // Create specific gradient for doughnut charts - match the requested gradient
  const createSpecificGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 150, 0);
    gradient.addColorStop(0, 'rgba(48, 90, 255, 0.8)');
    gradient.addColorStop(1, '#B5D2FF');
    return gradient;
  };
  
  // Create gradients for conversion chart with the specific gradient requested
  const createConversionGradients = (ctx) => {
    const gradient1 = ctx.createLinearGradient(0, 0, 150, 0);
    gradient1.addColorStop(0, 'rgba(48, 90, 255, 0.8)');
    gradient1.addColorStop(1, '#B5D2FF');
    
    const gradient2 = ctx.createLinearGradient(0, 0, 150, 0);
    gradient2.addColorStop(0, "#E2E8FF");
    gradient2.addColorStop(1, "#EDF2FF");
    
    return [gradient1, gradient2];
  };

  const doughnutChartData = {
    labels: data.conversionSuccess.labels,
    datasets: [
      {
        data: data.conversionSuccess.data,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx } = chart;
          return createConversionGradients(ctx);
        },
        borderWidth: 0,
        cutout: '50%', // Decreased cutout to make the chart thicker
        borderRadius: 8 // Add rounded corners
      }
    ]
  };

  // Updated doughnut options with thicker chart
  const doughnutOptions = {
    plugins: {
      legend: {
        display: false,
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 6,
          font: {
            size: 10
          },
          padding: 15
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
    cutout: '50%', // Thicker chart (was 60% in original)
    maintainAspectRatio: false,
    layout: {
      padding: 0
    },
    elements: {
      arc: {
        borderWidth: 0,
        borderRadius: 10
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen ">

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 bg-white p-2  rounded-lg  gap-4 mb-6">
        <MetricCard 
          label="Total Promoters" 
          value={data.metrics.totalPromoters.count.toLocaleString()} 
          change={data.metrics.totalPromoters.change} 
          icon={
<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25" cy="25" r="25" fill="#E0E3DD"/>
<path d="M30 34V32C30 30.9391 29.5786 29.9217 28.8284 29.1716C28.0783 28.4214 27.0609 28 26 28H18C16.9391 28 15.9217 28.4214 15.1716 29.1716C14.4214 29.9217 14 30.9391 14 32V34" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 24C24.2091 24 26 22.2091 26 20C26 17.7909 24.2091 16 22 16C19.7909 16 18 17.7909 18 20C18 22.2091 19.7909 24 22 24Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M36 33.9999V31.9999C35.9993 31.1136 35.7044 30.2527 35.1614 29.5522C34.6184 28.8517 33.8581 28.3515 33 28.1299" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M29 16.1299C29.8604 16.3502 30.623 16.8506 31.1676 17.5522C31.7122 18.2538 32.0078 19.1167 32.0078 20.0049C32.0078 20.8931 31.7122 21.756 31.1676 22.4576C30.623 23.1592 29.8604 23.6596 29 23.8799" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            }
        />
        <MetricCard 
          label="Conversion rate" 
          value={data.metrics.conversionRate.value} 
          change={data.metrics.conversionRate.change} 
          negative={true} 
          icon={
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25" cy="25" r="25" fill="#FFD2BF"/>
<path d="M30.5028 17.4981L17.4988 30.5031C17.2341 30.7677 17.0854 31.1267 17.0854 31.5011C17.0854 31.8754 17.2341 32.2344 17.4988 32.4991C17.7635 32.7637 18.1225 32.9124 18.4968 32.9124C18.8712 32.9124 19.2301 32.7637 19.4948 32.4991L32.4988 19.4951C32.7553 19.2287 32.897 18.8723 32.8936 18.5025C32.8901 18.1328 32.7417 17.7791 32.4803 17.5176C32.2189 17.256 31.8653 17.1075 31.4956 17.1038C31.1258 17.1002 30.7694 17.2417 30.5028 17.4981ZM20.0018 18.0001C19.7392 17.9998 19.4791 18.0513 19.2363 18.1515C18.9936 18.2518 18.7729 18.3989 18.587 18.5844C18.4011 18.77 18.2536 18.9903 18.1528 19.2328C18.0521 19.4754 18.0001 19.7354 17.9998 19.9981C17.9996 20.2607 18.051 20.5208 18.1513 20.7636C18.2516 21.0063 18.3987 21.227 18.5842 21.4129C18.7697 21.5988 18.9901 21.7463 19.2326 21.8471C19.4752 21.9478 19.7352 21.9998 19.9978 22.0001C20.5283 22.0006 21.0372 21.7904 21.4126 21.4157C21.7881 21.041 21.9993 20.5325 21.9998 20.0021C22.0004 19.4716 21.7902 18.9627 21.4155 18.5873C21.0408 18.2118 20.5323 18.0006 20.0018 18.0001ZM30.0018 28.0001C29.4714 27.9995 28.9625 28.2097 28.587 28.5844C28.2116 28.9591 28.0004 29.4676 27.9998 29.9981C27.9993 30.5285 28.2095 31.0374 28.5842 31.4129C28.9589 31.7883 29.4674 31.9995 29.9978 32.0001C30.2605 32.0003 30.5206 31.9488 30.7634 31.8486C31.0061 31.7483 31.2267 31.6012 31.4126 31.4157C31.5985 31.2302 31.7461 31.0098 31.8468 30.7673C31.9476 30.5247 31.9996 30.2647 31.9998 30.0021C32.0001 29.7394 31.9486 29.4793 31.8484 29.2365C31.7481 28.9938 31.601 28.7732 31.4155 28.5873C31.2299 28.4014 31.0096 28.2538 30.767 28.1531C30.5245 28.0523 30.2645 28.0003 30.0018 28.0001Z" fill="black"/>
</svg>
          }
        />
        <MetricCard 
          label="Revenue Generated" 
          value={data.metrics.revenueGenerated.amount} 
          change={data.metrics.revenueGenerated.change} 
          icon={
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25" cy="25" r="25" fill="#FFC9E1"/>
<path d="M34.75 19H15.25C14.8358 19 14.5 19.3358 14.5 19.75V30.25C14.5 30.6642 14.8358 31 15.25 31H34.75C35.1642 31 35.5 30.6642 35.5 30.25V19.75C35.5 19.3358 35.1642 19 34.75 19Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25 28C26.6569 28 28 26.6569 28 25C28 23.3431 26.6569 22 25 22C23.3431 22 22 23.3431 22 25C22 26.6569 23.3431 28 25 28Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M29.5 19L35.5 24.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M29.5 31L35.5 25.75" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.5 19L14.5 24.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.5 31L14.5 25.75" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
          }
        />
        <MetricCard 
          label="Active Campaigns" 
          value={data.metrics.activeCampaigns} 
          icon={
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="25" fill="#D8F1FF"/>
            <path d="M30 17H20C18.8954 17 18 17.8954 18 19V32C18 33.1046 18.8954 34 20 34H30C31.1046 34 32 33.1046 32 32V19C32 17.8954 31.1046 17 30 17Z" stroke="black" stroke-width="1.5"/>
            <path d="M22 22H28M22 26H28M22 30H26" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
            </svg>                      
          }
        />
      </div>

      {/* Stat Cards with Pie */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <PieStatCard
          label="Repeat Referral Rate"
          value={data.referralStats.repeatRate}
          color1="#28C76F"
          color2="#28C76F"
          bgColor="bg-green-50"
          helpIcon={true}
        />
        <PieStatCard
          label="Referral Engagement Rate"
          value={data.referralStats.engagementRate}
          color1="#F98272"
          color2="#F98272"
          bgColor="bg-red-50"
          helpIcon={true}
        />
        <PieStatCard
          label="Churn Rate of Leads"
          value={data.referralStats.churnRate}
          color1="#4B91FF"
          color2="#4B91FF"
          bgColor="bg-blue-50"
          helpIcon={true}
        />
        <PieStatCard
          label="Upsell Rate of Leads"
          value={data.referralStats.upsellRate}
          color1="#B113C0"
          color2="#B113C0"
          bgColor="bg-purple-50"
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
              <div className="h-48 w-64 flex-shrink-0">
                <Doughnut data={doughnutChartData} options={doughnutOptions} />
              </div>
              <div className="flex flex-col ml-4">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                  <span className="text-sm text-gray-600">Referrals sent 57%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-100 mr-2"></div>
                  <span className="text-sm text-gray-600">Converted 43%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4">Top Performing Channel</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-red-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Facebook</p>
                <p className="font-medium text-lg">78%</p>
              </div>
              <div className="bg-pink-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">Twitter</p>
                <p className="font-medium text-lg">45%</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500">LinkedIn</p>
                <p className="font-medium text-lg">23%</p>
              </div>
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
              <tr className="text-left text-sm text-gray-900">
                <th className="py-2 font-medium">Activities</th>
                <th className="py-2 font-medium">Date</th>
                <th className="py-2 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.recentActivities.map((item, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2 text-gray-500">{item.activity}</td>
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
              <tr className="text-left text-sm text-gray-900 border-b">
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
                  <td className="py-3 text-gray-500">{person.rank}</td>
                  <td className="py-3 text-gray-500">{person.name}</td>
                  <td className="py-3 text-gray-500">{person.conversions}</td>
                  <td className="py-3 text-gray-500">{person.referrals}</td>
                  <td className="py-3 text-gray-500">{person.successRate}</td>
                  <td className="py-3 text-gray-500">{person.revenue}</td>
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
  <div className={`${bgColor}  rounded-sm p-4 flex bg-white border-r-2 border-r-gray-200`}>
    <div className="flex justify-between mb-2 mt-5">
      {icon}
    </div>
    <div className="flex flex-col ml-9">
     <p className="text-md font-semibold text-gray-400">{label}</p>
     <h2 className="text-xl font-medium text-gray-900">{value}</h2>
     {change && (
      <p className={`text-xs ${negative ? 'text-red-500' : 'text-green-500'} font-medium`}>
        {change} vs last month
      </p>
    )}
    </div>
    
  </div>
);

// Updated Stat card with thicker doughnut chart and specific gradient
const PieStatCard = ({ label, value, color1, color2, bgColor, helpIcon }) => {
  const chartData = {
    labels: [],
    datasets: [
      {
        data: [parseInt(value), 100 - parseInt(value)],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx } = chart;
          
          // Create gradient with exact colors requested
          const activeGradient = ctx.createLinearGradient(0, 0, 150, 0);
          activeGradient.addColorStop(0, color1);
          activeGradient.addColorStop(1, color2);
          
          // Create light gradient for inactive segment
          const inactiveGradient = ctx.createLinearGradient(0, 0, 150, 0);
          inactiveGradient.addColorStop(0, "#E5E7EB");
          inactiveGradient.addColorStop(1, "#F3F4F6");
          
          return [activeGradient, inactiveGradient];
        },
        borderWidth: 5,
        borderRadius: 3
      }
    ]
  };

  // Updated chart options with thicker chart
  const chartOptions = {
    cutout: '65%', // Increased from 75% to make chart thicker
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
    <div className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100`}>
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