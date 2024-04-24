"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const EditEvent = ({ event }) => {
  // const { event } = event;
  const router = useRouter();
  console.log(event.data);
  const eventResponse = event.data.events;
  const [title, setTitle] = useState(eventResponse.title);
  const [description, setDescription] = useState(eventResponse.description);
  const [image, setImage] = useState(eventResponse.image);
  const [dateTime, setDate] = useState(eventResponse.dateTime);
  const [author, setAuthor] = useState(eventResponse.author);

  async function handleEditEvent(event) {
    event.preventDefault();

    const token = Cookies.get("token");

    console.log(event.eventid);

    const res = await fetch(
      `https://eventmakers.devscale.id/events/${event.eventid}`,
      {
        method: "PATCH",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Successfully edited the event!");
    router.push("/userdashboard");

    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  }

  return (
    <main>
      <button
        className="hover:bg-zinc-100 flex flex-row gap-2 p-2 rounded-lg border-2 mb-6"
        onClick={() => router.push("/dashboard")}
      >
        <p className="font-bold text-zinc-600">Back to Dashboard</p>
      </button>

      <div className="flex flex-col gap-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Edit Event</h2>
          <h1 className="text-2xl font-bold">{eventResponse.title}</h1>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-2" onSubmit={handleEditEvent}>
          <div className="">
            <p>Title</p>
            <input
              className="w-full input input-primary"
              type="text"
              placeholder="input event title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></input>
          </div>
          <div className="">
            <p>Description</p>
            <textarea
              className="w-full textarea textarea-primary"
              placeholder="input event description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex-1">
              <p>Date</p>
              <input
                className="w-full input input-primary"
                value={dateTime}
                type="date"
                onChange={(e) => setDate(e.target.value)}
                required
              ></input>
            </div>
            <div className="flex-1">
              <p>Image Link</p>
              <input
                className="w-full input input-primary"
                value={image}
                type="text"
                onChange={(e) => setImage(e.target.value)}
                required
              ></input>
            </div>
          </div>
          <button className="btn btn-primary">
            <p>Save Edit</p>
          </button>
        </form>
      </div>
    </main>
  );
};
