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
      message: "Hey, I want to create a new referral campaign, but I'd like some help from AI to make sure it's set up correctly and performs well. Can you guide me through it?"
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

  // AI Agent SVG Icon Component
  const AgentIcon = () => (
    <svg width="40" height="40" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_2_36682)">
        <circle cx="26" cy="23" r="20" fill="white"/>
      </g>
      <g clipPath="url(#clip0_2_36682)">
        <path d="M30.2383 18.7625C32.582 21.1063 32.582 24.9031 30.2383 27.2469C29.0664 28.4188 29.0664 30.3219 30.2383 31.4844C31.4102 32.6562 33.3133 32.6562 34.4852 31.4844C39.1727 26.7969 39.1727 19.2031 34.4852 14.5156L30.2383 18.7625Z" fill="#7CA5E4"/>
        <path d="M34.475 14.5156C29.7875 9.82812 22.2031 9.82812 17.5156 14.5156C12.8281 19.2031 12.8281 26.7969 17.5156 31.4844L21.7625 27.2469C19.4188 24.9031 19.4188 21.1063 21.7625 18.7625C24.1063 16.4188 27.9031 16.4188 30.2469 18.7625C31.4188 19.9344 33.3219 19.9344 34.4938 18.7625C35.6469 17.5906 35.6469 15.6875 34.475 14.5156Z" fill="#305AFF"/>
        <path d="M34.4742 31.4846L30.2273 27.2471C27.8836 29.5908 24.0867 29.5908 21.743 27.2471L17.4961 31.4846C22.2023 36.1721 29.7867 36.1721 34.4742 31.4846Z" fill="#B5D2FF"/>
        <path d="M30.2383 27.2471C31.4102 26.0752 33.3039 26.0752 34.4758 27.2471C35.6477 28.4189 35.6477 30.3221 34.4758 31.4939C33.3039 32.6658 31.4102 32.6658 30.2383 31.4939C29.0664 30.3221 29.0664 28.4189 30.2383 27.2471Z" fill="#7CA5E4"/>
        <path d="M17.5156 27.2468C18.6875 26.075 20.5812 26.075 21.7531 27.2468C22.925 28.4187 22.925 30.3218 21.7531 31.4937C20.5812 32.6656 18.6875 32.6656 17.5156 31.4937C16.3438 30.3218 16.3438 28.4187 17.5156 27.2468Z" fill="#B5D2FF"/>
      </g>
      <defs>
        <filter id="filter0_d_2_36682" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="3"/>
          <feGaussianBlur stdDeviation="3"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_36682"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_36682" result="shape"/>
        </filter>
        <clipPath id="clip0_2_36682">
          <rect width="24" height="24" fill="white" transform="translate(14 11)"/>
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-white border-b border-gray-100">
        <div className="flex items-center">
          {/* Updated AI Agent logo with the provided SVG */}
          <div className="mr-3 flex-shrink-0">
            <AgentIcon />
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
                {/* Updated AI Agent profile icon for messages */}
                <div className="mt-1 mr-2 flex-shrink-0" style={{ width: "32px", height: "32px" }}>
                  <AgentIcon />
                </div>
                {/* Updated gradient based on Figma design with exact hex values */}
                <div 
                  className="rounded-lg p-3 md:p-4 max-w-full md:max-w-3xl shadow-sm"
                  style={{
                    background: "linear-gradient(to right, #F6F8FF, #E8F1FE)"
                  }}
                >
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
                {/* Updated gradient for user messages based on Figma with exact hex values */}
                <div 
                  className="rounded-lg p-3 md:p-4 max-w-full md:max-w-3xl shadow-sm"
                  style={{
                    background: "linear-gradient(to right, #F8F9FA, #EBEDF0)"
                  }}
                >
                  <p className="text-xs md:text-sm text-gray-800">{item.message}</p>
                </div>
                <div className="ml-2 mt-1 w-7 h-7 md:w-8 md:h-8 overflow-hidden rounded-full flex-shrink-0 shadow-sm">
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
        <div className="flex gap-2 md:gap-3 mb-3 md:mb-4 overflow-x-auto pb-1 pl-5 pr-5 justify-evenly">
          {quickLinks.map((link, index) => (
            <button 
              key={index}
              className="border border-blue-500 w-full ml-5 mr-5 border-[2px] rounded-lg py-1 md:py-2 px-3 md:px-4 text-xs text-gray-600 hover:bg-gray-50 flex items-center whitespace-nowrap shadow-sm hover:shadow"
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