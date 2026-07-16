const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email is required.";
  if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  return null;
}

export function validateRequired(value: string, label: string): string | null {
  if (!value.trim()) return `${label} is required.`;
  return null;
}

export function validateZip(value: string): string | null {
  if (!value.trim()) return "ZIP / postal code is required.";
  if (!/^[A-Za-z0-9\- ]{3,10}$/.test(value.trim())) {
    return "Enter a valid ZIP / postal code.";
  }
  return null;
}
