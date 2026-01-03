// create a new role
"use server"

import { prisma } from "@/lib/prisma";
import { ClientRole } from "@/types/types";

export async function createRole(role: ClientRole) {

    const newRole = await prisma.userRole.create({
      data: {
        name: role.name,
        icon: role.icon,
        color: role.color,
        description: role.description,
        permissions: role.permissions,
        status: role.status
      }
    });

    if (newRole) {
      return "success";
    } else {
      return "error";
    }

}

export async function updateRole(roleId: string, role: ClientRole) {

    const updatedRole = await prisma.userRole.update({
      where: { id: roleId },
      data: {
        name: role.name,
        icon: role.icon,
        color: role.color,
        description: role.description,
        permissions: role.permissions
      }
    });

    if (updatedRole) {
      return "success";
    } else {
      return "error";
    }

}

export async function deleteRole(roleId: string) {

    const deletedRole = await prisma.userRole.delete({
      where: { id: roleId }
    });
    if (deletedRole) {
      return "success";
    } else {
      return "error";
    }
}
