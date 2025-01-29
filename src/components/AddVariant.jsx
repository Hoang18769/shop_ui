import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function AddVariant({ product, setProduct }) {
  const [colors, setColors] = useState([]);
  const [filteredColors, setFilteredColors] = useState([]);
  const [filteredSizes, setFilteredSizes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const { token } = useContext(AppContext);
  const [form, setForm] = useState({
    productId: product?.id,
    quantity: 0,
    color: "", //code
    size: "", //name
    img: null, //file
    existedImageUrl: "", //string if choose an existed img instead of new img
  });

  const [imgInput, setImgInput] = useState();
  const fetchColorsAndSizes = () => {
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/admin/colors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) setColors(data.body);
      })
      .catch((error) => console.error(error));
    fetch(`${process.env.REACT_APP_BE_ORIGIN}/admin/sizes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) setSizes(data.body);
      })
      .catch((error) => console.error(error));
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];

      // Cập nhật form data và preview
      setForm((prev) => ({
        ...prev,
        [name]: file,
        existedImageUrl: "",
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setImgInput(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (name === "existedImageUrl") {
      setForm((prev) => ({
        ...prev,
        [name]: value,
        img: null,
      }));
      setImgInput(value);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateInput = () => {
    let isValid = true;
    if (!form?.color) {
      toast.warn("Please choose a color!");
      isValid = false;
    }
    if (!form?.size) {
      toast.warn("Please choose a size!");
      isValid = false;
    }
    if (!form?.existedImageUrl && !form?.img) {
      toast.warn("Please choose a image!");
      isValid = false;
    }
    if (form?.quantity < 0) {
      toast.warn("Quantity must greater than 0!");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    const formData = new FormData();
    formData.append("quantity", form.quantity);
    formData.append("color", form.color);
    formData.append("size", form.size);
    if (form.img) formData.append("img", form.img);
    formData.append("existedImageUrl", form.existedImageUrl);

    fetch(
      `${process.env.REACT_APP_BE_ORIGIN}/admin/${form.productId}/variants`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          toast.success("Variant added successfully!");
          setForm({
            productId: product?.id,
            quantity: 0,
            color: "", //code
            size: "", //name
            img: null, //file
            existedImageUrl: "", //string if choose an existed img instead of new img
          });
          setImgInput(null);
          setProduct((prev) => ({
            ...prev,
            variants: [...prev?.variants, data?.body],
          }));
        } else {
          toast.error(data.message || "Failed to add variant.");
        }
      })
      .catch((error) => {
        console.error("Error adding variant:", error);
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    if (token) {
      fetchColorsAndSizes();
    }
  }, [token]);

  useEffect(() => {
    if (form?.size && !form?.color) {
      const usedColors = new Set(
        product?.variants
          ?.filter((v) => v?.size?.name === form?.size)
          ?.map((v) => v?.color?.code)
      );
      setFilteredColors(colors?.filter((c) => !usedColors.has(c?.code)));
    } else if (form?.color && !form?.size) {
      const usedSizes = new Set(
        product?.variants
          ?.filter((v) => v?.color?.code === form?.color)
          ?.map((v) => v?.size?.name) // Đảm bảo bạn lấy kích cỡ bằng `v?.size?.name`
      );
      setFilteredSizes(sizes?.filter((s) => !usedSizes.has(s?.name))); // Lọc kích cỡ chưa được sử dụng cho màu này
    } else {
      setFilteredColors(colors);
      setFilteredSizes(sizes);
    }
  }, [form?.size, form?.color, product?.variant, colors, sizes]);
  useEffect(() => {
    if (form?.size !== "") {
      const usedColors = new Set(
        product?.variants
          ?.filter((v) => v?.size?.name === form?.size)
          ?.map((v) => v?.color?.code)
      );
      setFilteredColors(colors?.filter((c) => !usedColors.has(c?.code)));
    }
    if (form?.color !== "") {
      const usedSizes = new Set(
        product?.variants
          ?.filter((v) => v?.color?.code === form?.color)
          ?.map((v) => v?.size?.name) // Đảm bảo bạn lấy kích cỡ bằng `v?.size?.name`
      );
      setFilteredSizes(sizes?.filter((s) => !usedSizes.has(s?.name))); // Lọc kích cỡ chưa được sử dụng cho màu này
    }
    if (form?.color && form?.size) {
      setFilteredColors(colors);
      setFilteredSizes(sizes);
    }
  }, [form?.size, form?.color, product?.variant, colors, sizes]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 border-2 dark:border-gray-600 py-2 px-5 rounded-md shadow-md"
    >
      <h2 className="text-lg font-bold">Add new variant for {product?.name}</h2>
      <div>
        <label className="block font-semibold mb-2">Quantity</label>
        <input
          type="number"
          min="0"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-600"
          required
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-1">
          <h3 className="font-semibold">Choose a color: </h3>
          <div className="flex gap-2 my-2 flex-wrap">
            {filteredColors?.map((color, index) => (
              <label
                key={index}
                className="rounded-full w-6 lg:w-10 aspect-1 border-2 border-black dark:border-white text-transparent hover:opacity-30 cursor-pointer" // Điều chỉnh kích thước và thêm margin
                style={{ backgroundColor: color.code }}
                title={color?.name}
              >
                <input
                  type="radio"
                  name="color"
                  value={color?.code}
                  className="hidden"
                  onChange={handleChange}
                />
                <div
                  className={`bg-slate-300 w-full aspect-1 rounded-full opacity-50 flex justify-center items-center text-black ${
                    form.color === color?.code ? "block" : "hidden"
                  }`}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">Choose a size:</h3>
          <div className="flex gap-2 my-2 flex-wrap">
            {filteredSizes?.map((size, index) => (
              <label
                key={index}
                className={`rounded-full text-center text-sm lg:text-lg w-10 lg:w-12 py-2 border-2 border-black dark:border-white hover:opacity-30 cursor-pointer relative ${
                  form?.size === size.name &&
                  "bg-black text-white dark:bg-white dark:text-black"
                }`}
              >
                <input
                  type="radio"
                  name="size"
                  value={size?.name}
                  onChange={handleChange}
                  className="hidden"
                />
                {size.name}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 mt-2 mb-5">
        <div>
          {!imgInput && (
            <div>
              <label
                htmlFor="product-image-input"
                className="block font-semibold mb-2"
              >
                Upload an image
              </label>
              <label
                htmlFor="product-image-input"
                className="mt-2 h-60 w-60 lg:h-80 lg:w-80 flex items-center justify-center font-extrabold text-3xl shadow-md bg-white dark:bg-gray-600"
              >
                <FontAwesomeIcon icon={faPlus} />
              </label>
            </div>
          )}

          <input
            type="file"
            name="img"
            id="product-image-input"
            onChange={handleChange}
            className="hidden"
          />
          {imgInput && (
            <>
              <label
                htmlFor="product-image-input"
                className="block font-semibold mb-2"
              >
                Upload an image
              </label>
              <label htmlFor="product-image-input">
                <img
                  src={imgInput}
                  alt="Preview"
                  className="mt-2 h-60 w-60 lg:h-80 lg:w-80 object-cover border rounded hover:opacity-50"
                />
              </label>
            </>
          )}
        </div>

        <div>
          {product?.imgs && (
            <>
              <p>Or use an existed image below</p>
              <div className="flex gap-2 my-2 flex-wrap">
                {product?.imgs?.map((img, index) => (
                  <label key={index} className="w-20">
                    <input
                      type="radio"
                      name="existedImageUrl"
                      value={img}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <img src={img} />
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <button
        className="w-full bg-black h-14 text-white py-2 dark:bg-white dark:text-black uppercase"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}
