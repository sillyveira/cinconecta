import React from "react";

export default function Header({ titulo }) {
  return (
    <header className="bg-gray-800 flex justify-center w-full bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="py-4 px-4 sm:px-6 lg:px-12">
        <h1 className="text-2xl font-semibold text-gray-100">{titulo}</h1>
      </div>
    </header>
  );
}
