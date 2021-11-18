import { userActionTypes } from "../../../store/actions/actionTypes";

export interface IAction {
  type: string;
}

export interface IActionBalance {
  readonly type: userActionTypes.BALANCE;
  readonly payload: {
    balance: number;
  };
}

export interface IActionBalanceIncrement {
  readonly type: userActionTypes.INCREMENT_BALANCE;
  readonly payload: {
    balance: number;
  };
}

export interface IActionBalanceDecrement {
  readonly type: userActionTypes.DECREMENT_BALANCE;
  readonly payload: {
    balance: number;
  };
}

export type UserActions = IActionBalance | IActionBalanceDecrement | IActionBalanceIncrement;
