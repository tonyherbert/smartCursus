import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Typography } from "@/src/components/ui/typography";
import { SiteConfig } from "@/src/site-config";
import Image from "next/image";

export default async function AuthNewUserPage() {
  return (
    <div className="h-full">
      <header className="flex items-center gap-2 px-4 pt-4">
        <Image src={SiteConfig.appIcon} alt="app icon" width={32} height={32} />
        <Typography variant="h2">{SiteConfig.title}</Typography>
      </header>
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Almost There!</CardTitle>
            <CardDescription>
              To complete the verification, head over to your email inbox.
              You'll find a magic link from us. Click on it, and you're all set!
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
