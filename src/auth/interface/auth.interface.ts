export interface AuthPayload {
  id: string;
  email: string;
  verified: boolean;
}

export interface ISignupInstance {
  email?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  password: string;
}

export interface ILoginInstance {
  email: string;
  password: string;
}  
  
export interface IOtpInstance{
  email: string;
  otp:string
}

export interface IResendOtpInstance {
  email: string;
  otp: string
}

export interface IEmail {
  email: string;
}

export interface ISignupInstance {
  email?: string;
  first_name?: string;
  last_name?: string;
  password: string;
  industry: string;
  occupation: string
  country_of_residence: string; 
}

export interface IUserInstance {
  id: string
  email: string;
  phone_number: string;
  is_email_verified: boolean
  is_phone_number_verified: boolean
}

