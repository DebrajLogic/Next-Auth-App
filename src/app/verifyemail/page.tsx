"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 m-2 bg-yellow-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div className="flex flex-col items-center">
          <h2 className="text-green-500 mb-2">Verified Successfully!</h2>
          <Link
            className="m-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-800"
            href="/login"
          >
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-red-500">Error in Verification!!</h2>
        </div>
      )}
    </div>
  );
}

export default VerifyEmailPage;
