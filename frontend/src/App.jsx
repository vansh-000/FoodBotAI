import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";
import ConversationParser from "./components/ConversationParser";

function App() {
  return (
    <main className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">📋 FoodBot CRM Portal</h1>

      <section className="bg-white shadow-md p-6 rounded-xl mb-8 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Create a Lead</h2>
        <LeadForm />
      </section>

      <section className="bg-white shadow-md p-6 rounded-xl mb-8 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">All Leads</h2>
        <LeadList />
      </section>

      <section className="bg-white shadow-md p-6 rounded-xl mb-8 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Parse Conversation (AI Agent)</h2>
        <ConversationParser />
      </section>
    </main>
  );
}

export default App;
