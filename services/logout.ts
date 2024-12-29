export const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
  
      if (!response.ok) {
        throw new Error('Failed to log out');
      }
  
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };
  