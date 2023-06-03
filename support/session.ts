import { User } from "./types/model";

export const getSession = (): User => {
  return {
    id: 8,
    name: "Lorem Ipsum",
    email: "selahattin.unlu@yandex.com",
    companies: [
      {
        id: 2,
        name: "Philipa",
        roles: [
          {
            id: 5,
            name: "SEO",
            permissions: {
              categories: ["index", "create", "show", "update", "destroy"],
            },
          },
        ],
      },

      {
        id: 3,
        name: "Swiftmade",
        roles: [
          {
            id: 6,
            name: "Super Admin",
            permissions: {
              products: ["index", "store", "show", "update", "destroy"],
            },
          },
        ],
      },
    ],
  };
};
