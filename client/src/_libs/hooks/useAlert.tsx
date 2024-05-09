/** @jsxImportSource @emotion/react */
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import React, { useState, createContext, useContext, ReactNode } from 'react';

const AlertContext = createContext({ open: () => {}, close: () => {}, isOpen: false });

export const useAlertContext = () => useContext<{ open: () => void; close: () => void; isOpen: boolean }>(AlertContext);

export function AlertProvider({ children }: { children: ReactNode }) {
  const alert = useAlertContext();

  const [Alert, setAlert] = useState<EmotionJSX.Element | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ctx = useAlertContext();

  return (
    <AlertContext.Provider value={alert}>
      {children}
      <></>
    </AlertContext.Provider>
  );
}

export function useAlert(duration = 1500) {
  const open = (Component: EmotionJSX.Element) => setAlert(Component);
  const close = () => setAlert(null);

  return { open, close, isOpen };
}
