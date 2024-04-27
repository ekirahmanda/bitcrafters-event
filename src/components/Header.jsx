"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userdata"));
    if (!userData) {
      setUser({});
      setLoggedIn(false);
    } else {
      setUser(userData);
      setLoggedIn(true);
    }
  }, []);

  function Logout() {
    setUser({});
    setLoggedIn(false);
    localStorage.clear();

    router.push("/");
  }

  // Fetch event data
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://eventmakers.devscale.id/events/", {
        cache: "no-store",
      });
      const { data } = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  // Handle search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter data
  const filteredData = data.filter((eventItem) => {
    const { events } = eventItem;
    // case insensitive
    return (
      events.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      events.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <header className="navbar fixed z-50 bg-base-100 shadow-xl flex justify-between p-4">
      <div>
        <Link href="/" className="btn btn-ghost text-2xl font-bold">
          BitEvents
        </Link>
      </div>
      <nav>
        <div class="flex overflow-hidden max-w-md mx-auto font-[sans-serif] p-2">
          <input
            type="text"
            placeholder="Search Event..."
            class="input input-bordered w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
            onChange={handleSearchChange}
          />
        </div>

        {!loggedIn ? (
          <div className="flex gap-2">
            <Link href="/register">
              <button className="btn btn-secondary btn-outline p-2">
                Register
              </button>
            </Link>
            <Link href="/login">
              <button className="btn btn-primary brn-outline p-2">Login</button>
            </Link>
          </div>
        ) : (
          <>
            <Link href="/events/create">
              <button className="btn btn-primary p-2">Create Event</button>
            </Link>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar placeholder"
              >
                <div className="bg-neutral text-neutral-content w-24 rounded-xl">
                  <span className="text-xl">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    href="/userdashboard"
                    className="justify-between font-bold"
                  >
                    My Events
                  </Link>
                </li>
                {}
                <li>
                  <a className="justify-between" onClick={Logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};
