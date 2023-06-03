import { hasPermission } from "@/support/permissions";
import { getSession } from "@/support/session";

interface Props {
  companyId: string;
  action: "index" | "store" | "show" | "update" | "destroy";
  subject: string;
  children: React.ReactNode;
}

const HasPermission: React.FC<Props> = ({
  companyId,
  action,
  subject,
  children,
}) => {
  const user = getSession();

  if (
    !hasPermission(user, {
      companyId,
      action,
      subject,
    })
  ) {
    return null;
  }

  return <>{children}</>;
};

export default HasPermission;
