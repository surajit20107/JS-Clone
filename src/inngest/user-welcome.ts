import { inngest } from "@/inngest/client";
import { sendMail } from "@/lib/sendMail";

export const welcomeUser = inngest.createFunction(
  { id: "welcome-email" },
  { event: "app/user.registered" },
  async ({ event, step }) => {
    await step.run("send-welcome-email", async () => {
      const { email, name } = event.data;
      await sendMail(email, name)
    })
  }
);
