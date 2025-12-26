export const setTheme = (theme: 'light' | 'dark'): void => {
  localStorage.setItem('activeTheme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

export const getTheme = (): 'light' | 'dark' => {
  const savedTheme = localStorage.getItem('activeTheme') as 'light' | 'dark' | null;
  return savedTheme || 'dark';
};

export const toggleTheme = (): 'light' | 'dark' => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  return newTheme;
};