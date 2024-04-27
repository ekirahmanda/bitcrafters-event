"use client";

import React, { useRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ChevronLeft } from "lucide-react";
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
    const userDataFromLS = localStorage.getItem("userdata");
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
    router.push("/userdashboard");

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
    <main className="mx-6 lg:mx-80 py-8">
      <button
        className="hover:bg-zinc-100 flex flex-row gap-2 p-2 rounded-lg border-2 mb-6 text-sm"
        onClick={() => router.push("/userdashboard")}
      >
        <p className="font-bold text-zinc-600">Back to Dashboard</p>
      </button>
      <div className="flex flex-col gap-6">
        {/* Title */}
        <div className="flex flex-col gap-2 font-bold text-2xl">
          <h2>Create New Event</h2>
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleCreateEvent}>
          <div className="">
            <p>Title</p>
            <input
              className="w-full input input-primary"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></input>
          </div>
          <div className="">
            <p>Description</p>
            <textarea
              className="w-full textarea textarea-primary"
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
                type="text"
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

          <button className="btn btn-primary mt-4">
            <p>Create New Event</p>
          </button>
        </form>
      </div>
    </main>
  );
};
