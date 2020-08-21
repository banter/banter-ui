import API from '../../../constants/api';
// import LEAGUES from '../../../constants/sports';
import MOCKTEAMS from '../../../constants/mock-teams';
import apiRequest from '../../helpers/api-request';

export default {
  state: {
    teams: MOCKTEAMS,
    leagues: [],
    isRequestingTeams: false,
    isRequestingLeagues: false,
    errored: false,
    error: '',
  },
  actions: {
    fetchLeagues({ commit }) {
      const requestData = {
        url: `${API.BASE_URL}${API.LEAGUES}`,
      };
      const mutations = {
        preCommit: 'fetchLeaguesRequest',
        successCommit: 'fetchLeaguesSuccess',
        errorCommit: 'leagueError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
    fetchTeams({ commit }) {
      const requestData = {
        url: `${API.BASE_URL}${API.TEAMS}`,
      };
      const mutations = {
        preCommit: 'fetchTeamsRequest',
        successCommit: 'fetchTeamsSuccess',
        errorCommit: 'leagueError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
  },
  mutations: {
    fetchLeagueRequest(state) {
      state.isRequestingLeagues = true;
    },
    fetchLeagueSuccess(state, payload) {
      state.leagues = payload;
      state.isRequestingLeagues = false;
    },
    leagueError(state, error) {
      state.isRequestingLeagues = false;
      state.errored = true;
      state.error = error.message;
    },
    fetchTeamsRequest(state) {
      state.isRequestingTeams = true;
    },
    fetchTeamsSuccess(state, payload) {
      state.teams = payload;
      state.isRequestingTeams = false;
    },
    teamsError(state, error) {
      state.isRequestingTeams = false;
      state.errored = true;
      state.error = error.message;
    },

  },
  getters: {
    getNFLTeams(state) {
      return state.teams.filter((team) => team.type === 'person');
    },
    getNBATeams(state) {
      return state.teams.filter((team) => team.type === 'team');
    },
    getLeagues(state) {
      return state.teams;
    },
  },
};
