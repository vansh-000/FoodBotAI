import { useState } from "react";
import { MessageSquare, Send, Loader2, CheckCircle, AlertCircle, Copy, Download } from "lucide-react";

export default function ConversationParser() {
  const [conversation, setConversation] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!conversation.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://localhost:3001/api/ai-agent/parse-and-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversation })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(`Failed to parse conversation: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lead_${result.leadId || 'result'}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Conversation Parser
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Transform conversations into structured lead data with AI-powered parsing
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Conversation Content
                </label>
                <div className="relative">
                  <textarea
                    rows={12}
                    placeholder="Paste your conversation here... 

Example:
Hi, I'm John from Tech Solutions Inc. We're looking for an enterprise software solution to help scale our infrastructure. Our current system can't handle the growing demand. Could you help us with this? My email is john.doe@example.com"
                    value={conversation}
                    onChange={(e) => setConversation(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none bg-white/50 backdrop-blur-sm placeholder-gray-400"
                    disabled={loading}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {conversation.length} characters
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !conversation.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>Parse & Create Lead</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Parsed Results</h3>
              {result && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={downloadResult}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Download JSON"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="h-80 overflow-auto">
              {loading && (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Loader2 className="w-8 h-8 animate-spin mb-3" />
                  <p>Analyzing conversation...</p>
                </div>
              )}

              {error && (
                <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {result && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-600 mb-4">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Lead created successfully!</span>
                  </div>

                  {/* Formatted Result Display */}
                  <div className="grid gap-3">
                    {Object.entries(result).map(([key, value]) => (
                      <div key={key} className="bg-white/60 p-3 rounded-lg border border-gray-100">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                        <div className="text-gray-800 font-medium">
                          {typeof value === 'string' ? value : JSON.stringify(value)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Raw JSON for reference */}
                  <details className="mt-6">
                    <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 mb-2">
                      View Raw JSON
                    </summary>
                    <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-auto border border-gray-200">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </details>
                </div>
              )}

              {!loading && !error && !result && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <MessageSquare className="w-12 h-12 mb-3" />
                  <p>Results will appear here after parsing</p>
                </div>
              )}
            </div>

            {copied && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Copied to clipboard!</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          Powered by AI • Built for efficient lead management
        </div>
      </div>
    </div>
  );
}