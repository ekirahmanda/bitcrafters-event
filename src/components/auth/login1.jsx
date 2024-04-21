"use client";

import React, { useState } from "react";

export const Login1 = () => {
  const [message, setMessage] = useState("");

  async function handleLogin(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("https://eventmakers.devscale.id/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const jsonRes = await res.json();
    setMessage(jsonRes.message);
  }
  return (
    <main className="h-screen grid grid-cols-2 border border-cyan-500">
      <div className="bg-cyan-500 flex justify-center items-center ">
        <img
          src="https://assets-prd.ignimgs.com/2021/09/16/bitcraft-button-1631814716884.jpg?width=300&crop=1%3A1%2Csmart&auto=webp&dpr=2"
          width={500}
          height={500}
          alt="Bitcraft Logo from Internet"
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[240px] space-y-3">
          <h1 className="text-2xl">Login</h1>
          <p className="text-lg">Welcome back, buddy!</p>
          <form className="form-control gap-2" action={handleLogin}>
            <input
              className="input input-primary"
              name="email"
              placeholder="Enter your email"
            />
            <input
              className="input input-primary"
              name="password"
              placeholder="Enter your password"
              type="password"
            />
            <button className="btn btn-primary">Login</button>
          </form>
          <div className="text-sm">
            {message !== "" ? <div>{message}</div> : null}
          </div>
        </div>
      </div>
    </main>
  );
};
