import { menuItems } from "./menuConfig";
import type { Role } from "../types/users";

export const routeAccessMap: Record<string, Role[]> = menuItems.reduce(
  (acc, item) => {
    acc[item.path] = item.allowedRoles as Role[];

    item.subItems?.forEach((sub) => {
      acc[sub.path] = sub.allowedRoles as Role[];
    });

    return acc;
  },
  {} as Record<string, Role[]>
);

// Optional: routes that are not in sidebar menu but should be accessible to both
routeAccessMap["/home/preference"] = ["ADMIN", "USER"];