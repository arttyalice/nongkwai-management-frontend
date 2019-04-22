export const UserModule = {
    state: {
        position: [],
    },
    mutations: {
        setPositionData (state, payload) {
            state.position = payload
        },
    },
    actions: {
        setPositionData ({ commit }, data) {
            commit({
                type: 'setPositionData',
                payload: data,
            });
        },
    },
    getters: {},
  }
  