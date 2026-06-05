import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="flex-1">
      <div className="w-full p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 text-neutral-100">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="custom-primary">Back to Homepage</Button>
          <Button variant="link" className="">
            View Profile
          </Button>
        </div>
      </div>
    </main>
  );
}
