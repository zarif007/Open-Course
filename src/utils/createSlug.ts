import { nanoid } from "nanoid";

const createSlug = (inputString: string) => {
  const emojiRegex =
    /(?:[\u2700-\u27BF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\uD800-\uDBFF][\uDC00-\uDFFF])/g;

  const slug = inputString
    .toString() // Ensure the input is a string
    .replace(emojiRegex, "") // Remove emojis
    .trim() // Remove leading and trailing white spaces
    .toLowerCase() // Convert the string to lowercase
    .replace(/[^\w\s-]/g, "") // Remove all non-word, non-space, and non-hyphen characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace consecutive hyphens with a single hyphen
    .concat(`-${nanoid(5)}`);
  return slug;
};

export default createSlug;
