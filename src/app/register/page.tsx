"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await axios.post("/api/auth/register", { email, password });
      router.push("/login");
    } catch (e) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1>Register</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-3"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-3"
      />
      <button
        className="bg-blue-500 rounded-lg px-5 py-2.5 text-white"
        onClick={handleRegister}
      >
        Register
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Link className='underline text-blue-600 self-center mt-1' href='/login'>have a account click here to sign in</Link>
    </div>
  );
};

export default Register;
