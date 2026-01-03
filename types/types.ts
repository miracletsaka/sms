import { ROLE_STATUS } from "@/generated/prisma";

export type ClientRole = {
  name: string;
  icon: string;
  color: string;
  description: string;
  users: number;
  permissions: number;
  dateCreated: string;
  status: ROLE_STATUS;
};
