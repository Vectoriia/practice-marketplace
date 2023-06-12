import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { FC } from "react";
interface Props {
  handleClick(): void;
  text: string;
  imageSrc: string;
}
export const CategoryCard: FC<Props> = ({
   handleClick,
   text,
   imageSrc,
   ...props
 }) => (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={imageSrc}
          alt={text}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
);
