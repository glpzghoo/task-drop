export const getUserRole = (): string => {
  const role = localStorage.getItem('userRole');
  if (!role) return 'none';

  return role;
};
