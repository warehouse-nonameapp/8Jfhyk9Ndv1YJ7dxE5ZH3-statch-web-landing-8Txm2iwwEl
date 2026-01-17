export const ValidationUtils = {
    EMAIL_REGEX: /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/,

    isValidEmail(email: string): boolean {
        return this.EMAIL_REGEX.test(email);
    }
};
