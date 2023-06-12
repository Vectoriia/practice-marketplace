import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import { FC } from "react";
import carouselImage1 from "../images/Carousel1.png";
import carouselImage2 from "../images/Carousel2.jpg";
import carouselImage3 from "../images/Carousel3.jpg";

export default function ImageCarousell() {
    const items = [
        {
            src: carouselImage1,
            alt: 'First image',
        },
        {
            src: carouselImage2,
            alt: 'Second image',
        },
        {
            src: carouselImage3,
            alt: 'Third image',
        },
    ];

    return (
        <Carousel swipe={true} animation = 'slide' autoPlay = {false}>
            {items.map((item, i) => (
                <Item key={i} {...item} />
            ))}
        </Carousel>
    );
}
interface ItemProps {
  src: string;
  alt: string;
}
const Item: FC<ItemProps> = ({src, alt}) => {
    return (
        <Paper>
            <img src={src} alt = {alt} />
        </Paper>
    );
};