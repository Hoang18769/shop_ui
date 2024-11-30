import {
  faBoxesPacking,
  faChain,
  faCheck,
  faEllipsis,
  faMoneyCheck,
  faPlus,
  faSpinner,
  faTruckFast,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Status({ status }) {
  let icon;
  let color;
  let bg;
  switch (status) {
    case "NEW":
      icon = <FontAwesomeIcon icon={faPlus} />;
      bg = "bg-yellow-100";
      color = "text-yellow-500";
      break;
    case "PENDING":
      icon = <FontAwesomeIcon icon={faSpinner} />;
      bg = "bg-yellow-100";
      color = "text-yellow-500";
      break;
    case "PACKING":
      icon = <FontAwesomeIcon icon={faBoxesPacking} />;
      bg = "bg-violet-100";
      color = "text-violet-500";
      break;
    case "DELIVERY":
      icon = <FontAwesomeIcon icon={faTruckFast} />;
      bg = "bg-cyan-100";
      color = "text-cyan-500";
      break;
    case "SUCCESS":
      icon = <FontAwesomeIcon icon={faCheck} />;
      bg = "bg-green-100";
      color = "text-green-600";
      break;
    case "FAILED":
    case "CANCELLED":
    case "REJECTED":
      icon = <FontAwesomeIcon icon={faXmark} />;
      bg = "bg-red-100";
      color = "text-red-600";
      break;
  }
  return (
    <div
      className={`h-10 py-2 px-4 rounded-full flex items-center justify-start gap-2 shadow dark:shadow-gray-400 ${bg} ${color}`}
    >
      <div className="h-6 w-6 text-center">{icon}</div>
      <p className="font-sm font-bold"> {status}</p>
    </div>
  );
}
