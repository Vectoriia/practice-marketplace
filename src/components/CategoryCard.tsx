import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
interface Props {
  handleClick(): void;
  text: string;
  imageSrc: string;
  isActive: boolean;
}
const CategoryCard: React.FC<Props> = ({
  handleClick,
  text,
  imageSrc,
  isActive,
})=>
{
  return(
    <Card className="min-w-[152px]" sx={{ width: 132, color: isActive?"#37AFA8":"black" }} 
          style={{ border: "none", boxShadow: "none" }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          image={imageSrc}
          alt={text}
        />
        <CardContent>
          <Typography gutterBottom component="div" sx={{fontFamily:"Amari", fontWeight: "400", 
                                                        fontSize: "14px", lineHeight: "16px", fontStyle: "normal"}}>
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    );
}

export default CategoryCard;