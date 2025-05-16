import Filter from 'bad-words';
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from 'obscenity';

const technicalWhitelist = [
  'NumPy',
  'Pandas',
  'Analysis',
  'Data Analysis',
  'Analytics',
  'Cumulative',
  'Cucumber',
  'Async',
  'Assert',
  'Assume',
  'Push',
  'Pull',
];

const validateText = (text: string) => {
  const lowerText = text.toLowerCase();

  const containsTechnicalTerm = technicalWhitelist.some((term) =>
    lowerText.includes(term.toLowerCase())
  );

  if (containsTechnicalTerm) {
    return true;
  }

  const filter = new Filter();
  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  technicalWhitelist.forEach((term) => {
    filter.removeWords(term);
  });

  const hasBadWords = matcher.hasMatch(text) || filter.isProfane(text);

  return !hasBadWords;
};

export default validateText;
