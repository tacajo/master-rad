import { UserActions } from "../../interfaces/store/actions/user.action";
import { userActionTypes } from "./actionTypes";

export function incrementBalance(balance: number): UserActions {
  return {
    type: userActionTypes.INCREMENT_BALANCE,
    payload: {
      balance,
    },
  };
}

export function decrementBalance(balance: number): UserActions {
  return {
    type: userActionTypes.DECREMENT_BALANCE,
    payload: {
      balance,
    },
  };
}

export function setBalance(balance: number): UserActions {
  return {
    type: userActionTypes.BALANCE,
    payload: {
      balance,
    },
  };
}
