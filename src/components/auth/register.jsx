"use client";

import { useState, useRef } from "react";

export const Register = () => {
  const [message, setMessage] = useState("");
  const formRef = useRef(null); // Reference to the form element

  async function handleRegister(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Create a FormData object from the form
    const formData = new FormData(event.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    // Perform the API request
    const res = await fetch("https://eventmakers.devscale.id/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    // Parse the response as JSON
    const jsonRes = await res.json();

    // Check the response status and handle accordingly
    if (res.status === 201) {
      setMessage(jsonRes.message);
      formRef.current.reset(); // Reset the form
    } else if (res.status === 405 || res.status === 500) {
      setMessage(jsonRes.message);
    }
  }

  return (
    <main>
      <section>
        <h1>Register</h1>
      </section>
      <form className="space-y-2" onSubmit={handleRegister} ref={formRef}>
        <input name="name" placeholder="Name" required />
        <input name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      {message !== "" && <div>{message}</div>}
    </main>
  );
};
