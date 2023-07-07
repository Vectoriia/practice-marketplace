import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Paper } from '@mui/material';
import { FC } from 'react';
import carouselImage1 from '../images/Carousel1.png';
import carouselImage2 from '../images/Carousel2.jpg';
import carouselImage3 from '../images/Carousel3.jpg';

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
    <div className="w-full -mb-5">
      <Carousel infiniteLoop={true} swipeable={true} showThumbs={false}>
        {items.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </Carousel>
    </div>
  );
}
interface ItemProps {
  src: string;
  alt: string;
}
const Item: FC<ItemProps> = ({ src, alt }) => {
  return (
    <Paper sx={{ border: 'none', boxShadow: 'none' }}>
      <img className="rounded-[20px]" src={src} alt={alt} />
    </Paper>
  );
};
