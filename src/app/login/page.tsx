"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({ email: "", password: "", username: "" });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Success");
      console.log("Log in Success", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loggin you in..." : "Login"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-4"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        type="text"
      />
      <hr />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-4"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        type="text"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 mb-4 hover:bg-gray-800"
        disabled={buttonDisabled}
      >
        Login
      </button>
      <p>
        Don't have an account?{" "}
        <Link className="text-blue-300" href="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
