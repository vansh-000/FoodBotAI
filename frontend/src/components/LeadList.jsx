import { useEffect, useState } from "react";
import { Trash2, Mail, Phone, User, Tag, Activity, Search, RefreshCw } from "lucide-react";
import axios from "axios";

export default function LeadList() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterstats, setFilterstats] = useState("all");
  const [error, setError] = useState(null);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:3001/mcp/execute", {
        command: "getAllLeads",
      });
      setLeads(res.data.result || []);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      setError("Failed to fetch leads. Please try again.");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    
    try {
      await axios.post("http://localhost:3001/mcp/execute", {
        command: "deleteLead",
        data: { id },
      });
      // Remove the lead from local state after successful deletion
      setLeads(leads.filter(lead => lead.id !== id));
    } catch (error) {
      console.error("Failed to delete lead:", error);
      alert("Failed to delete lead. Please try again.");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const getstatsColor = (stats) => {
    const colors = {
      new: "bg-blue-100 text-blue-800 border-blue-200",
      contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
      qualified: "bg-green-100 text-green-800 border-green-200",
      unqualified: "bg-red-100 text-red-800 border-red-200",
      converted: "bg-purple-100 text-purple-800 border-purple-200"
    };
    return colors[stats] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contact?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesstats = filterstats === "all" || lead.stats === filterstats;
    return matchesSearch && matchesstats;
  });

  const statsOptions = ["all", "new", "contacted", "qualified", "unqualified", "converted"];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-lg text-gray-600">Loading leads...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-600 mb-4">
          <User className="w-12 h-12 mx-auto mb-2" />
          <p className="text-lg font-medium">Error Loading Leads</p>
        </div>
        <p className="text-gray-600 mb-4 text-center">{error}</p>
        <button
          onClick={fetchLeads}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <button
            onClick={fetchLeads}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <User className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{leads.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leads Grid */}
      {filteredLeads.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
          <p className="text-gray-600">
            {searchTerm || filterstats !== "all" 
              ? "Try adjusting your search or filters" 
              : "Get started by adding your first lead"
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{lead.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getstatsColor(lead.stats)}`}>
                      {lead.stats?.charAt(0).toUpperCase() + lead.stats?.slice(1)}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Delete lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Source */}
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Tag className="w-4 h-4 mr-2" />
                    Source: <span className="font-medium ml-1">{lead.source || 'Unknown'}</span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  {lead.contact?.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <a 
                        href={`mailto:${lead.contact.email}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline truncate"
                      >
                        {lead.contact.email}
                      </a>
                    </div>
                  )}
                  {lead.contact?.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <a 
                        href={`tel:${lead.contact.phone}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {lead.contact.phone}
                      </a>
                    </div>
                  )}
                  {(!lead.contact?.email && !lead.contact?.phone) && (
                    <div className="text-sm text-gray-500 italic">
                      No contact information available
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}