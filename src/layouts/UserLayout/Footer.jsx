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
      <div className="lg:hidden">
        <div className="mb-5 px-5">
          <h2 className="mb-2 font-bold text-2xl">ADDRESS</h2>
          <a>No. 000, ABC Ward, XYZ District, HCM</a>
          <p>Monday – Sunday: 9:00 AM – 10:00 PM</p>
          <br />
          <h2 className="mb-2 font-bold text-2xl">CAREERS</h2>
          <a>Recruitment Information</a>
        </div>
        <div className="px-5 flex flex-col">
          <h2 className="mb-2 font-bold text-2xl">CUSTOMER SERVICE</h2>
          <a className="text-sm">Support Request</a>
          <a className="text-sm">Product Care Guide</a>
          <a className="text-sm">Payment Guide</a>
          <a className="text-sm">Policies and Privacy</a>
          <br />
          <a className="text-sm" href="tel:0367854XXX">
            Hotline: <strong className="font-bold">036 7854 XXX</strong>
          </a>
          <a className="text-sm" href="mailto:clothes.noc@gmail.com">
            Email: <strong className="font-bold">clothes.noc@gmail.com</strong>
          </a>
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-3">
        <div className="border-2 border-x-0 border-black dark:border-white py-2 px-5 flex items-center">
          <FontAwesomeIcon className="text-2xl" icon={faTruckFast} />
          <div className="flex-1 flex flex-col mx-5">
            <h2 className="text-2xl font-bold">EXPRESS DELIVERY</h2>
            <p>within HCM city</p>
          </div>
        </div>
        <div className="border-2 border-black dark:border-white py-2 px-5 flex items-center">
          <FontAwesomeIcon className="text-2xl" icon={faArrowRightArrowLeft} />
          <div className="flex-1 flex flex-col mx-5">
            <h2 className="text-2xl font-bold">FREE RETURNS</h2>
            <p>within 3 days of receipt</p>
          </div>
        </div>
        <div className="border-2 border-x-0 border-black dark:border-white py-2 px-5 flex items-center">
          <FontAwesomeIcon className="text-2xl" icon={faPhoneVolume} />
          <div className="flex-1 flex flex-col mx-5">
            <h2 className="text-2xl font-bold">SUPPORT CONSULTATION</h2>
            <p>9:00 AM - 9:30 PM daily</p>
          </div>
        </div>
        <div className="border-2 border-x-0 border-t-0 border-black dark:border-white py-2 px-5 flex items-center"></div>
        <div className="border-2 border-r-0 border-t-0 border-black dark:border-white py-2 px-5">
          <h2 className="mb-2 font-bold text-2xl">ADDRESS</h2>
          <a>
            <FontAwesomeIcon className="text-md mr-5" icon={faLocationDot} />
            No. 000, ABC Ward, XYZ District, HCM
          </a>
          <p>
            <FontAwesomeIcon className="text-md mr-3" icon={faDoorOpen} />
            Monday – Sunday: 9:00 AM – 10:00 PM
          </p>
          <br />
          <h2 className="mb-2 font-bold text-2xl">CAREERS</h2>
          <a>Recruitment Information</a>
        </div>
        <div className="border-2 border-x-0 border-t-0 border-black dark:border-white py-2 px-5 flex flex-col">
          <h2 className="mb-2 font-bold text-2xl">CUSTOMER SERVICE</h2>
          <a className="text-sm">Support Request</a>
          <a className="text-sm">Product Care Guide</a>
          <a className="text-sm">Payment Guide</a>
          <a className="text-sm">Policies and Privacy</a>
          <br />
          <a className="text-sm" href="tel:0367854XXX">
            <FontAwesomeIcon className="text-md mr-3" icon={faPhone} />
            Hotline: <strong className="font-bold">036 7854 XXX</strong>
          </a>
          <a className="text-sm" href="mailto:clothes.noc@gmail.com">
            <FontAwesomeIcon className="text-md mr-3" icon={faEnvelope} />
            Email: <strong className="font-bold">clothes.noc@gmail.com</strong>
          </a>
        </div>
      </div>
    </footer>
  );
}
