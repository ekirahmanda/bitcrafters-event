import { UserDashboard } from "@/components/UserDashboard";
// import Cookies from "js-cookie";

// export function getUsers() {
//   const token = Cookies.get("token");
//   let userData = null;
//   const userCookie = Cookies.get("userData");
//   return { token, userData };
// }

export async function listEvents() {
  const res = await fetch("https://eventmakers.devscale.id/events", {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}
export default async function Dashboard() {
  // const { userData } = getUsers();

  const { data } = await listEvents();
  console.log(data);
  // const authoredEvent = data.filter((item) => item.events.author === userData.id);
  // const joinedEvent = data.filter((item) => item.participants.some((participant) => participant.email === userData.email));

  // console.log(userData);
  // console.log(data);
  // console.log(joinedEvent);
  // console.log(authoredEvent);

  return <div>Dashboard</div>;

  // return <UserDashboard />;
}
