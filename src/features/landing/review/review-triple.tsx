import { Layout } from "@/src/features/page/layout";
import type { ReviewItemProps } from "./review-item";
import { ReviewItem } from "./review-item";

type ReviewTripleProps = {
  /**
   * An array of reviews.
   */
  reviews: [ReviewItemProps, ReviewItemProps, ReviewItemProps];
};

export const ReviewTriple = (props: ReviewTripleProps) => {
  return (
    <Layout className="grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-3">
      {props.reviews.map((review) => (
        <ReviewItem {...review} key={review.image} />
      ))}
    </Layout>
  );
};
