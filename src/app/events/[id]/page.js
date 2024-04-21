import { Header } from "@/components/Header";
import { DetailEvent } from "@/components/DetailEvent";

export default function Page({ params }) {
  return (
    <main>
      <Header />
      <DetailEvent id={params.id} />
    </main>
  );
}
