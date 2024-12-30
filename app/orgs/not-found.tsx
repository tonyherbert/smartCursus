import AuthNavigationWrapper from "@/src/features/navigation/log-in-navigation-wrapper";
import { Page404 } from "@/src/features/page/page-404";

export default function NotFoundPage() {
  return (
    <AuthNavigationWrapper>
      <Page404 />
    </AuthNavigationWrapper>
  );
}
