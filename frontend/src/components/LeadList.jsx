import { useEffect, useState } from "react";
import axios from "axios";

export default function LeadList() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const res = await axios.post("http://localhost:3001/mcp/execute", {
      command: "getAllLeads",
    });
    setLeads(res.data.result);
  };

  const deleteLead = async (id) => {
    if (!confirm("Are you sure?")) return;
    await axios.post("http://localhost:3001/mcp/execute", {
      command: "deleteLead",
      data: { id },
    });
    fetchLeads();
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div>
      <h2>All Leads</h2>
      <ul>
        {leads.map((lead) => (
          <li key={lead.id}>
            <strong>{lead.name}</strong> - {lead.source} - {lead.status}
            <br />
            {lead.contact?.email} | {lead.contact?.phone}
            <br />
            <button onClick={() => deleteLead(lead.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
