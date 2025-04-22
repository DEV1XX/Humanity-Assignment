import React, { useState } from "react";
import { RefreshCw, CornerUpRight, Send, Share2, Users, BarChart, ArrowRight } from "lucide-react";

const AiAgent = () => {
  const [inputValue, setInputValue] = useState("");
  // User profile photo URL - replace with actual URL in production
  const userProfilePhoto = "https://i.pravatar.cc/40"; // Placeholder image
  
  // Initialize conversation with the existing messages
  const [conversation, setConversation] = useState([
    {
      type: "agent",
      message: "Welcome Back, Kadin! How can I help you today?"
    },
    {
      type: "user",
      message: "Hey, I want to create a new referral campaign. But I'd like some help from AI to make sure it's set up correctly and performs well. Can you guide me through it?"
    },
    {
      type: "agent",
      message: "Absolutely! I'll help you create a high-converting referral campaign step by step. Let's start by defining your main objective. What's the primary goal of this campaign?"
    },
    {
      type: "user",
      message: "My main goal is to increase sales through referrals. I want existing customers to bring in new paying customers, and I'd like to reward them for it."
    },
    {
      type: "agent",
      message: "That's a great goal! Referral campaigns work best when there's a strong incentive. What kind of reward would you like to offer referrers?"
    },
    {
      type: "user",
      message: "Discount on next purchase"
    },
    {
      type: "agent",
      message: "Smart choice! Discounts are a great way to encourage both referrals and repeat purchases. How much discount would you like to offer per successful referral?"
    },
    {
      type: "user",
      message: "15%"
    },
    {
      type: "agent",
      message: "15% sounds like a strong incentive! Now, let's define when a referral is considered valid. When should the referrer receive their reward?"
    },
    {
      type: "user",
      message: "When the referred person signs up"
    },
    {
      type: "agent",
      message: "That's a great way to ensure that your campaign drives real revenue! Now, how long do you want this referral campaign to run?"
    },
    {
      type: "user",
      message: "I want to test this campaign for a while before making any long-term decisions, so I think 3 months would be ideal. If it works well, I can always extend it later."
    },
    {
      type: "agent",
      message: "Got it! Here's a quick summary of your campaign:",
      summary: {
        goal: "Increase sales",
        reward: "15% discount on the next purchase",
        condition: "Reward is given when the referred person makes a purchase",
        duration: "3 months"
      }
    }
  ]);

  // Simulate AI response (in a real application, this would be an API call)
  const generateAgentResponse = (userMessage) => {
    // For demonstration purposes, simple automatic reply
    return {
      type: "agent",
      message: `I've received your message: "${userMessage}". How can I further assist with your referral campaign?`
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Add user message to conversation
      const userMessage = {
        type: "user",
        message: inputValue
      };
      
      // Update conversation with user message
      setConversation([...conversation, userMessage]);
      
      // Clear input field
      setInputValue("");
      
      // Simulate agent response (with a slight delay to feel more natural)
      setTimeout(() => {
        const agentResponse = generateAgentResponse(inputValue);
        setConversation(prevConversation => [...prevConversation, agentResponse]);
      }, 500);
    }
  };

  const quickLinks = [
    { label: "SEND REFERRAL", icon: <Share2 size={16} /> },
    { label: "CREATE CAMPAIGN", icon: <BarChart size={16} /> },
    { label: "FOLLOW-UP", icon: <CornerUpRight size={16} /> },
    { label: "VIEW REFERRAL", icon: <Users size={16} /> }
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 md:mr-3 shadow-md">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-600"></div>
          </div>
          <h1 className="text-base md:text-lg font-medium text-gray-800">AI Agent</h1>
        </div>
        <button 
          className="flex items-center text-gray-500 hover:text-gray-700 text-sm md:text-base"
          onClick={() => setConversation(conversation.slice(0, 1))} // Reset conversation to just the welcome message
        >
          <RefreshCw size={16} className="mr-1" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Chat Container */}
      <div className="flex-grow overflow-y-auto px-3 md:px-6 py-3 md:py-4 bg-white" id="chat-container">
        {conversation.map((item, index) => (
          <div key={index} className="mb-4 md:mb-6">
            {item.type === "agent" ? (
              <div className="flex mb-1">
                <div className="mt-1 w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0 shadow-md">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-600"></div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 rounded-lg p-3 md:p-4 max-w-full md:max-w-3xl shadow-sm">
                  <p className="text-xs md:text-sm text-gray-800">{item.message}</p>
                  
                  {/* Summary Box */}
                  {item.summary && (
                    <div className="mt-3 bg-white rounded-lg p-3 md:p-4 shadow-sm">
                      <ul className="text-xs md:text-sm space-y-2">
                        <li className="flex flex-wrap">
                          <span className="text-blue-600 font-medium mr-2">Goal:</span>
                          <span>{item.summary.goal}</span>
                        </li>
                        <li className="flex flex-wrap">
                          <span className="text-blue-600 font-medium mr-2">Reward:</span>
                          <span>{item.summary.reward}</span>
                        </li>
                        <li className="flex flex-wrap">
                          <span className="text-blue-600 font-medium mr-2">Condition:</span>
                          <span>{item.summary.condition}</span>
                        </li>
                        <li className="flex flex-wrap">
                          <span className="text-blue-600 font-medium mr-2">Duration:</span>
                          <span>{item.summary.duration}</span>
                        </li>
                      </ul>
                      <div className="flex gap-2 md:gap-4 mt-3 md:mt-4">
                        <button className="bg-blue-50 text-blue-600 rounded py-1 md:py-2 text-xs md:text-sm flex-1 text-center hover:bg-blue-100 transition-colors">
                          Edit
                        </button>
                        <button className="bg-blue-600 text-white rounded py-1 md:py-2 text-xs md:text-sm flex-1 text-center hover:bg-blue-700 transition-colors">
                          Launch
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-end mb-1">
                <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 rounded-lg p-3 md:p-4 max-w-full md:max-w-3xl shadow-sm">
                  <p className="text-xs md:text-sm text-gray-800">{item.message}</p>
                </div>
                <div className="ml-2 mt-1 w-7 h-7 md:w-8 md:h-8 overflow-hidden rounded-full flex-shrink-0 shadow-md">
                  {/* User profile photo */}
                  <img 
                    src={userProfilePhoto} 
                    alt="Kadin" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-white border-t border-gray-100 px-3 md:px-6 py-3 md:py-4">
        <h3 className="text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3">Quick Links</h3>
        <div className="flex gap-2 md:gap-3 mb-3 md:mb-4 overflow-x-auto pb-1">
          {quickLinks.map((link, index) => (
            <button 
              key={index}
              className="border border-gray-200 rounded py-1 md:py-2 px-3 md:px-4 text-xs text-gray-600 hover:bg-gray-50 flex items-center whitespace-nowrap shadow-sm hover:shadow"
            >
              <span className="mr-1 md:mr-2 text-blue-600">{link.icon}</span>
              {link.label}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="flex">
          <div className="flex-grow relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full border border-gray-200 rounded-lg py-2 px-3 md:px-4 pr-8 md:pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-xs md:text-sm"
            />
          </div>
          <button 
            type="submit" 
            className="ml-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-colors shadow-sm"
          >
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiAgent;