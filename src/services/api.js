import axios from 'axios';

// Axios request interceptor
axios.interceptors.request.use((config) => {
  if (config.url === '/api/ui/payments/info') {
    config.adapter = async () => {
      return {
        data: {
          success: true,
          data: {
            default_currency: 'RUB',
            currencies: {
              CRYPTO: [
                {
                  title: 'Cryptomus',
                  code: 'cryptomus',
                  commission: '0.5%',
                  min_amount: 100,
                  description: 'Зачисление до 1 часа',
                  sort_order: 1,
                },
              ],
              RUB: [
                {
                  title: 'Картой РФ',
                  code: 'card',
                  commission: '8%',
                  min_amount: 100,
                  description: 'Зачисление до 1 часа',
                  sort_order: 2,
                },
                {
                  title: 'Payeer',
                  code: 'payeer',
                  commission: '5%',
                  min_amount: 30,
                  description: 'Зачисление до 6 минут<br>Эта платежная система не принимает платежи из стран:<br>Армения, Белоруссия, Казахстан, Киргизия',
                  sort_order: 1,
                },
              ],
              USD: [
                {
                  title: 'Картой',
                  code: 'card_usd',
                  commission: '7%',
                  min_amount: 100,
                  description: '',
                  sort_order: 1,
                },
                {
                  title: 'Payeer',
                  code: 'payeer',
                  commission: '1%',
                  min_amount: 30,
                  description: 'Зачисление до 6 минут<br>Эта платежная система не принимает платежи из стран:<br>Армения, Белоруссия, Казахстан, Киргизия',
                  sort_order: 2,
                },
                {
                  title: 'PayPal',
                  code: 'paypal',
                  commission: '10% + $0.50 FEE',
                  min_amount: 30,
                  description: 'If you create a chargeback or open a dispute, your account will be instantly <span style="color: red;">blocked!</span>',
                  sort_order: 2,
                },
              ],
            },
          },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    };
  } else if (config.url === '/api/ui/payments/invoice/create/') {
    config.adapter = async () => {
      return {
        data: {
          success: true,
          message: 'Success',
          data: {
            url: 'https://example.com/payment',
          },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    };
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axios;
