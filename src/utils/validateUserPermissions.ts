type User = {
  roles: string;
};

type ValidateUserPermissionsParams = {
  user?: User;
  roles?: string;
};

export function validateUserPermissions({
  user,
  roles,
}: ValidateUserPermissionsParams) {
  if (roles !== undefined) {
    const hasAllRoles = user?.roles.includes(roles);

    if (!hasAllRoles) {
      return false;
    }
  }

  return true;
}
