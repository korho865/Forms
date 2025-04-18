import { createContext, useContext, useState } from 'react';

const HobbyTrackerContext = createContext();

export const HobbyTrackerProvider = ({ children }) => {
  const [hobbies, setHobbies] = useState([]);

  const addHobby = async (hobby) => {
    await new Promise((res) => setTimeout(res, 1000));
    if (Math.random() < 0.2) {
      return { success: false, error: 'Saving failed' };
    }
    setHobbies((prev) => [...prev, hobby]);
    return { success: true };
  };

  const deleteHobbies = async () => {
    await new Promise((res) => setTimeout(res, 500));
    setHobbies([]);
  };

  return (
    <HobbyTrackerContext.Provider value={{ hobbies, addHobby, deleteHobbies }}>
      {children}
    </HobbyTrackerContext.Provider>
  );
};

export const useHobbyTracker = () => useContext(HobbyTrackerContext);
