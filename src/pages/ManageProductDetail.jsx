import { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import AddVariant from "../components/AddVariant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function EditProduct() {
  const { token } = useContext(AppContext);
  const [product, setProduct] = useState();
  const { path } = useParams();

  const fetchProduct = () => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/admin/products/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setProduct(data.body);
        }
      })
      .catch((e) => toast.error(e.message));
  };

  useEffect(() => {
    if (token) {
      fetchProduct();
    }
  }, [token]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <div className="mb-6">
        <img
          src={product.img}
          alt={product.name}
          className="w-32 h-32 object-cover mb-2"
        />
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: {product.price.toLocaleString()} VND</p>
        <p>Path: {product.path}</p>
        <p>Type: {product.type.type}</p>
        <p>Subtype: {product.type.subtype}</p>
      </div>
      <div>
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold mb-2">Variants</h2>
          <label
            htmlFor="checkbox-add-new-variant"
            className=" bg-black text-white py-2 px-5 rounded-md flex items-center justify-center gap-2"
          >
            <p>New</p>
            <FontAwesomeIcon icon={faPlus} />
          </label>
        </div>
        <input
          type="checkbox"
          name="checkbox-add-new-variant"
          id="checkbox-add-new-variant"
          className="peer/checkbox-add-new-variant hidden"
        />
        <div className="my-5 hidden peer-checked/checkbox-add-new-variant:block">
          <AddVariant product={product} setProduct={setProduct} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {product.variants.map((variant) => (
          <div
            key={variant.id}
            className="border p-4 rounded-lg shadow-sm flex flex-col items-center"
          >
            <img
              src={variant.img}
              alt={`Variant ${variant.size.name}`}
              className="w-24 h-24 object-cover mb-2"
            />
            <p>Size: {variant.size.name}</p>
            <p>Color: {variant.color.name}</p>
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: variant.color.code }}
            ></div>
            <p>Quantity: {variant.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
