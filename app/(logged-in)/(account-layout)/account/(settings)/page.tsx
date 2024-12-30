import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { requiredAuth } from "@/src/lib/auth/helper";
import { combineWithParentMetadata } from "@/src/lib/metadata";
import { prisma } from "@/src/lib/prisma";
import { EditPasswordForm } from "./edit-password-form";
import { EditProfileCardForm } from "./edit-profile-form";

export const generateMetadata = combineWithParentMetadata({
  title: "Settings",
  description: "Update your profile.",
});

export default async function EditProfilePage() {
  const user = await requiredAuth();

  const hasPassword = await prisma.user.count({
    where: {
      id: user.id,
      passwordHash: {
        not: null,
      },
    },
  });

  return (
    <div className="flex flex-col gap-4 lg:gap-8">
      <EditProfileCardForm defaultValues={user} />
      {hasPassword ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <EditPasswordForm />
            </CardContent>
          </Card>
        </>
      ) : null}
    </div>
  );
}
