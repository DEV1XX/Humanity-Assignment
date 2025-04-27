import { useState } from 'react';
import { Eye, MessageSquare } from 'lucide-react';

const Leads = () => {
  const [leads, setLeads] = useState([
    { 
      id: 1, 
      name: 'Emery Dokidis', 
      email: 'emerydokidi@gmail.com',
      contact: '+979970174715', 
      couponCode: 'SAVE10NOW', 
      status: 'Pending',
      selected: true 
    },
    { 
      id: 2, 
      name: 'Kadin Lipshutz', 
      email: 'kadinlipshutz@gmail.com',
      contact: '+971501948279', 
      couponCode: 'WELCOME15', 
      status: 'Pending',
      selected: true 
    },
    { 
      id: 3, 
      name: 'Randy Culhane', 
      email: 'randyculhane@gmail.com',
      contact: '+971501598978', 
      couponCode: 'EXCLUSIVE20', 
      status: 'Pending',
      selected: false 
    },
    { 
      id: 4, 
      name: 'Jaxson Vaccaro', 
      email: 'jaxsonvaccaro@gmail.com',
      contact: '+971522503635', 
      couponCode: 'GETDEAL25', 
      status: 'Completed',
      selected: false 
    },
    { 
      id: 5, 
      name: 'Jocelyn Levin', 
      email: 'jocelynlevin@gmail.com',
      contact: '+971554315300', 
      couponCode: 'FIRSTORDER10', 
      status: 'Pending',
      selected: false 
    },
    { 
      id: 6, 
      name: 'Maren Septimus', 
      email: 'marenseptimus@gmail.com',
      contact: '+971525620832', 
      couponCode: 'SPECIALSAVE15', 
      status: 'Completed',
      selected: false 
    },
    { 
      id: 7, 
      name: 'Haylie Saris', 
      email: 'hayliesaris@gmail.com',
      contact: '+971503328228', 
      couponCode: 'LIMITED20', 
      status: 'Completed',
      selected: false 
    },
    { 
      id: 8, 
      name: 'Randy Herwitz', 
      email: 'randyherwitz@gmail.com',
      contact: '+971554231522', 
      couponCode: 'TRYUS10', 
      status: 'Pending',
      selected: false 
    },
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const updatedSelectAll = !selectAll;
    setSelectAll(updatedSelectAll);
    
    setLeads(leads.map(lead => ({
      ...lead,
      selected: updatedSelectAll
    })));
  };

  const handleSelectLead = (id) => {
    const updatedLeads = leads.map(lead => 
      lead.id === id ? { ...lead, selected: !lead.selected } : lead
    );
    
    setLeads(updatedLeads);
    setSelectAll(updatedLeads.every(lead => lead.selected));
  };

  const getStatusClass = (status) => {
    return status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-400';
  };

  return (
    <div className="max-w-7xl mx-auto p-4 ml-8 mt-5 mr-8 font-sans bg-white shadow-md rounded-lg">
      
      
      <div className="flex justify-between mb-4">
      <h1 className="text-xl font-semibold mb-4">Leads</h1>
        <div className="relative w-99 ml-108">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input 
            type="search" 
            placeholder="Search" 
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none bg-gray-100 focus:border-blue-500"
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium">
              Change Status
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
          
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
            </svg>
            Filter
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Lead Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Contact No.</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Coupon Code</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={lead.selected}
                    onChange={() => handleSelectLead(lead.id)}
                  />
                </td>
                <td className="px-4 py-3 text-sm">{lead.name}</td>
                <td className="px-4 py-3 text-sm">{lead.email}</td>
                <td className="px-4 py-3 text-sm">{lead.contact}</td>
                <td className="px-4 py-3 text-sm">{lead.couponCode}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusClass(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Eye size={18} className="text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MessageSquare size={18} className="text-gray-600" />
                  </button>
                  {lead.id === 1 && (
                    <div className="px-2 py-1 bg-gray-800 text-white text-xs rounded">
                      View Profile
                    </div>
                  )}
                  {lead.id === 2 && (
                    <div className="px-2 py-1 bg-gray-800 text-white text-xs rounded">
                      Send follow-up message
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;