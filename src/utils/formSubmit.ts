import { FormEvent } from 'react';

interface FormSubmitOptions<T> {
  url: string;
  formData: T;
  onSuccess: () => void;
  errorContext: string;
}

export const handleFormSubmit = async <T>({
  url,
  formData,
  onSuccess,
  errorContext,
}: FormSubmitOptions<T>) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      onSuccess();
    } else {
      console.error(`Failed to submit ${errorContext}`);
    }
  } catch (error) {
    console.error(`Error submitting ${errorContext}:`, error);
  }
};

export const createFormSubmitHandler = <T>(
  options: Omit<FormSubmitOptions<T>, 'formData'> & { getFormData: () => T }
) => {
  return async (e: FormEvent) => {
    e.preventDefault();
    await handleFormSubmit({
      ...options,
      formData: options.getFormData(),
    });
  };
};
