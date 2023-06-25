import { apiUrl } from './constants';
interface ArrayProps {
  quantity: number;
  productId: number;
}
export const PostOrderData = async (token: string, products: ArrayProps[]) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      orderProducts: products,
    }),
  };

  await fetch(`${apiUrl}orders`, requestOptions)
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      } else {
        return res.json();
      }
    })
    .catch((err) => {
      throw err;
    });
};
