const constructNotification = (
  initiator: { name: string; image: string },
  receiver: string,
  link: string,
  type: 'Replied' | 'Commented' | 'Enrolled'
) => {
  let text = '';
  let categoryId = 1;
  if (type === 'Replied') {
    text = `${initiator.name} replied to your comment`;
    categoryId = 3;
  }

  return {
    initiator,
    receiver,
    text,
    link,
    categoryId,
  };
};

export default constructNotification;
