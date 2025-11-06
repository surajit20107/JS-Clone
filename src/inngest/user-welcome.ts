import { Inngest } from "inngest";
const inngest = new Inngest({ id: "js-clone" });
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
