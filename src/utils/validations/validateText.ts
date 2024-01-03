import badWords from 'bad-words';
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from 'obscenity';

const validateText = (text: string) => {
  const filter = new badWords();

  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  const hasBadWords = matcher.hasMatch(text) || filter.isProfane(text);

  return !hasBadWords;
};

export default validateText;
