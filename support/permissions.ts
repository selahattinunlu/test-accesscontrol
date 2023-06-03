import { User } from "./types/model";

interface Permission {
  companyId: string;
  subject: string;
  action: "index" | "store" | "show" | "update" | "destroy";
}

export const hasPermission = (user: User, permission: Permission): boolean => {
  if (!user) {
    return false;
  }

  const company = user.companies.find(
    (company) => String(company.id) === permission.companyId
  );

  if (!company) {
    return false;
  }

  const role = company.roles.find((role) => {
    if (!role.permissions.hasOwnProperty(permission.subject)) {
      return false;
    }

    return role.permissions[permission.subject].includes(permission.action);
  });

  if (!role) {
    return false;
  }

  return true;
};
