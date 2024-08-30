import { Image } from "antd";
import React from "react";
import Slider from "react-slick";

export default function SimpleSlider({ arrImages }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000

    };
    return (
        <Slider {...settings}>
            {arrImages.map((img) => {
                return <Image src={img} alt="slider" preview={false} width='100%' height='350px' />
            })}
        </Slider>
    );
}