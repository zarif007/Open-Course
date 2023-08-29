import { IUser } from "@/types/user";

const formatUser = (clerkData: any): IUser => {
  const user: IUser = {
    externalId: clerkData.id,
    attributes: {
      username: clerkData.username as string,
      image_url: clerkData.image_url as string,
      last_name: clerkData.last_name as string,
      first_name: clerkData.first_name as string,
      created_at: clerkData.created_at as number,
      updated_at: clerkData.updated_at as number,
      external_id: clerkData.external_id as string,
      email_addresses: clerkData.email_addresses as [],
    },
  };

  return user;
};

export default formatUser;
