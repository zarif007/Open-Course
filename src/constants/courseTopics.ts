interface ITopicFields {
  label: string;
  type: "text" | "url" | "number";
  key: "url" | "title" | "duration";
  value: (e: React.ChangeEvent<HTMLInputElement>) => string | number;
}

export const topicInputFields = (index: number) => {
  const fields: ITopicFields[] = [
    {
      label: "Title",
      type: "text",
      key: "title",
      value: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
    },
    {
      label: "Link (YT / Blog URL)",
      type: "url",
      key: "url",
      value: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
    },
    {
      label: "Approx. Duration in minute (ex. 10)",
      type: "number",
      key: "duration",
      value: (e: React.ChangeEvent<HTMLInputElement>) =>
        isNaN(+e.target.value) ? 0 : +e.target.value,
    },
  ];

  return fields[index];
};
