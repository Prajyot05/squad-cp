export const ADMIN_GITHUB_USERNAME = "Prajyot05";

export function isAdmin(userName: string | undefined | null): boolean {
  return userName?.toLowerCase() === ADMIN_GITHUB_USERNAME.toLowerCase();
}
