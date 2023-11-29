interface IInvitationLink {
  courseSlug: string;
  expiresIn: number; // In day
  creator: string;
  maxCapacity: number;
  banner: string;
  courseTitle: string;
  courseId: string;
  createdAt: Date | string;
}

export default IInvitationLink;
