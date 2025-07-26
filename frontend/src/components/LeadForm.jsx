import { useState } from "react";
import axios from "axios";

export default function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    source: "",
    email: "",
    phone: "",
    interestedProducts: "",
    status: "New",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      command: "createLead",
      data: {
        name: form.name,
        source: form.source,
        contact: {
          email: form.email,
          phone: form.phone,
        },
        interestedProducts: form.interestedProducts.split(",").map((p) => p.trim()),
        status: form.status,
        notes: form.notes,
      },
    };

    await axios.post("http://localhost:3001/mcp/execute", data);
    alert("Lead created successfully");
    setForm({
      name: "",
      source: "",
      email: "",
      phone: "",
      interestedProducts: "",
      status: "New",
      notes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="source" placeholder="Source" value={form.source} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <input
        name="interestedProducts"
        placeholder="Interested Products (comma separated)"
        value={form.interestedProducts}
        onChange={handleChange}
      />
      <input name="status" placeholder="Status" value={form.status} onChange={handleChange} />
      <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
      <button type="submit">Create Lead</button>
    </form>
  );
}