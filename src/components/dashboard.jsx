"use client";
import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data
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
    <section>
      {/* input search bar */}
      <div class="flex border-2 bg-primary overflow-hidden max-w-md mx-auto font-[sans-serif]">
        <input
          type="email"
          placeholder="Search Something..."
          class="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
          onChange={handleSearchChange}
        />
      </div>

      {/* list eventItem */}
      {filteredData.map((eventItem) => {
        const { events, participants } = eventItem;

        return (
          <div
            key={events.id}
            className="bg-white shadow-lg rounded-lg p-4 mb-4"
          >
            <h4 className="font-semibold text-lg text-gray-800 mb-2">
              {events.title}
            </h4>
            <p className="text-gray-700 mb-2">{events.description}</p>
            <img
              src={events.image}
              alt={events.title}
              className="avatar w-24 rounded"
            />
            <p className="text-gray-600 mb-2">Date & Time: {events.dateTime}</p>

            {/* list participants */}
            {participants.length > 0 && (
              <div>
                {participants.map((participant) => (
                  <div key={participant.id}>
                    <h4>{participant.name}</h4>
                    <p>Email: {participant.email}</p>
                    <p>Phone Number: {participant.phoneNumber}</p>
                  </div>
                ))}
              </div>
            )}
            <button className="btn btn-primary">More Details</button>
          </div>
        );
      })}
    </section>
  );
}
