import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { welcomeUser } from "@/inngest/user-welcome";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    welcomeUser,
  ],
});
