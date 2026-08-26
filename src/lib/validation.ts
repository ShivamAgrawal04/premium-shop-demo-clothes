export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateEnquiry(data: {
  name: string;
  phone: string;
  occasion: string;
  message: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[+]?[\d\s-]{10,15}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!data.occasion) {
    errors.occasion = "Please select an occasion";
  }

  if (data.message && data.message.length > 500) {
    errors.message = "Message must be under 500 characters";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateAppointment(data: {
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[+]?[\d\s-]{10,15}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "Please enter a valid phone number";
  }

  if (!data.date) {
    errors.date = "Please select a date";
  }

  if (!data.time) {
    errors.time = "Please select a time";
  }

  if (!data.service) {
    errors.service = "Please select a service";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
