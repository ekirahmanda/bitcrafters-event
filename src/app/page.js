import Dashboard from "@/components/dashboard";

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
