"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/me");

      console.log(response.data);

      setData(response.data.data._id);
    } catch (error: any) {
      console.log(error.message);

      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.get("/api/users/logout");

      toast.success("Logged Out Successfully!");

      router.push("/login");
    } catch (error: any) {
      console.log(error.message);

      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Link
        href="/"
        className="hover:bg-gray-800 mb-4 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
      >
        Go back Home
      </Link>
      <h1 className="my-4">Profile Page</h1>
      <hr />
      <h2 className="p-2 bg-yellow-500 text-black">
        {data === "" ? (
          "No user data found!"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={getUserDetails}
        className="border border-gray-300 mt-4 rounded-lg px-4 py-2 bg-green-700 hover:bg-green-600"
      >
        Get User Details
      </button>
      <button
        onClick={logout}
        className="border border-gray-300 mt-4 rounded-lg p-2 hover:bg-gray-800"
      >
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
