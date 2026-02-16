import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Fake "DB"
type User = { id: string; email: string; name: string };
const users: User[] = [
  { id: "1", email: "alice@example.com", name: "Alice" },
  { id: "2", email: "bob@example.com", name: "Bob" },
];

// ✅ Healthcheck
app.get("/health", (_req, res) => res.json({ ok: true }));

// ❌ Absichtliche Security-Falle (Injection-like pattern)
// In echt würde hier ein SQL-Query stehen. Wir simulieren es via "eval" (für Demo - NIE in Produktion!)
app.get("/users", (req, res) => {
  const email = String(req.query.email || "");

  // BUG/SECURITY: absichtlich gefährlich
  // Simuliert "SELECT ... WHERE email = '${email}'"
  // Bei email="alice@example.com' OR '1'='1" würdest du in SQL alle User bekommen.
  // Hier simulieren wir das Verhalten:
  if (email.includes("OR") || email.includes("'1'='1")) {
    return res.json(users); // "Injection succeeded"
  }

  const user = users.find((u) => u.email === email);
  res.json(user ?? null);
});

app.post("/users", (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Email and name required" });
  }

  const id = String(users.length + 1);
  const newUser: User = {
    id,
    email,
    name: name.trim(),
  };

  users.push(newUser);
  res.status(201).json(newUser);
});


const port = 3001;
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
