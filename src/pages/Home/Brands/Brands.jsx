import React from 'react';
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon_vector from '../../../assets/brands/amazon_vector.png';
import amazon from '../../../assets/brands/amazon.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import start_people from '../../../assets/brands/start_people.png';
import start from '../../../assets/brands/start_people.png';


const brandLogos = [
    amazon_vector,
    amazon,
    casio,
    moonstar,
    randstad,
    star,
    start_people,
    start
]

const Brands = () => {
    return (
        <div className='my-20 border-b border-gray-400 border-dashed pb-10 '>
            <h1 className='font-bold text-secondary text-center text-3xl my-8'>
                We've helped thousands of sales teams
            </h1>
            <Swiper
                slidesPerView={4}
                loop={true}
                autoplay={
                    {
                        delay: 1000,
                        disableOnInteraction: false
                    }
                }
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper">

                {brandLogos.map((logo, index) => (
                    <SwiperSlide key={index}>
                        <img src={logo} alt={`Brand Logo ${index + 1}`} className="mx-auto" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Brands;