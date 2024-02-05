import { createContext, useContext, useReducer } from "react";
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();
faker.seed(100);

const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.urlLoremFlickr({ category: 'product' })  ,
    inStock:(Math.floor(Math.random() * 5) + 1),
    fastDelivery: faker.datatype.boolean(),
    ratings:(Math.floor(Math.random() * 5) + 1),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
    
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  console.log(productState);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
