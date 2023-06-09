import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import { FC } from "react";
import carouselImage from "../images/Carousel2.png";

export default function ImageCarousell() {
    const items = [
        {
            src: carouselImage,
            alt: 'First image',
        },
        {
            src: carouselImage,
            alt: 'Second image',
        },
        {
            src: carouselImage,
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