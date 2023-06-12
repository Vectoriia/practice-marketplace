import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { CardActionArea, CardActions  } from '@mui/material';
import { FC } from "react";
interface Props {
  handleClick(): void;
  name: string;
  itemSold: number;
  price: number;
  imageSrc: string;
  id: number;
}
export const ProductCard: FC<Props> = ({
   handleClick,
   name,
   itemSold,
   price,
   imageSrc,
   id,
   ...props
 }) => (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageSrc}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {itemSold} {' '} sold
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="play/pause">
          <PlayArrowIcon sx={{ height: 38, width: 38 }} />
        </IconButton>
      </CardActions>
    </Card>
);
