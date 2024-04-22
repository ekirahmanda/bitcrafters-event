"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const EditEvent = ({ event }) => {
  const { event } = event;
  const router = useRouter();

  const [title, setTitle] = useState(events.title);
  console.log(events);
  const [description, setDescription] = useState(events.description);
  const [image, setImage] = useState(events.image);
  const [dateTime, setDate] = useState(events.dateTime);

  async function handleEditEvent(event) {
    const id = events.id;

    event.preventDefault();

    const token = Cookies.get("token");

    const res = await fetch(`https://eventmakers.devscale.id/events/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        token,
        title,
        description,
        image,
        dateTime,
      }),
    });

    toast.success("Successfully edited the event!");
    router.push("/dashboard");

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
          <h1 className="text-2xl font-bold">{events.title}</h1>
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
            <SaveIcon />
          </button>
        </form>
      </div>
    </main>
  );
};
