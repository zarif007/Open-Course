const calculateAvgRating = (
  ratings: { user: string; rating: number }[] | []
): number => {
  if (ratings.length === 0) return 0;
  let total = 0;

  ratings.map((rating) => {
    total += rating.rating;
  });

  return parseFloat((total / ratings.length).toFixed(1));
};

export default calculateAvgRating;
