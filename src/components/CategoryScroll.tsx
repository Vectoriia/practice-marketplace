import * as React from 'react';
import CategoryCard from './CategoryCard';
import { useState, useEffect } from 'react';
import { FC } from 'react';
import Category1 from '../images/Category40.png';
import Category2 from '../images/Category41.png';
import Category3 from '../images/Category42.png';
import Category4 from '../images/Category43.png';
import Category5 from '../images/Category44.png';
import Category6 from '../images/Category45.png';
import Category7 from '../images/Category46.png';
import Category8 from '../images/Category47.png';
import Category9 from '../images/Category48.png';
import { GetCategories } from '../api/productsApi';
let imageSrc: string[] = [
  Category1,
  Category2,
  Category3,
  Category4,
  Category5,
  Category6,
  Category7,
  Category8,
  Category9,
];
type categoryProps = {
  id: number;
  name: string;
  imageURL: string;
};
interface Props {
  handleClick(id: number): void;
}
const CategoryScroll: FC<Props> = ({ handleClick }) => {
  const [result, setResult] = useState<categoryProps[]>([]);
  const [currentCategory, setCategoryId] = useState(40);
  function handleWrapper(id: number) {
    handleClick(id);
    setCategoryId(id);
  }
  useEffect(() => {
    const api = async () => {
      const data = await GetCategories();
      if (data !== undefined) setResult(data);
    };
    api().catch(console.error);
  }, [currentCategory]);
  return (
    <div className="flex gap-[22px] overflow-x-auto w-screen lg:max-w-[1015px]">
      {result.map((value, index) => {
        return (
          <div key={index}>
            <CategoryCard
              handleClick={() => handleWrapper(value.id)}
              text={value.name}
              imageSrc={imageSrc[index]}
              isActive={value.id === currentCategory}
            />
          </div>
        );
      })}
    </div>
  );
};
export default CategoryScroll;
