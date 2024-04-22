"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    setUser(userdata);
  }, []);

  return (
    <header className="flex justify-between p-4">
      <div>
        <Link href="/">Home</Link>
      </div>
      <nav className="space-x-4">
        {user ? (
          <button className="btn">Log Out</button>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};
