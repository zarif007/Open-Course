interface IInvitationLink {
  link: string;
  expiresIn: number; // In day
  creator: string;
  createdAt: Date | string;
}

export default IInvitationLink;
