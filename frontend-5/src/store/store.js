import { createStore } from 'vuex';

export default createStore({
  state: {
    itemArray: []
  },
  mutations: {
    setItemArray(state, items) {
      state.itemArray = items;
    },
    addItem(state, item) {
      state.itemArray.push(item);
    },
    deleteItem(state, itemId) {
        const index = state.itemArray.findIndex(item => item.id === itemId);
        if (index !== -1) {
          state.itemArray.splice(index, 1);
        }
    }
  },
  actions: {
    updateItemArray({ commit }, items) {
      commit('setItemArray', items);
    },
    addItemToCart({ commit }, item) {
      commit('addItem', item);
    },
    removeItemFromCart({ commit }, itemId) {
        commit('deleteItem', itemId);
    }
  },
  getters: {
    getItemArray: (state) => state.itemArray
  }
});