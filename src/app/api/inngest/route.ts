import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { welcomeUser } from "@/inngest/user-welcome";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    welcomeUser,
  ],
});
