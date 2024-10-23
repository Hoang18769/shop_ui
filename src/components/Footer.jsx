import {
  faArrowRightArrowLeft,
  faDoorOpen,
  faEnvelope,
  faLocationDot,
  faLocationPin,
  faPhone,
  faPhoneVolume,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Footer() {
  return (
    <footer>
      <div class="lg:hidden">
        <div class="mb-5 px-5">
          <h2 class="mb-2 font-bold text-2xl font-semibold">ĐỊA CHỈ</h2>
          <a href="">Số 000, Phường ABC, Quận XYZ, HCM</a>
          <p>Thứ Hai – Chủ Nhật: 9:00 – 22:00</p>
          <br />
          <h2 class="mb-2 font-bold text-2xl font-semibold">TUYỂN DỤNG</h2>
          <a href="">Thông tin tuyển dụng</a>
        </div>
        <div class="px-5 flex flex-col">
          <h2 class="mb-2 font-bold text-2xl font-semibold">KHÁCH HÀNG</h2>
          <a class="text-sm" href="">
            Yêu cầu hỗ trợ
          </a>
          <a class="text-sm" href="">
            Hướng dẫn bảo quản sản phẩm
          </a>
          <a class="text-sm" href="">
            Hướng dẫn thanh toán
          </a>
          <a class="text-sm" href="">
            Quy định và bảo mật
          </a>
          <br />
          <a class="text-sm" href="tel:0367854XXX">
            Hotline: <strong class="font-bold"> 036 7854 XXX</strong>
          </a>
          <a class="text-sm" href="mailto:clothes.noc@gmail.com">
            Mail: <strong class="font-bold"> clothes.noc@gmail.com</strong>
          </a>
        </div>
      </div>
      <div class="hidden lg:grid grid-cols-3">
        <div class="border-2 border-x-0 border-black dark:border-white py-2 px-5 flex items-center">
          <FontAwesomeIcon className="text-2xl" icon={faTruckFast} />
          <div class="flex-1 flex flex-col mx-5">
            <h2 class="text-2xl font-bold">VẬN CHUYỂN SIÊU TỐC</h2>
            <p>trong nội thành TPHCM</p>
          </div>
        </div>
        <div class="border-2 border-black dark:border-white py-2 px-5 flex items-center">
          <FontAwesomeIcon className="text-2xl" icon={faArrowRightArrowLeft} />
          <div class="flex-1 flex flex-col mx-5">
            <h2 class="text-2xl font-bold">MIỄN PHÍ ĐỔI TRẢ</h2>
            <p>trong vòng 03 ngày sau khi nhận hàng</p>
          </div>
        </div>
        <div class="border-2 border-x-0 border-black dark:border-white py-2 px-5 flex items-center">
          <FontAwesomeIcon className="text-2xl" icon={faPhoneVolume} />
          <div class="flex-1 flex flex-col mx-5">
            <h2 class="text-2xl font-bold">TƯ VẤN HỖ TRỢ</h2>
            <p>9:00 - 21:30 hằng ngày</p>
          </div>
        </div>
        <div class="border-2 border-x-0 border-t-0 border-black dark:border-white py-2 px-5 flex items-center"></div>
        <div class="border-2 border-r-0 border-t-0 border-black dark:border-white py-2 px-5">
          <h2 class="mb-2 font-bold text-2xl font-semibold">ĐỊA CHỈ</h2>
          <a href="">
            <FontAwesomeIcon className="text-md mr-5" icon={faLocationDot} />
            Số 000, Phường ABC, Quận XYZ, HCM
          </a>
          <p>
            <FontAwesomeIcon className="text-md mr-3" icon={faDoorOpen} />
            Thứ Hai – Chủ Nhật: 9:00 – 22:00
          </p>
          <br />
          <h2 class="mb-2 font-bold text-2xl font-semibold">TUYỂN DỤNG</h2>
          <a href="">Thông tin tuyển dụng</a>
        </div>
        <div class="border-2 border-x-0 border-t-0 border-black dark:border-white py-2 px-5 flex flex-col">
          <h2 class="mb-2 font-bold text-2xl font-semibold">KHÁCH HÀNG</h2>
          <a class="text-sm" href="">
            Yêu cầu hỗ trợ
          </a>
          <a class="text-sm" href="">
            Hướng dẫn bảo quản sản phẩm
          </a>
          <a class="text-sm" href="">
            Hướng dẫn thanh toán
          </a>
          <a class="text-sm" href="">
            Quy định và bảo mật
          </a>
          <br />
          <a class="text-sm" href="tel:0367854XXX">
            <FontAwesomeIcon className="text-md mr-3" icon={faPhone} />
            Hotline: <strong class="font-bold"> 036 7854 XXX</strong>
          </a>
          <a class="text-sm" href="mailto:clothes.noc@gmail.com">
            <FontAwesomeIcon className="text-md mr-3" icon={faEnvelope} />
            Mail: <strong class="font-bold"> clothes.noc@gmail.com</strong>
          </a>
        </div>
      </div>
    </footer>
  );
}
