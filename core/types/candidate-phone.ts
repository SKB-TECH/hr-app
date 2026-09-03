// Placeholder types for candidate phone-number verification. No backend
// endpoint for this exists in the integrated API surface yet — see the
// matching services for the assumed (unconfirmed) request shape.
export type RequestPhoneVerificationInput = { phoneNumber: string };
export type ConfirmPhoneVerificationInput = { phoneNumber: string; otp: string };
