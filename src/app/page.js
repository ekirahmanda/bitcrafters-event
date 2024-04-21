import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      Halo, ini staging
      <div>
        <button className="btn btn-primary">Submit</button>
      </div>
    </main>
  );
}
