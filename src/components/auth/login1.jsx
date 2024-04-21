"use client";

import React from "react";

export const Login1 = () => {
  return (
    <main className="h-screen grid grid-cols-2">
      <div className="bg-red-500"></div>
      <div className="flex justify-center items-center">
        <div className="w-[240px]">
          <h1 className="text-2xl">Login</h1>
          <p className="text-lg">Welcome back, buddy!</p>
          <form className="mt-5 form-control gap-2">
            <input
              className="input input-primary"
              name="email"
              placeholder="Entar your email"
            />
            <input
              className="input input-primary"
              name="password"
              placeholder="Enter your password"
            />
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </main>
  );
};
