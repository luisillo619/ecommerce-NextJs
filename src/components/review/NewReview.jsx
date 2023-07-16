
import { getUserReview } from "@/helpers/helpers";
import { selectUser } from "@/redux/reducer/authSlice";
import { clearError, postReview, selectProductError } from "@/redux/reducer/productSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";


const NewReview = ({ product, session }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const router = useRouter()
  const dispatch = useDispatch()

  const user = useSelector(selectUser);
  const error = useSelector(selectProductError)

  useEffect(() => {
    const userReview = getUserReview(product?.reviews, user?._id);

    if (userReview) {
      setRating(userReview?.rating);
      setComment(userReview?.comment);
    }

    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, user]);

  const submitHandler = () => {
    const reviewData = { rating, comment, productId: product?._id };
    dispatch(postReview(router, session, reviewData));
  };

  return (
    <div>
      <hr className="my-4" />
      <h1 className="text-gray-500 review-title my-5 text-2xl">Tus Review</h1>

      <h3>Rating</h3>
      <div className="mb-4 mt-3">
        <div className="ratings">
          <StarRatings
            rating={rating}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            changeRating={(e) => setRating(e)}
          />
        </div>
      </div>
      <div className="mb-4 mt-5">
        <label className="block mb-1"> Comentarios </label>
        <textarea
          rows="4"
          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-1/3"
          placeholder="Your review"
          name="description"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>

      <button
        className="mt-3 mb-5 px-4 py-2 text-center inline-block text-white bg-yellow-500 border border-transparent rounded-md hover:bg-yellow-600 w-1/3"
        onClick={() => submitHandler()}
      >
        Agregar Review
      </button>
    </div>
  );
};

export default NewReview;