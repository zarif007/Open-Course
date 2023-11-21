const calculateAvgRating = (
  reviews: { user: string; rating: number }[] | []
): number => {
  if (reviews.length === 0) return 0;
  let total = 0;

  reviews.map((review) => {
    total += review.rating;
  });

  return parseFloat((total / reviews.length).toFixed(1));
};

export default calculateAvgRating;
