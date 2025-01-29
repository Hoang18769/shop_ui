import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../components/AppContext";

export default function AddProduct() {
  const { token } = useContext(AppContext);
  const [category, setCategory] = useState();
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    path: "",
    type: "",
    image: null,
    hoverImage: null,
  });

  const [previews, setPreviews] = useState({
    image: null,
    hoverImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];

      // Cập nhật form data và preview
      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setPreviews((prev) => ({
          ...prev,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateInput = () => {
    let isValid = true;
    if (!form?.name) {
      toast.warn("Please enter name of product!");
      isValid = false;
    }

    if (form?.price < 0) {
      toast.warn("Price must be greater than 0!");
      isValid = false;
    }

    if (!form?.description) {
      toast.warn("Please enter description of product!");
      isValid = false;
    }
    if (!form?.name) {
      toast.warn("Please enter path of product!");
      isValid = false;
    }

    if (!form?.type) {
      toast.warn("Please choose a type of product!");
      isValid = false;
    }

    if (form?.image === null) {
      toast.warn("Please upload an image of product!");
      isValid = false;
    }
    if (form?.hoverImage === null) {
      toast.warn("Please upload a hover image of product!");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validateInput()) return;
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("path", form.path);
    formData.append("type", form.type);
    if (form.image) formData.append("image", form.image);
    if (form.hoverImage) formData.append("hoverImage", form.hoverImage);

    fetch(`${process.env.REACT_APP_BE_ORIGIN}/admin/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          toast.success("Product added successfully!");
          setForm({
            name: "",
            price: "",
            description: "",
            path: "",
            type: "",
            image: null,
            hoverImage: null,
          });
          setPreviews({
            image: null,
            hoverImage: null,
          });
        } else {
          toast.error(data.message || "Failed to add product.");
        }
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        toast.error("Something went wrong!");
      });
  };

  const fetchCategory = () => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/admin/product-types`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategory(data.body));
  };

  useEffect(() => {
    document.title = "Add product";
  }, []);

  useEffect(() => {
    if (token) {
      fetchCategory();
    }
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">
            Product type
          </label>
          <select
            className="w-full p-2 border rounded dark:bg-gray-600 uppercase"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            {category?.map((c) => (
              <option value={c?.id}>
                {c?.type} - {c?.subtype}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-600"
            required
          />
        </div>
        <div className="flex justify-between gap-5">
          <div className="flex-1">
            <label className="block text-lg font-semibold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-600"
              min="0"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-lg font-semibold mb-2">Path</label>
            <input
              type="text"
              name="path"
              value={form.path}
              onChange={handleChange}
              placeholder="Ex: pants-1"
              className="w-full p-2 border rounded dark:bg-gray-600"
              required
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between">
          <div>
            <label
              htmlFor="product-image-input"
              className="block text-lg font-semibold mb-2"
            >
              Image
            </label>
            {!previews.image && (
              <label
                htmlFor="product-image-input"
                className="mt-2 h-60 w-60 lg:h-80 lg:w-80 flex items-center justify-center font-extrabold text-3xl shadow-md bg-white dark:bg-gray-600"
              >
                <FontAwesomeIcon icon={faPlus} />
              </label>
            )}
            <input
              type="file"
              name="image"
              id="product-image-input"
              onChange={handleChange}
              className="hidden"
            />
            {previews.image && (
              <label htmlFor="product-image-input">
                <img
                  src={previews.image}
                  alt="Preview"
                  className="mt-2 h-60 w-60 lg:h-80 lg:w-80 object-cover border rounded hover:opacity-50"
                />
              </label>
            )}
          </div>
          <div>
            <label
              htmlFor="product-hover-image-input"
              className="block text-lg font-semibold mb-2"
            >
              Hover Image
            </label>
            {!previews.hoverImage && (
              <label
                htmlFor="product-hover-image-input"
                className="mt-2 h-60 w-60 lg:h-80 lg:w-80 flex items-center justify-center font-extrabold text-3xl shadow-md bg-white dark:bg-gray-600"
              >
                <FontAwesomeIcon icon={faPlus} />
              </label>
            )}
            <input
              type="file"
              name="hoverImage"
              id="product-hover-image-input"
              onChange={handleChange}
              className="hidden"
            />
            {previews.hoverImage && (
              <label htmlFor="product-hover-image-input">
                <img
                  src={previews.hoverImage}
                  alt="Preview"
                  className="mt-2 h-60 w-60 lg:h-80 lg:w-80 object-cover border rounded hover:opacity-50"
                />
              </label>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
