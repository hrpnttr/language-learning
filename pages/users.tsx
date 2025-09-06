import { useEffect, useState } from "react";
import { UsersAPI } from "../lib/users";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

interface User {
  id: string;
  email: string;
  name: string;
  level: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ email: "", name: "", level: "beginner" });
  const [error, setError] = useState("");

  useEffect(() => {
    UsersAPI.list()
      .then(setUsers)
      .catch((e) => setError(e.message));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const u = await UsersAPI.create(form);
      setUsers((prev) => [...prev, u]);
      setForm({ email: "", name: "", level: "beginner" });
    } catch (e: unknown) {
      //   setError(e.message);
      if (e instanceof Error) {
        setError(e.message);
      } else if (typeof e === "string") {
        setError(e);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div>
      <Nav />
      <div
        style={{ maxWidth: 560, margin: "2rem auto", color: "black" }}
        className="w-[80%] mx-auto pt-20 pb-12"
      >
        <h2>Users</h2>
        {error && <div style={{ color: "red" }}>{error}</div>}

        <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <select
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value })}
          >
            <option>beginner</option>
            <option>intermediate</option>
            <option>advanced</option>
          </select>
          <button type="submit">Create</button>
        </form>

        <pre>{JSON.stringify(users, null, 2)}</pre>
      </div>
      <Footer />
    </div>
  );
}
