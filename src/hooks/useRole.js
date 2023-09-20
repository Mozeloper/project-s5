import { useState, useEffect } from 'react';

const useRole = () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    try {
      const roles = JSON.parse(sessionStorage.getItem('role'));
      if (roles) {
        setRole(roles);
        console.log(roles)
      }
    } catch (error) {
      console.error(error);
    }
  }, [sessionStorage.getItem('role')]);

  return role;
};

export default useRole;
