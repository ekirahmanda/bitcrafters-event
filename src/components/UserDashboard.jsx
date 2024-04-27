"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const UserDashboard = ({ events }) => {
  const [user, setUser] = useState(null);
  const authoredEvent = events.filter(
    (event) => event.events.author === user?.id
  );

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    setUser(userdata);
  }, []);

  return (
    <main className="w-full m-auto flex flex-col gap-y-8 p-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <div className="flex flex-col gap-y-4">
        <div className="text-2xl font-bold">My Events</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {authoredEvent.length ? (
            authoredEvent.map(({ events }) => (
              <div
                key={events.id}
                className="justify-between flex flex-col gap-2 p-4 h-full overflow-hidden rounded-xl border bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
              >
                <img
                  className="object-cover h-48 w-104 rounded-md flex justify-center items-center"
                  src={events.image}
                ></img>
                <p className="text-xl font-bold">{events.title}</p>
                <p className="text-sm text-gray-500">{events.dateTime}</p>
                <div className="flex gap-x-2">
                  <Link
                    href={`/events/${events.id}`}
                    className="w-28 btn btn-accent font-semibold"
                  >
                    See More
                  </Link>
                  <Link
                    href={`/events/edit/${events.id}`}
                    className="w-28 btn btn-primary font-semibold"
                  >
                    Edit
                  </Link>
                  <Link
                    href="/userdashboard"
                    className="w-28 btn btn-error font-semibold"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-indigo-600">There are no event yet</p>
          )}
        </div>
      </div>
    </main>
  );
};
