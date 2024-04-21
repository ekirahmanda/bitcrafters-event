"use client";

import { Header } from "@/components/Header";
import { CreateEvent } from "@/components/CreateEvent";
import React from "react";

export default function Page() {
  return (
    <main>
      <Header />
      <CreateEvent />
    </main>
  );
}
