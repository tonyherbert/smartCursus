import { Loader } from "@/src/components/ui/loader";

export default async function RouteLoading() {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader size={32} />
    </div>
  );
}
