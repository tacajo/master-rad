import { ISignInPayload } from "./auth.interface";
import { IUser } from "./user.interface";

export interface IHeaderProps {
  handleAuth: () => void;
  isAuth: boolean;
  user: IUser;
}

export interface ILoginProps {
  onClick: (e: React.FormEvent<HTMLFormElement>, payload: ISignInPayload) => void;
  message: string;
}
