import HasPermission from "@/app/HasPermission";
import Link from "next/link";

interface Props {
  params: {
    companyId: string;
  };
}

const Page = ({ params }: Props) => {
  return (
    <div>
      <header>İşlem yapılan şirket: {params.companyId}</header>

      <HasPermission
        companyId={params.companyId}
        subject="products"
        action="index"
      >
        <Link href={`/company/${params.companyId}/products`} className="block">
          Ürünler
        </Link>
      </HasPermission>

      <HasPermission
        companyId={params.companyId}
        subject="categories"
        action="index"
      >
        <Link href={`/company/${params.companyId}/products`} className="block">
          Kategoriler
        </Link>
      </HasPermission>
    </div>
  );
};

export default Page;
