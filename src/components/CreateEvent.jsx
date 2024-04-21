"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
// import { MoveLeft } from "lucide-react";
// import { Plus } from "lucide-react"

export const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [dateTime, setDate] = useState("");
  const [userData, setUserData] = useState("");
  const [token, setToken] = useState("");

  const router = useRouter();

  useEffect(() => {
    const userDataFromLS = localStorage.getItem("user");
    setUserData(JSON.parse(userDataFromLS));
    setToken(Cookies.get("token"));
  }, []);

  async function handleCreateEvent(event) {
    event.preventDefault();

    const res = await fetch("https://eventmakers.devscale.id/events/", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        image,
        dateTime,
        author: userData.id,
      }),
    });

    router.refresh();
    toast.success("Events Added Successfully!");
    router.push("/dashboard");

    // ini ga ngaruh, ga hilangg
    setTitle("");
    setDescription("");
    setDate("");
    setImage("");

    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  }

  return (
    <main className="mx-6 lg:mx-50">
      <button
        className="hover:bg-accent-100 flex flex-row gap-2 p-2 rounded-lg border-1 mb-4"
        onClick={() => router.push("/dashboard")}
      >
        <p>Back to Dashboard</p>
      </button>
      <div className="flex flex-col gap-6">
        {/* Title */}
        <div className="flex flex-col gap-2 font-bold">
          <h2>Create New Event</h2>
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleCreateEvent}>
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

          <button className="btn btn-secondary mt-4">
            <p>Create New Event</p>
          </button>
        </form>
      </div>
    </main>
  );
};
