<template>
  <div class="my-[30px]">
    <div>
      <p class="min-[1160px]:text-xl text-sm leading-[16.41px] font-normal leading-[23.44px] text-[--color]">
        Выберите валюту оплаты
        <IconQuestion />
      </p>
    </div>
    <div class="mt-[15px] min-[514px]:block hidden">
      <div class="flex md:gap-x-6 flex-wrap gap-6">
        <div @click.prevent="toggleCryptoPanel"
          class="relative flex items-center rounded-[12px] bg-white min-[1160px]:px-5 min-[1160px]:gap-x-2.5 gap-x-2 px-4 min-[1160px]:py-[15px] py-3 drop-shadow-[0_0px_15px_rgba(0,0,0,0.06)] cursor-pointer">
          <div
            class="min-[1160px]:text-sm text-[13px] flex items-center min-[1160px]:gap-x-2.5 gap-x-2 font-medium drop-shadow-[0_0px_15px_rgba(0,0,0,0.06)] text-[--color]">
            <IconBitCoin />
            <p>Криптовалюты</p>
          </div>
          <div
            class="min-[1160px]:text-[10px] text-[9px] text-[--color] text-white min-[1160px]:py-0.5 py-[1.5px] min-[1160px]:px-1.5 px-1 absolute top-[3px] right-[3px] bg-gradient-to-l from-[#E2C299] from-[6%] to-[#C5A67C] to-[94%] rounded-full">
            Рекомендуем
          </div>
        </div>
        <div @click.prevent="toggleCurrencyPanel"
          class="flex rounded-[12px] items-center bg-white min-[511px]:h-[68px] rounded-xl drop-shadow-[0_0px_15px_rgba(0,0,0,0.06)] lg:py-2 lg:px-1 py-1 px-0.5 gap-x-2.5 cursor-pointer">
          <div class="flex items-center gap-x-3 text-[#212529] py-3 py- pl-4 pr-5 border-r border-[#E5E5E5]">
            <img v-if="showFlag" class="rounded-full md:w-[28px] md:h-[28px] object-cover w-[24px] h-[24px]" :src="require(`@/assets/currency_img/${showFlag.toLowerCase()}.png`)
              " :alt="showFlag" />
            <p v-if="showFlag" class="text-base leading-[15.36px] font-medium">
              {{ showFlag }}
            </p>
          </div>
          <div class="flex gap-x-2.5 text-sm px-3 py-3 pr-4 font-medium items-center text-[--color]">
            <IconExchange />
            Другие валюты
            <IconDown :className="[setClassName ? 'rotate-180' : 'rotate-0']" />
          </div>
        </div>
      </div>
      <transition name="slide-fade" mode="in-out" class="mt-6 mb-5">
        <div v-if="showCryptoPanel" class="flex gap-x-[15px]">
          <CurrencyContent v-for="currency in cryptoCurrency" :key="currency.code" :currency="currency"
            :addClass="currency.code == 'cryptomus' ? 'active' : ''" />
        </div>
        <div v-else-if="this.showCurrencyPanel" class="flex gap-x-[15px]">
          <CurrencyContent v-for="currency in otherCurrency" :key="currency.code" :currency="currency"
            :addClass="currency.code == showFlag ? 'active' : ''" />
        </div>
      </transition>
    </div>
    <div class="mt-2.5 min-[514px]:hidden grid gap-3.5">
      <div>
        <div @click.prevent="toggleCryptoPanel"
          class="relative max-w-[160px] flex items-center rounded-[12px] bg-white px-4 py-3 drop-shadow-[0_0px_15px_rgba(0,0,0,0.06)] cursor-pointer">
          <div
            class="min-[1160px]:text-sm text-[13px] flex items-center min-[1160px]:gap-x-2.5 gap-x-2 font-medium drop-shadow-[0_0px_15px_rgba(0,0,0,0.06)] text-[--color]">
            <IconBitCoin />
            <p>Криптовалюты</p>
          </div>
          <div
            class="min-[1160px]:text-[10px] text-[9px] text-[--color] text-white min-[1160px]:py-0.5 py-[1.5px] min-[1160px]:px-1.5 px-1 absolute top-[2px] right-[2px] bg-gradient-to-l from-[#E2C299] from-[6%] to-[#C5A67C] to-[94%] rounded-full">
            Рекомендуем
          </div>
        </div>

        <transition name="slide-fade" mode="in-out" class="mt-3">
          <div v-if="showCryptoPanel" class="flex gap-x-[15px]">
            <CurrencyContent v-for="currency in cryptoCurrency" :key="currency.code" :currency="currency"
              :addClass="currency.code == 'cryptomus' ? 'active' : ''" />
          </div>
        </transition>
      </div>
      <div class="flex min-[503px]:gap-x-6 flex-wrap gap-y-3">
        <div @click.prevent="toggleCurrencyPanel"
          class="flex rounded-[12px] items-center bg-white min-[511px]:h-[68px] rounded-xl drop-shadow-[0_0px_15px_rgba(0,0,0,0.06)] lg:py-2 lg:px-1 py-1 px-0.5 gap-x-2.5 cursor-pointer">
          <div class="flex items-center gap-x-3 text-[#212529] py-2 pl-3 pr-4 border-r border-[#E5E5E5]">
            <img v-if="showFlag" class="rounded-full md:w-[28px] md:h-[28px] object-cover w-[24px] h-[24px]" :src="require(`@/assets/currency_img/${showFlag.toLowerCase()}.png`)
              " :alt="showFlag" />
            <p v-if="showFlag" class="text-base leading-[15.36px] font-medium">
              {{ showFlag }}
            </p>
          </div>
          <div class="flex gap-x-2 text-[13px] px-3 p-2 font-medium items-center text-[--color]">
            <IconExchange />
            Другие валюты
            <IconDown :className="[setClassName ? 'rotate-180' : 'rotate-0']" />
          </div>
        </div>
        <transition name="slide-fade" mode="in-out">
          <div v-if="this.showCurrencyPanel" class="flex gap-x-[15px]">
            <CurrencyContent v-for="currency in otherCurrency" :key="currency.code" :currency="currency"
              :addClass="currency.code == showFlag ? 'active' : ''" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import IconBitCoin from "./icons/IconBitCoin.vue";
