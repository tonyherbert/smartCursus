import { Header } from "@/src/features/layout/header";
import { Page404 } from "@/src/features/page/page-404";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <Page404 />
      </div>
    </div>
  );
}
