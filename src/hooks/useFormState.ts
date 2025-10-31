import { useState, useCallback } from 'react';

export interface FormState {
  name: string;
  email: string;
  phone: string;
  telegram: string;
  message: string;
  [key: string]: string;
}

export const useFormState = <T extends FormState>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setIsSubmitted(false);
    setIsSubmitting(false);
  }, [initialState]);

  const handleSubmit = useCallback(async (
    url: string,
    onSuccess?: () => void
  ) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        onSuccess?.();
        setTimeout(() => {
          resetForm();
        }, 2000);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Ошибка отправки');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Ошибка отправки формы');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, resetForm]);

  return {
    formData,
    setFormData,
    isSubmitting,
    isSubmitted,
    handleSubmit,
    resetForm
  };
};
