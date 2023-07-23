export const parseCallbackUrl = (url) => {
  const res = url.replace(/%3A/g, ":").replace(/%2F/g, "/");
  return res;
};

export const getUserReview = (reviews, userId) => {
  let userReview = null;

  reviews.forEach((review) => {
    if (review?.user?._id === userId) {
      userReview = review;
    }
  });

  return userReview;
};