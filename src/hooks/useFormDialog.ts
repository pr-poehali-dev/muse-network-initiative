import { useState } from 'react';

export const useFormDialog = <T extends Record<string, any>>(initialData: T) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<T>(initialData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reset = () => {
    setIsOpen(false);
    setFormData(initialData);
    setIsSubmitted(false);
  };

  return {
    isOpen,
    setIsOpen,
    formData,
    setFormData,
    isSubmitted,
    setIsSubmitted,
    reset,
  };
};
