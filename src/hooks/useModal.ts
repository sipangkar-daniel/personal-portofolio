import { useState, useCallback } from "react";

export function useModal<T = unknown>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const openModal = useCallback((payload: T) => {
    setData(payload);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Delay clearing data slightly to allow close animation to complete
    setTimeout(() => {
      setData(null);
    }, 300);
  }, []);

  return {
    isOpen,
    data,
    openModal,
    closeModal,
  };
}
