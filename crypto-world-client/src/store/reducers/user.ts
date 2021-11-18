import { userState } from "../state/userState";
import { UserActions } from "../../interfaces/store/actions/user.action";
import { userActionTypes } from "../actions/actionTypes";
import { Reducer } from "redux";
import { IUserState } from "../../interfaces/store/state";

const userReducer: Reducer<IUserState, UserActions> = (state = userState, action): IUserState => {
  switch (action.type) {
    case userActionTypes.INCREMENT_BALANCE:
      return { ...userState, balance: action.payload.balance + state.balance };
    case userActionTypes.DECREMENT_BALANCE:
      return { ...userState, balance: action.payload.balance - state.balance };
    case userActionTypes.BALANCE:
      return { ...userState, balance: action.payload.balance };
    default:
      return state;
  }
};

export default userReducer;
