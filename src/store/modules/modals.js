export default {
  state: {
    userHasAccount: false,
  },
  mutations: {
    authingUserHasAccount(state, userHasAccount) {
      state.userHasAccount = userHasAccount;
    },
  },
};
