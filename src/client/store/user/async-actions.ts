/**
 * async actions for the user state
 */
import API from "@client/api";
import { User } from "@client/store/user/models";
import { getUserAsync } from "@client/store/user/actions";
import { StoreState, StoreDispatcher, StoreAsyncAction } from "@client/store";

// prettier-ignore
// tslint:disable-next-line: typedef
export const getUser = (): StoreAsyncAction => async (dispatch: StoreDispatcher, getState: () => StoreState, api: API): Promise<void> => {
  dispatch(getUserAsync.request());

  try {
    const user: User = await api.user.getUser();
    dispatch(getUserAsync.success(user));
  } catch (err) {
    dispatch(getUserAsync.failure(<Error>err));
  }
};