import IconDown from "./icons/IconDown.vue";
import IconQuestion from "./icons/IconQuestion.vue";
import CurrencyContent from "./CurrencyContent.vue";
import IconExchange from "./icons/IconExchange.vue";

export default {
  data() {
    return {
      showCryptoPanel: false,
      showCurrencyPanel: false,
      selectCountry: null,
      selectCrypto: null,
      setClassName: false,
      showSPCryptoPanel: false,
    };
  },
  setup() {
    const store = useStore();

    const showFlag = computed(() => store.state.showFlag);

    const cryptoCurrency = computed(() => {
      const methods = store.state.paymentMethods;
      const currencies = store.state.currencies;
      const key = currencies.filter((i) => i == "CRYPTO");
      let crypto = methods[key];
      let newData = {};
      let newArray = [];
      if (Array.isArray(crypto)) {
        crypto.map((currency) => {
          newData.title = currency.title.substr(0, 6);
          newData.code = currency.code;
          newData.log = `crypto_img/${currency.code}`;
        });
      }
      newArray.push(newData);
      return newArray;
    });

    const otherCurrency = computed(() => {
      const currencies = store.state.currencies;
      let othCurrency = currencies
        .filter((i) => i != "CRYPTO")
        .map((currency) => ({
          title: currency,
          code: currency,
          log: `currency_img/${currency.toString().toLowerCase()}`,
        }));
      return othCurrency;
    });

    return {
      cryptoCurrency,
      otherCurrency,
      showFlag,
    };
  },
  components: {
    IconBitCoin,
    IconDown,
    IconQuestion,
    CurrencyContent,
    IconExchange,
  },
  methods: {
    toggleCryptoPanel() {
      this.showCryptoPanel = !this.showCryptoPanel;
      if (this.setClassName) {
        this.setClassName = false;
      }
      if (this.showCurrencyPanel) {
        this.showCurrencyPanel = false;
      }
    },
    toggleCurrencyPanel() {
      this.showCurrencyPanel = !this.showCurrencyPanel;
      this.setClassName = !this.setClassName;
      if (this.showCryptoPanel) {
        this.showCryptoPanel = false;
      }
    },
    toggleCryptoPanelSP() {

    }
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  max-height: 230px;
  transition: all 0.3s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
  max-height: 230px;
}

.slide-fade-enter-from {
  max-height: 0px;
  opacity: 0;
}

.slide-fade-leave-to {
  max-height: 0px;
  opacity: 0;
}

.active {
  border-radius: 12px;
  border-color: transparent;
  background: linear-gradient(#fff, #fff) padding-box,
    linear-gradient(#e2c299 6%, #c5a67c 94%) border-box;
}
</style>
