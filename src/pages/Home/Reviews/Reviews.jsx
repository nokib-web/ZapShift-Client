import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewsPromise }) => {
    const reviews = use(reviewsPromise);
    console.log(reviews);
    return (
        <div>

            <div>
                <h1 className='font-bold text-secondary text-center text-3xl my-8'>
                    What our customers are saying
                </h1>
                <p className='text-center text-gray-600 mb-10'>
                    Real reviews from our satisfied clients
                </p>
            </div>
            <>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    loop={true}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    centeredSlides={true}
                    slidesPerView={3}
                    coverflowEffect={{
                        rotate: 30,
                        stretch: '50%',
                        depth: 200,
                        modifier: 1,
                        scale: 0.75,
                        slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id}>
                            <ReviewCard review={review} />
                        </SwiperSlide>
                    ))}
                    
                </Swiper>
            </>
        </div>
    );
};

export default Reviews;