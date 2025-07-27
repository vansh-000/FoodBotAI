import { useState } from "react";
import { Users, Plus, List, Brain, UserPlus, MessageSquare, BarChart3 } from "lucide-react";
import LeadList from "./components/LeadList";
import LeadForm from "./components/LeadForm";
import ConversationParser from "./components/ConversationParser";

const Dashboard = () => (
  <div className="p-6">
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to FoodBot CRM 👋</h3>
      <p className="text-gray-600">
        This is your smart assistant for managing leads, tracking conversations, and streamlining your CRM workflow.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
        <h4 className="font-semibold text-gray-900 mb-3">🚀 Quick Actions</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-center gap-2"><Plus className="w-4 h-4" /> Create new leads</li>
          <li className="flex items-center gap-2"><List className="w-4 h-4" /> View and manage all leads</li>
          <li className="flex items-center gap-2"><Brain className="w-4 h-4" /> Analyze chats using AI</li>
        </ul>
      </div>

      <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
        <h4 className="font-semibold text-gray-900 mb-3">📌 How to Get Started</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• Start by importing or creating leads</li>
          <li>• Use the conversation parser to extract key details</li>
          <li>• Update lead status as they progress</li>
        </ul>
      </div>
    </div>
  </div>
);
function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      component: Dashboard,
      description: "Overview and analytics"
    },
    {
      id: "leads",
      label: "All Leads",
      icon: Users,
      component: LeadList,
      description: "View and manage leads"
    },
    {
      id: "create",
      label: "Create Lead",
      icon: UserPlus,
      component: LeadForm,
      description: "Add new prospects"
    },
    {
      id: "parser",
      label: "AI Parser",
      icon: MessageSquare,
      component: ConversationParser,
      description: "Analyze conversations"
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Dashboard;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                📋 FoodBot CRM Portal
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Welcome back, Admin
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-4 px-2">Navigation</h2>
              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-3 text-left rounded-lg transition-all duration-200 ${activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? "text-blue-600" : "text-gray-400"
                        }`} />
                      <div className="flex-1">
                        <div className="font-medium">{tab.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {tab.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center">
                  {(() => {
                    const currentTab = tabs.find(tab => tab.id === activeTab);
                    const Icon = currentTab?.icon || BarChart3;
                    return (
                      <>
                        <Icon className="w-6 h-6 text-gray-600 mr-3" />
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">
                            {currentTab?.label || "Dashboard"}
                          </h2>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {currentTab?.description || "Overview and analytics"}
                          </p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
              <div className="p-6">
                <ActiveComponent />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;