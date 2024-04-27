"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const DetailEvent = ({ id }) => {
  const [userData, setUserData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [eventMessage, setEventMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const payload = localStorage.getItem("user");
    setUserData(JSON.parse(payload));

    const token = Cookies.get("token");
    const fetchData = async () => {
      try {
        const { data, message } = await getEventData(token, id);
        setEventData(data);
        setEventMessage(message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const getEventData = async (token, id = "") => {
    try {
      const response = await fetch(
        `https://eventmakers.devscale.id/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.json();
      return res;
    } catch (error) {
      console.error(error);
      return {
        message: "Sorry, failed to search events",
        data: {},
      };
    }
  };

  const handleJoinEvent = async (id) => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(
        `https://eventmakers.devscale.id/events/${id}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            phoneNumber: "123",
          }),
        }
      );
      const res = await response.json();
      window.location.reload(); // reload page
      return res;
    } catch (error) {
      console.error(error);
      return {
        message: "Sorry, failed to join the event",
        data: {},
      };
    }
  };

  return (
    <main>
      <div className="p-4 space-y-2 items-center justify-center flex flex-col">
        {eventData ? (
          <div className="justify-between w-[1000px] flex flex-col gap-2 h-full overflow-hidden rounded-xl border  border-gray-100 dark:border-gray-800">
            <div className="p-4 space-y-2">
              <button onClick={() => router.back()} className="flex gap-2">
                <span className="font-bold ">Back</span>
              </button>
              <img
                src={eventData.events.image}
                className="object-cover h-48 w-104 rounded-md flex justify-center items-center"
              ></img>
              <h2 className="text-2xl font-bold">{eventData.events.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {eventData.events.dateTime}
              </p>
              <p>{eventData.events.description}</p>
            </div>
            <div className="p-4 pb-0 font-semibold">List of participants: </div>
            <div className="flex gap-x-2 p-4 pt-0">
              {eventData.participants.length > 0 ? (
                eventData.participants.map((participant, _) => (
                  <p key={participant.id} className="text-gray-500 italic">
                    {participant.name}
                  </p>
                ))
              ) : (
                <p className="text-gray-500 italic">No participant yet</p>
              )}
            </div>
            <button
              className="btn btn-neutral text-base text-white"
              onClick={() => handleJoinEvent(eventData.events.id)}
            >
              Join
            </button>
            {/* <button
              className="bg-slate-800 text-slate-50 p-2 rounded"
              onClick={() => router.back()}
            >
              kembali
            </button> */}
          </div>
        ) : (
          <p>no data</p>
        )}
      </div>
    </main>
  );
};
