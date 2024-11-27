import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
import Product from "../components/Product";
export default function Home() {
  useEffect(() => {
    document.title = "Noc";
  }, []);

  const carouselImages = [
    require("../assets/images/banner/Banner-Web-1.jpg"),
    require("../assets/images/banner/Banner-Web-2.jpg"),
    require("../assets/images/banner/Banner-Web-3.jpg"),
    require("../assets/images/banner/Banner-Web-4.jpg"),
    require("../assets/images/banner/Banner-Web-5.jpg"),
  ];

  const categoryImages = [
    require("../assets/images/category/category-1.jpg"),
    require("../assets/images/category/category-2.jpg"),
    require("../assets/images/category/category-3.jpg"),
    require("../assets/images/category/category-4.jpg"),
  ];
  const vid1 = require("../assets/videos/vid1.mp4");

  const [newProducts, setNewProducts] = useState();
  const [bestSellers, setBestSellers] = useState();
  const [newProductsPage, setNewProductsPage] = useState(1);
  const [bestSellersPage, setBestSellersPage] = useState(1);
  const [newProductsTotalPage, setNewProductsTotalPage] = useState(1);
  const [bestSellersTotalPage, setBestSellersTotalPage] = useState(1);

  const fetchNewProducts = (newProductsPage) => {
    setNewProducts([
      {
        id: 1,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 2,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 3,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 4,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 5,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 6,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 7,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 8,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 9,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
    ]);
    setNewProductsTotalPage(1);
  };

  const fetchBestSellers = (bestSellersPage) => {
    setBestSellers([
      {
        id: 1,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 2,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 3,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 4,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 5,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 6,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 7,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 8,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
      {
        id: 9,
        name: "Relaxed Fit Kaki Pants",
        path: "rlkpants",
        price: 250000,
        quantity: 10,
        description: `NOCTURNAL ® Relaxed Fit Kaki Pants
Không chỉ trendy &đẹp với đường xếp li độc đáo , Quần Kaki ống suông nhà Nọc còn được nâng cấp về chất vải & có độ hoàn thiện cao, mang lại trải nghiệm mặc thoải mái hơn bao giờ hết, xứng đáng được gọi là cực phẩm cần phải có!

• Chất liệu : Premium cotton kaki dày dặn, mịn mềm.

• Thiết kế xếp li không chỉ làm quần lên form đẹp mà còn siêu thoải mái khi mặc với phần đùi rộng.

• :Phần lưng được bo chun co giãn dễ mặc và tùy chỉnh, phù hợp mọi dáng người.

• Size: S / M / L / XL

Xem từng ảnh để thấy những chi tiết thú vị nhé!

 

Note: Bảng size ở ảnh cuối mỗi mẫu hoặc ở mục Bảng quy đổi kích cỡ.`,
        colors: [
          {
            code: "#FFFFFF",
            name: "black",
          },
          {
            code: "#FF0000",
            name: "red",
          },
        ],
        type: {
          id: 1,
          name: "long pants",
          type: "bottom",
        },
        imgs: [
          "https://nocturnal.vn/wp-content/uploads/2024/05/4-1-scaled.jpg",
          "https://nocturnal.vn/wp-content/uploads/2024/05/5-4-scaled.jpg",
        ],
      },
    ]);
    setBestSellersTotalPage(1);
  };

  useEffect(() => {
    fetchNewProducts(newProductsPage);
  }, [newProductsPage]);
  useEffect(() => {
    fetchBestSellers(bestSellersPage);
  }, [bestSellersPage]);

  return (
    <div className="flex flex-col gap-5">
      <Carousel images={carouselImages} />
      <div className="flex justify-center gap-4 my-5 uppercase">
        <Link to="/product-category/top" className="w-1/4 group relative">
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-extrabold text-lg lg:text-3xl drop-shadow-md">
            top
          </h2>
          <img
            src={categoryImages[0]}
            alt="top"
            className="h-[200px] lg:h-[450px] object-cover group-hover:scale-105 rounded-md transition-transform duration-300"
          />
        </Link>
        <Link to="/product-category/bottom" className="w-1/4 group relative">
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-extrabold text-lg lg:text-3xl drop-shadow-md">
            bottom
          </h2>
          <img
            src={categoryImages[1]}
            alt="bottom"
            className="h-[200px] lg:h-[450px] object-cover group-hover:scale-105 rounded-md transition-transform duration-300"
          />
        </Link>
        <Link
          to="/product-category/top/hoodies-sweaters"
          className="w-1/4 group relative"
        >
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-extrabold text-lg lg:text-3xl drop-shadow-md">
            outerwear
          </h2>
          <img
            src={categoryImages[2]}
            alt="outerwear"
            className="h-[200px] lg:h-[450px] object-cover group-hover:scale-105 rounded-md transition-transform duration-300"
          />
        </Link>
        <Link to="/product-category/accessory" className="w-1/4 group relative">
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-extrabold text-lg lg:text-3xl drop-shadow-md">
            accessories
          </h2>
          <img
            src={categoryImages[3]}
            alt="accessories"
            className="h-[200px] lg:h-[450px] object-cover group-hover:scale-105 rounded-md transition-transform duration-300"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="font-bold text-4xl">New Arrivals</h2>
          <Link to="/product" className="hover:underline">
            View all
          </Link>
        </div>
        <div className="new-products-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {newProducts?.map((p, index) => (
            <Product key={index} product={p} />
          ))}
        </div>
        <Link
          to="/product"
          className="py-2 px-10 border-4 border-gray-100 self-center hover:bg-gray-100 dark:hover:text-black font-semibold"
        >
          View more
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="font-bold text-4xl">Best Sellers</h2>
          <Link to="/product" className="hover:underline">
            View all
          </Link>
        </div>
        <div className="new-products-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestSellers?.map((p, index) => (
            <Product key={index} product={p} />
          ))}
        </div>
        <Link
          to="/product"
          className="py-2 px-10 border-4 border-gray-100 self-center hover:bg-gray-100 dark:hover:text-black font-semibold"
        >
          View more
        </Link>
      </div>
      <hr className="hr-full" />
      <div className="flex gap-5">
        <div className="w-2/3 border-r-2 border-black dark:border-white">
          <video autoPlay muted loop>
            <source src={vid1} type="video/mp4" />
          </video>
        </div>
        <div className="w-1/3">
          <h2 className="font-bold text-4xl">About us</h2>
          <p>
            Launched in Saigon in 2022, Nocturnal® is not only a local brand,
            but also a symbol of creativity and passion. Founded by a group of
            young, passionate designers, Nocturnal ® bears the spirit of the
            people who love to live the nightlife.
          </p>
          <p>
            Nocturnal® not only creates fashion, but also creates a story, a
            lifestyle and personality 💙 Step by step, Nocturnal® is now a
            familiar name among Vietnamese youth, Now, they are determined to
            spread their enthusiasm at night to every corner of Asia.
          </p>
        </div>
      </div>
    </div>
  );
}
