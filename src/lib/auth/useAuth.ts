import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const getSession = async () => {
  return getServerSession(authOptions);
};

interface WithSessionHandler {
  ({
    req,
    params,
  }: {
    req: Request;
    params: Record<string, string>;
  }): Promise<Response>;
}

export const withSession =
  (handler: WithSessionHandler) =>
  async (req: Request, { params }: { params: Record<string, string> }) => {
    const session = await getSession();
    if (!session?.user?.email) {
      return new Response("Unauthorized: Login required.", { status: 401 });
    }

    return handler({ req, params });
  };
