"use client";

import { useState, useEffect } from "react";
import { SearchEvent } from "@/components/SearchEvent";
import Cookies from "js-cookie";
import Link from "next/link";

const getEventData = async (token, query = "") => {
  try {
    const response = await fetch(
      `https://eventmakers.devscale.id/events/?search=${query}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const res = await response.json();
    return res;
  } catch (error) {
    console.error(error);
    return {
      message: "Fetch events failed",
      data: {},
    };
  }
};

export const ListEvent = () => {
  const [userData, setUserData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [eventMessage, setEventMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const payload = localStorage.getItem("user");
    setUserData(JSON.parse(payload));

    const token = Cookies.get("token");
    const fetchData = async () => {
      try {
        const { data, message } = await getEventData(token);
        setEventData(data);
        setEventMessage(message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSearchData = async (searchQuery) => {
    const token = Cookies.get("token");

    try {
      const { data, message } = await getEventData(token, searchQuery);
      setEventData(data);
      setEventMessage(message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    handleSearchData("");
  };

  return (
    <main className="p-8 gap-y-8 flex flex-col justify-center items-center min-h-screen">
      <div className="container flex flex-col justify-center items-center py-6 space-y-6 md:py-12 lg:space-y-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center md:space-y-2">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              BitEvents
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Find, Found, and Join Dozens of Exciting Events Around You!
            </p>
          </div>
        </div>

        <SearchEvents
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchData={() => handleSearchData(searchQuery)}
          handleReset={() => handleReset()}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {eventData ? (
          eventData.map((data, idx) => (
            <Link key={idx} href={`/events/${data.events.id}`}>
              <div
                key={idx}
                className="justify-between flex flex-col gap-2 p-4 h-full overflow-hidden rounded-xl border hover:translate-y-1 hover:bg-accent-200"
              >
                <img
                  src={data.events.image}
                  className="object-cover h-48 w-104 rounded-md flex justify-center items-center"
                ></img>
                <h2 className="text-xl font-bold">{data.events.title}</h2>
                <p className="text-sm text-gray-400">{data.events.dateTime}</p>
                <p className="line-clamp-3">{data.events.description}</p>
                <div className="line-clamp-1">
                  <div className="flex gap-1 max-w-96 line-clamp-2 text-indigo-800 text-sm">
                    {data.participants.length > 0 ? (
                      <p className="">
                        <span className="font-semibold">
                          {data.participants.length}
                        </span>{" "}
                        Joined this event
                      </p>
                    ) : (
                      <p className="font-italic">
                        There are no participants yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>loading ...</div>
        )}
      </div>
    </main>
  );
};
