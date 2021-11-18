import { IUser } from "../interfaces/user.interface";

export default function userMapping(user: {
  email: string;
  first_name: string;
  last_name: string;
  birthday: string;
  company: string;
  title_in_the_company: string;
  balance: number;
}): IUser {
  return {
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    birthday: user.birthday,
    company: user.company,
    titleInTheCompany: user.title_in_the_company,
    balance: user.balance,
  };
}
