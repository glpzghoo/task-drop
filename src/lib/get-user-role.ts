export const ROLES = ['poster', 'helper', 'none'] as const;
export type UserRole = (typeof ROLES)[number];

const isUserRole = (v: unknown): v is UserRole =>
  typeof v === 'string' && (ROLES as readonly string[]).includes(v);

export const getUserRole = (): UserRole => {
  if (typeof window === 'undefined') return 'none';
  const role = localStorage.getItem('userRole');
  return isUserRole(role) ? role : 'none';
};

export const setUserRole = (role: UserRole) => {
  localStorage.setItem('userRole', role);
};
