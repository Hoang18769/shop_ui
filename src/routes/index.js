import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import Account from "../pages/Account";
import Category from "../pages/Category";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import OrderDetail from "../pages/OrderDetail";
import Dashboard from "../pages/Dashboard";
import ManageOrder from "../pages/ManageOrders";
import ManageProductTypes from "../pages/ManageProductTypes";
import ManageColors from "../pages/ManageColors";
import ManageSizes from "../pages/ManageSizes";
import ManageProducts from "../pages/ManageProducts";
import AddProduct from "../pages/AddProduct";
import ManageProductDetail from "../pages/ManageProductDetail";
import OAuth2LoginCallback from "../pages/OAuth2LoginCallback";
export const routes = [
  {
    path: "/",
    component: Home,
    layout: UserLayout,
  },
  {
    path: "oauth2_callback",
    component: OAuth2LoginCallback,
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
    path: "/admin",
    component: Dashboard,
    layout: AdminLayout,
  },
  {
    path: "/admin/dashboard",
    component: Dashboard,
    layout: AdminLayout,
  },
  {
    path: "/admin/orders",
    component: ManageOrder,
    layout: AdminLayout,
  },
  {
    path: "/admin/products",
    component: ManageProducts,
    layout: AdminLayout,
  },
  {
    path: "/admin/products/add",
    component: AddProduct,
    layout: AdminLayout,
  },
  {
    path: "/admin/products/:type",
    component: ManageProducts,
    layout: AdminLayout,
  },
  {
    path: "/admin/product/:path",
    component: ManageProductDetail,
    layout: AdminLayout,
  },
  {
    path: "/admin/products/:type/:subtype",
    component: ManageProducts,
    layout: AdminLayout,
  },
  {
    path: "/admin/product-types",
    component: ManageProductTypes,
    layout: AdminLayout,
  },
  {
    path: "/admin/colors",
    component: ManageColors,
    layout: AdminLayout,
  },
  {
    path: "/admin/sizes",
    component: ManageSizes,
    layout: AdminLayout,
  },
  {
    path: "*",
    component: NotFound,
    layout: UserLayout,
  },
];
