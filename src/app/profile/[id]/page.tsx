import Link from "next/link";
import React from "react";

function page({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Link
        href="/profile"
        className="hover:bg-gray-800 mb-4 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
      >
        Back
      </Link>
      <h1>Profile Details</h1>
      <h2 className="p-3 bg-green-500 rounded text-black">{params.id}</h2>
    </div>
  );
}

export default page;
