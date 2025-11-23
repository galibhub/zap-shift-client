import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);
  return (
    <div className="my-24 font-bold" >
      <div className="text-center mb-24">
        <h3 className="text-3xl text-center font-bold my-8"> Reviews</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
          facere aut! Et fugit consectetur earum. Non, totam eligendi. Tenetur
          sapiente tempore at distinctio unde totam dignissimos ullam iure quo
          voluptatibus?
        </p>
      </div>
    
        <Swiper
        loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 30,
            stretch: '50%',
            depth: 100,
            scale:0.75,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
          pagination={true}
          modules={[EffectCoverflow, Pagination,Autoplay]}
          className="mySwiper"
        >
          {
            reviews.map(review=><SwiperSlide key={review.id}>
           <ReviewCard  review={review}></ReviewCard>
          </SwiperSlide>)
          }
          
        </Swiper>
  
    </div>
  );
};

export default Reviews;
