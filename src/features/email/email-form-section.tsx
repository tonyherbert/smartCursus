import { Typography } from "@/src/components/ui/typography";
import { SectionLayout } from "../landing/section-layout";
import { EmailForm } from "./email-form";

export const EmailFormSection = () => {
  return (
    <SectionLayout
      size="lg"
      className="relative flex w-full flex-col items-center gap-16"
    >
      <div className="relative m-auto flex max-w-xl flex-col gap-4 text-center">
        <Typography
          variant="small"
          className="font-extrabold uppercase text-primary"
        >
          Be the first to use Threader
        </Typography>
        <Typography variant="h2" className="text-center text-4xl lg:text-5xl">
          Join the waiting list of{" "}
          <span className="text-gradient bg-gradient-to-r from-primary to-secondary font-mono font-extrabold uppercase">
            Threader
          </span>
        </Typography>
        <Typography variant="h3">
          Get early access, exclusive content and more.
        </Typography>
        <div className="mx-auto mt-6 w-full max-w-md">
          <EmailForm
            submitButtonLabel="Join"
            successMessage="Thank you for joining the waiting list"
          />
        </div>
      </div>
    </SectionLayout>
  );
};
