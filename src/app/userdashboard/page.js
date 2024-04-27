import { UserDashboard } from "@/components/UserDashboard";
import { Header } from "@/components/Header";

export async function listEvents() {
  const res = await fetch("https://eventmakers.devscale.id/events", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}
export default async function Dashboard() {
  const { data } = await listEvents();

  return (
    <main>
      <Header />
      <UserDashboard events={data} />
    </main>
  );
}
