export interface INotification {
  initiator: {
    name: string;
    image: string;
  };
  receiver: string;
  text: string;
  link: string;
  categoryId: number;
}
