import { EditEvent } from "@/components/EditEvent";

export async function getEvent(eventid) {
  const res = await fetch(`https://eventmakers.devscale.id/events/${eventid}`, {
    method: "GET",
    cache: "no-store",
  });

  const { data } = await res.json();
  if (!!res.ok) {
    console.log("resp from eventid " + data);
    const resp = { data: data, eventid: eventid };
    return JSON.stringify(resp);
  } else {
    throw new Error(data.message);
  }
}

export default async function Page({ params }) {
  const { id } = params;

  const event = await getEvent(id);

  console.log(event + " test");

  return (
    <main>
      <EditEvent event={event} />
    </main>
  );
}
