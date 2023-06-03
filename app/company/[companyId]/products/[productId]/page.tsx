import { getSession } from "@/support/session";

const ProductShow = (a: any) => {
  console.log("a", a);
  const user = getSession();

  return (
    <div>
      <h1>Product Index</h1>
    </div>
  );
};

export default ProductShow;
