import UserLayout from "../layouts/UserLayout";
import Account from "../pages/Account";
import Category from "../pages/Category";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import OrderDetail from "../pages/OrderDetail";
export const routes = [
  {
    path: "/",
    component: Home,
    layout: UserLayout,
  },
  {
    path: "/product-category",
    component: Category,
    layout: UserLayout,
  },
  {
    path: "/product-category/:type",
    component: Category,
    layout: UserLayout,
  },
  {
    path: "/product-category/:type/:subtype",
    component: Category,
    layout: UserLayout,
  },
  {
    path: "/product/:path",
    component: Product,
    layout: UserLayout,
  },
  {
    path: "/account",
    component: Account,
    layout: UserLayout,
  },
  {
    path: "/checkout",
    component: Checkout,
    layout: UserLayout,
  },
  {
    path: "/order/:id",
    component: OrderDetail,
    layout: UserLayout,
  },
  {
    path: "*",
    component: NotFound,
    layout: UserLayout,
  },
];
