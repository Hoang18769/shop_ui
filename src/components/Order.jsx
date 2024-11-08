import { useEffect } from "react";

export default function Order() {
  useEffect(() => {
    document.title = "Order";
  }, []);
  return <div>Order</div>;
}
