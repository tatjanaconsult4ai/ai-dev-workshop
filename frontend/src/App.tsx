import { useMemo, useState } from "react";

type User = { id: string; email: string; name: string };

export default function App() {
  const [email, setEmail] = useState("alice@example.com");
  const [result, setResult] = useState<User | User[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiBase = "http://localhost:3001";

  async function fetchUser() {
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${apiBase}/users?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    }
  }

  const pretty = useMemo(() => JSON.stringify(result, null, 2), [result]);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24, maxWidth: 900 }}>
      <h1>AI Dev Demo (React + Node/TS)</h1>
      <p>
        Demo-Ziele: Debugging, Security, Refactoring, Doku, KI-Prompts.
      </p>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email..."
          style={{ padding: 10, width: 360 }}
        />
        <button onClick={fetchUser} style={{ padding: "10px 14px" }}>
          Fetch user
        </button>
      </div>

      <p style={{ marginTop: 10, color: "#666" }}>
        Try: <code>alice@example.com&apos; OR &apos;1&apos;=&apos;1</code>
      </p>

      {error && <pre style={{ color: "crimson" }}>{error}</pre>}

      <h3>API result</h3>
      <pre style={{ background: "#f6f6f6", padding: 12, borderRadius: 8 }}>
        {pretty}
      </pre>

      <hr style={{ margin: "24px 0" }} />

      <h2>⚠️ XSS Demo (absichtlich unsicher)</h2>
      <p>
        Unten wird HTML direkt gerendert (DON&apos;T DO THIS). Das ist ein klassischer
        Use Case für KI: „find security issue“.
      </p>

      <UnsafeHtml html={`<b>Hello</b> from <i>unsafe</i> HTML. Try: <img src=x onerror="alert('XSS')">`} />
    </div>
  );
}

function UnsafeHtml({ html }: { html: string }) {
  // Absichtlich unsicher:
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
