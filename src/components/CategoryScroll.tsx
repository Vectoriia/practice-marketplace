import * as React from 'react';
import {CategoryCard} from './CategoryCard';
import { useState, useEffect } from 'react';
import { FC } from "react";
import Category1 from "../images/Category40.png";
import Category2 from "../images/Category41.png";
import Category3 from "../images/Category42.png";
import Category4 from "../images/Category43.png";
import Category5 from "../images/Category44.png";
import Category6 from "../images/Category45.png";
import Category7 from "../images/Category46.png";
import Category8 from "../images/Category47.png";
import Category9 from "../images/Category48.png";
let  imageSrc: string[] = [Category1, Category2, Category3, 
                            Category4, Category5, Category6, 
                            Category7, Category8, Category9];
type categoryProps = {
  id: number;
  name: string;
  imageURL: string;
};
interface Props {
  handleClick(id:number): void;
}
export const CategoryScroll:FC<Props> = ({
  handleClick,
})=>{
  const [result, setResult] = useState<categoryProps[]>([]);

  useEffect(() => {
   const api = async () => {
      const data = await fetch("https://linkup-academy.herokuapp.com/api/v1/categories", {
        method: "GET"
      });
      const jsonData = await data.json();
      setResult(jsonData);
    };
    api();
  }, []);
  return(
    <div className='flex flex-row overflow-x-auto'>
        {result.map((value, index) => {
          return (
            <div key= {value.id}>
              <CategoryCard handleClick ={()=>handleClick(value.id)} text = {value.name} imageSrc= {imageSrc[index]} />
            </div>
          );
        })}
    </div>

  );
}