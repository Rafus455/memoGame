import React, { createContext, ReactNode, useState } from 'react';

interface AppContextType {
  photos: string[];
  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
  gridSize: number;
  setGridSize: React.Dispatch<React.SetStateAction<number>>;
  requiredPhotos: number;
}

export const AppContext = createContext<AppContextType | any>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [gridSize, setGridSize] = useState<number>(4);

  const requiredPhotos = (gridSize * gridSize) / 2;

  return (
    <AppContext.Provider value={{ photos, setPhotos, gridSize, setGridSize, requiredPhotos }}>
      {children}
    </AppContext.Provider>
  );
};