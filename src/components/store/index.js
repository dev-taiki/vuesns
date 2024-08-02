import Vuex from 'vuex';
import axios from 'axios'
// import { getPaymentInfo, createInvoice } from '@/services/api';

export default new Vuex.Store({
  state: {
    currencies: [],
    paymentMethods: {},
    selectedMethods: [],
    selectedCurrency: null,
    showFlag: null,
    selectedMethod: null,
    amount: 0,
    minAmount: 0,
  },
  mutations: {
    SET_CURRENCY(state, currencies) {
      state.currencies = currencies;

    },
    SET_PAYMENT_METHODS(state, methods) {
      state.paymentMethods = methods;
    },
    SET_SELECTED_METHODS(state, currencies) {
      state.selectedMethods = currencies;
    },
    SET_SELECTED_CURRENCY(state, currency) {
      state.selectedCurrency = currency == 'cryptomus' ? 'CRYPTO' : currency;
      if(currency != 'cryptomus') {
        state.showFlag = currency;
      }
    },
    SET_SELECTED_METHOD(state, method) {
      state.selectedMethod = method;
    },
    SET_AMOUNT(state, amount) {
      state.amount = amount;
    },
    SET_MIN_AMOUNT(state, minAmount) {
      state.minAmount = minAmount;
    },
  },
  actions: {
    async fetchPaymentInfo({ commit }) {
      try {
        const response = await axios.get('/api/ui/payments/info');
        const data = response.data.data;
        let currencies = Object.keys(data.currencies);
        let payMethodsData = null;
        payMethodsData = data.currencies[data.default_currency]
        let selectedMethod = payMethodsData[0].title;
        let selectedMinAmount = payMethodsData[0].min_amount
        commit('SET_CURRENCY',currencies);
        commit('SET_SELECTED_CURRENCY', data.default_currency);
        commit('SET_PAYMENT_METHODS', data.currencies);
        commit('SET_SELECTED_METHOD', selectedMethod);
        commit('SET_MIN_AMOUNT', selectedMinAmount);

      } catch (error) {
        console.error('Failed to fetch payment info:', error);
      }
    },
    onCurrencySelected({ commit }, currency) {
      commit('SET_SELECTED_CURRENCY', currency);
    },
    onMethodSelected({ commit }, method) {
      commit('SET_SELECTED_METHOD', method);
      commit('SET_MIN_AMOUNT', method.min_amount);
    },
    onAmountInput({ commit }, amount) {
      commit('SET_AMOUNT', amount);
    },
    async handlePayment({ state }) {
      console.log(state.amount.substr(0, state.amount.length-1));
      const amount = typeof(state.amount) == 'string' ? Number(state.amount.substr(0, state.amount.length-1)) : state.amount
      if (!state.selectedMethod || amount < state.minAmount) {
        alert('Please select a valid payment method and enter a valid amount.');
        return;
      }

      try {
        const response = await axios.post('/api/ui/payments/invoice/create/');
        if (response.data.success) {
          window.location.href = response.data.data.url;
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Failed to create invoice:', error);
      }
    },
  },
});
