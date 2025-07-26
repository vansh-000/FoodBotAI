import { useState } from "react";
import axios from "axios";

export default function ConversationParser() {
  const [conversation, setConversation] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3001/api/ai-agent/parse-and-create", {
      conversation,
    });
    setResult(res.data.result);
    setConversation("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={6}
          placeholder="Paste conversation here..."
          value={conversation}
          onChange={(e) => setConversation(e.target.value)}
        />
        <button type="submit">Parse & Create Lead</button>
      </form>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}