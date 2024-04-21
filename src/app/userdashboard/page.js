import { UserDashboard } from "@/components/UserDashboard";

export async function listEvents() {
  const res = await fetch("https://eventmakers.devscale.id/events", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}
export default async function Dashboard() {
  const { data } = await listEvents();

  return <UserDashboard events={data} />;
}
