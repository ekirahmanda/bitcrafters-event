"use client";
import { useState } from "react";
export const Register = () => {
  const [message, setMessage] = useState("");
  async function handleRegister(formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("https://eventmakers.devscale.id/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const jsonRes = await res.json();

    if (res.status === 201) {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);
      formRef.current.reset();
    }

    if (res.status === 405 || res.status === 500) {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);
    }
  }
  return (
    <main>
      <section>
        <h1>Register</h1>
      </section>
      <form className="space-y-2" action={handleRegister}>
        <input name="name" placeholder="Name" />
        <input name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button>Register</button>
      </form>
      {message !== "" ? <div>{message}</div> : null}
    </main>

    // {/* <div className="h-screen grid grid-cols-2">
    // <div className="bg-red-500"></div>
    // <div className="flex justify-center items-center">
    //   <div className="w-[240px]">
    //     <h1 className="text-2xl">Login</h1>
    //     <p className="text-lg">Welcome back, buddy!</p>
    //     <form className="mt-5 form-control gap-2">
    //       <input
    //         className="input input-primary"
    //         name="email"
    //         placeholder="Entar your email"
    //       />
    //       <input
    //         className="input input-primary"
    //         name="password"
    //         placeholder="Enter your password"
    //       />
    //       <button className="btn btn-primary">Login</button>
    //     </form>
    //   </div>
    // </div>
    // </div> */}
  );
};
