import React, { createContext, useContext, useEffect, useState } from 'react';

const Context = createContext(null);

export function EmployeeArrayProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // FETCH EMPLOY
    // return () =>
  }, []);

  return (
    <Context.Provider value={{ data: employees, actions: {}, loading }}>
      {children}
    </Context.Provider>
  );
}

const useEmployeeArray = () => useContext(Context);

export { useEmployeeArray };
