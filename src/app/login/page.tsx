"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/protected");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h1>Login</h1>
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
        onClick={handleLogin}
      >
        Login
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Link
        className="underline text-blue-600 self-center mt-1"
        href="/register"
      >
        dont have a account click here to sign up
      </Link>
    </div>
  );
};

export default Login;
