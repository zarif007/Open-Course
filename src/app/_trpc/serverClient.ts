import { appRouter } from "@/server";
import { nextApiEndPoint } from "@/utils/apiEndpoints";
import { httpBatchLink } from "@trpc/client";

const url = `${nextApiEndPoint}/trpc`;

export const serverClient = appRouter.createCaller({
  links: [httpBatchLink({ url })],
});
