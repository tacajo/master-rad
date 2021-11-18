export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignInResponse {
  data: string;
  message: string;
  error: boolean;
}

export interface ISignUpPayload {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  birthday: string;
  company: string;
  titleInTheCompany: string;
}


