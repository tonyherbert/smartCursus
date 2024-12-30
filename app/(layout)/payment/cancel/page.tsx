import { Badge } from "@/src/components/ui/badge";
import { buttonVariants } from "@/src/components/ui/button";
import { ContactSupportDialog } from "@/src/features/contact/support/contact-support-dialog";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/src/features/page/layout";
import Link from "next/link";

export default function CancelPaymentPage() {
  return (
    <Layout>
      <LayoutHeader>
        <Badge variant="outline">Payment failed</Badge>
        <LayoutTitle>
          We're sorry, but we couldn't process your payment
        </LayoutTitle>
        <LayoutDescription>
          We encountered an issue processing your payment.
          <br /> Please check your payment details and try again. <br />
          If the problem persists, don't hesitate to contact us for assistance.
          <br />
          We're here to help you resolve this smoothly.
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="flex items-center gap-2">
        <Link href="/" className={buttonVariants({ variant: "invert" })}>
          Home
        </Link>
        <ContactSupportDialog />
      </LayoutContent>
    </Layout>
  );
}
