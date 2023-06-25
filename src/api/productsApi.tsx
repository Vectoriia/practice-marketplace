import { apiUrl } from './constants';

export const FetchGetBase = async (value: string): Promise<any> => {
  let res = await fetch(value, {
    method: 'GET',
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      } else {
        return res;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
};

export interface SearchedParams {
  search: string;
  categoryId: number;
  pageNumber: number;
  pageSize: number;
}

export interface ReturnProductsValues {
  items: [
    {
      id: number;
      name: string;
      price: number;
      description: string;
      soldCount: number;
      imageURL: string;
      detailsPictureURLPrimary: string;
      detailsPictureURLSecondary: [string];
      detailsTextPrimary: string;
      detailsTextSecondary: string;
    }
  ];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export const GetFiltredProducts = async (
  values: SearchedParams
): Promise<ReturnProductsValues> => {
  let res = await FetchGetBase(
    `${apiUrl}products?Search=${values.search}&CategoryId=${values.categoryId}&PageNumber=
      ${values.pageNumber}&PageSize=${values.pageSize}`
  );
  return res.json();
};

export interface DetailedProductInfo {
  id: number;
  name: string;
  price: number;
  description: string;
  soldCount: number;
  imageURL: string;
  detailsPictureURLPrimary: string;
  detailsPictureURLSecondary: string[];
  detailsTextPrimary: string;
  detailsTextSecondary: string;
}

export const GetProductDetails = async (
  id: string
): Promise<DetailedProductInfo> => {
  let res = await FetchGetBase(`${apiUrl}products/${id}`);
  return res.json();
};
export interface CategoryInfo {
  id: number;
  name: string;
  imageURL: string;
}
export const GetCategories = async (): Promise<CategoryInfo[]> => {
  let res = await FetchGetBase(`${apiUrl}categories`);
  return res.json();
};
