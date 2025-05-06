//funcion sin enriqueser el usuario
export function can(user, permission) {
  try {
    const perms = user?.role?.permissions;
    if (!Array.isArray(perms)) return false;
    // Busca en el campo `name` de cada permiso
    return perms.some((p) => p.name === permission);
  } catch {
    return false;
  }
}
//funcion original
// export function can(user, permission) {
//     try {
//         if (!user || !user.permissions) {
//             return false; // No user or no permissions defined
//         }
//         return user.permissions.includes(permission);
//     } catch (error) {
//         console.error("An error occurred in the 'can' function:", error);
//         return false; // Default to false in case of an error
//     }
// }
