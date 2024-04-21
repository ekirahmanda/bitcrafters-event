import { Header } from "@/components/Header";
import { EditEvent } from "@/components/EditEvent";

export async function getEvent(eventid) {
  const res = await fetch(`https://eventmakers.devscale.id/events/${eventid}`, {
    method: "GET",
    cache: "no-store",
  });

  const { data } = await res.json();
  if (!!res.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

export default async function Page({ params }) {
  const { id } = params;

  const event = await getEvent(id);

  return (
    <main>
      <Header />
      <EditEvent event={event} />
    </main>
  );
}
