export const ADMIN_EMAIL = "pmtbmt@gmail.com";

export function isAdmin(userEmail: string | undefined | null): boolean {
  return userEmail === ADMIN_EMAIL;
}
