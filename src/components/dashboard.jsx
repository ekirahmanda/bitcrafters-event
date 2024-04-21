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
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* list eventItem */}
      {filteredData.map((eventItem) => {
        const { events, participants } = eventItem;

        return (
          <div key={events.id}>
            <h4>{events.title}</h4>
            <p>{events.description}</p>
            <img src={events.image} alt={events.title} />
            <p>Date & Time: {events.dateTime}</p>
            <p>Author ID: {events.author}</p>

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
            <button>More Details</button>
          </div>
        );
      })}
    </section>
  );
}
