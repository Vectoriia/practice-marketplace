import React, { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ImageCarousell from '../components/Carousel';
import CategoryScroll from '../components/CategoryScroll';
import ProductGrid from '../components/ProductGrid';
import CartModal from '../modals/CartModal';
import CheckoutModal from '../modals/CheckoutModal';
import {
  addItemToCart,
  deleteItemFromCart,
  editItemCount,
} from '../redux/slices/cartSlice';
import { useAppDispatch } from '../redux/hooks';
import { generatePath, useNavigate } from 'react-router-dom';
import { GetFiltredProducts } from '../api/productsApi';
export interface ProductInfo {
  id: number;
  name: string;
  price: number;
  soldCount: number;
  imageURL: string;
}
export interface CartItemInfo extends ProductInfo {
  amount: number;
}

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState(40);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  let pageSize: number = 10;
  const [openCart, setOpenCart] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleProductRedirect = (id: string) => {
    id && navigate(generatePath('/product-page/:id', { id }));
  };
  function handleCategoryChange(id: number) {
    setCategoryId(id);
  }
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handlePageNumberChange = () => {
    setPageNumber(pageNumber + 1);
  };
  function cartDelete(id: number) {
    dispatch(deleteItemFromCart(id));
  }
  function cartAdd(id: number) {
    const tempObj = products.find((element) => element.id === id);
    if (tempObj !== undefined) {
      dispatch(
        addItemToCart({
          id: tempObj.id,
          name: tempObj.name,
          price: tempObj.price,
          soldCount: tempObj.soldCount,
          imageURL: tempObj.imageURL,
          amount: 1,
        })
      );
    }
  }
  function cartItemCountModify(id: number, operator: number) {
    dispatch(editItemCount({ id, operator }));
  }

  const handleCartOpen = () => {
    setOpenCart(true);
  };
  const handleCartClose = () => {
    setOpenCart(false);
  };
  const handleCheckoutOpen = () => {
    setOpenCheckout(true);
    handleCartClose();
  };
  const handleCheckoutClose = () => {
    setOpenCheckout(false);
  };
  useEffect(() => {
    setPageNumber(1);
    const api = async () => {
      let data = await GetFiltredProducts({
        search,
        categoryId,
        pageNumber,
        pageSize,
      });

      if (data !== undefined) {
        setProducts(data.items);
        setHasNextPage(data.hasNextPage);
      }
    };
    api().catch(console.error);
  }, [search, categoryId]);

  useEffect(() => {
    const api = async () => {
      const data = await GetFiltredProducts({
        search,
        categoryId,
        pageNumber,
        pageSize,
      });

      if (data !== undefined) {
        if (pageNumber > 1) {
          setProducts(products.concat(data.items));
        }
        setHasNextPage(data.hasNextPage);
      }
    };
    api().catch(console.error);
  }, [pageNumber]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header
        handleSearchChange={handleSearchChange}
        handleCartOpen={handleCartOpen}
      />
      <div className="max-w-[1015px] w-full mt-20 flex flex-col items-center justify-center">
        <ImageCarousell />
        <h1 className="w-full mt-[24px] mb-[14px] text-left font-almarai font-size-[24px] font-bold text-gray-700">
          Categories
        </h1>
        <CategoryScroll handleClick={handleCategoryChange} />
        <h1 className="w-full my-[14px] text-left font-almarai font-size-[24px] font-bold  text-gray-700">
          All products
        </h1>
        <ProductGrid
          products={products}
          cartAdd={cartAdd}
          cartDelete={cartDelete}
          handleProductRedirect={handleProductRedirect}
          hasNextPage={hasNextPage}
          handlePageNumberChange={handlePageNumberChange}
        />
        <CartModal
          handleCartClose={handleCartClose}
          handleCheckoutOpen={handleCheckoutOpen}
          isOpen={openCart}
          cartItemCountModify={cartItemCountModify}
        />
        <CheckoutModal
          handleCheckoutClose={handleCheckoutClose}
          isOpen={openCheckout}
        />
      </div>
    </div>
  );
}
