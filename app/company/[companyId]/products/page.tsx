import { hasPermission } from "@/support/permissions";
import { getSession } from "@/support/session";
import { redirect } from "next/navigation";

interface Props {
  params: {
    companyId: string;
  };
}

const ProductIndex = ({ params }: Props) => {
  const user = getSession();

  if (
    !hasPermission(user, {
      companyId: params.companyId,
      action: "index",
      subject: "products",
    })
  ) {
    return redirect("/403");
  }

  return (
    <div>
      <h1>Product Index</h1>
    </div>
  );
};

export default ProductIndex;
