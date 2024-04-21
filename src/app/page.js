import Dashboard from "@/components/dashboard";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main>
      <Dashboard />
      <Header />
      Halo, ini staging
      <div>
        <button className="btn btn-primary">Submit</button>
      </div>
    </main>
  );
}
