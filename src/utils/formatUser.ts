import { IUser } from "@/types/user";

const formatUser = (clerkData: any): IUser => {
  const user: IUser = {
    externalId: clerkData.id,
    attributes: {
      username: clerkData.username as string,
      image_url: clerkData.imageUrl as string,
      last_name: clerkData.fullName as string,
      first_name: clerkData.firstName as string,
      created_at: clerkData.createdAt as number,
      updated_at: clerkData.updatedAt as number,
      external_id: clerkData.externalId as string,
      email_addresses: clerkData.emailAddresses as [],
    },
  };

  return user;
};

export default formatUser;
