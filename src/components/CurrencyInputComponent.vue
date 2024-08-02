<template>
  <div class="min-[1160px]:my-[30px] my-5">
    <p class="min-[1160px]:text-xl text-sm font-normal text-[--color]">
      Укажите сумму платежа
    </p>
    <div :class="['relative w-full p-[2px] rounded-[13px] min-[1160px]:my-[15px] my-2.5',this.invalidClass? 'focus:border bg-[#E86068] border-[#E86068]': 'focus:bg-gradient-to-l focus-within:bg-gradient-to-l focus from-[#E2C299] from-[6%] to-[94%] to-[#C5A67C]',]">
      <input type="text" v-model="this.seletedOpt" @focus="onFocus" @input="onInput"
        class="h-[51px] min-[1160px]:text-base text-sm min-[1160px]:px-6 min-[1160px]:py-4 p-4 w-full rounded-[12px] bg-white border border-[#000000]/10 text-[--color-opacity-6] min-[1160px]:text-base text-sm focus:outline-none focus:border-transparent hover:border-[#000000]/30 hover:text-[--color] hover:placeholder:text-[--color]"
        id="name"
        :placeholder="`Минимальная сумма платежа: ${this.minAmount}${this.selectedCurrency == 'USD' ? '$' : '₽'}`" />
      <button v-if="this.seletedOpt" @click="clearInput" class="absolute right-5 top-5">
        <IconClose />
      </button>
    </div>
    <p v-if="errorMessage" class="text-[#E86068] mt-[3px] px-[3px] min-[1160px]:text-sm text-[12px]">{{ errorMessage }}
    </p>
    <SelectAmountComponent :options="this.Amount" :selectedCurrency="selectedCurrency" @select="this.selectedOption" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { CurrencyAmount } from "./data/CurrencyAmount";
import SelectAmountComponent from "./SelectAmountComponent.vue";
import IconClose from "./icons/IconClose.vue";

export default {
  data() {
    return {
      seletedOpt: "",
      Amount: CurrencyAmount,
      inputValue: "",
      errorMessage: "",
      invalidClass: false,
    };
  },
  setup() {
    const store = useStore();
    const minAmount = computed(() => store.state.minAmount);
    const selectedCurrency = computed(() => store.state.selectedCurrency);
    return {
      minAmount,
      selectedCurrency,
    };
  },
  computed: {
    getInputVal: {
      set(val) {
        this.selectedOpt = val;

      }
    }
  },
  methods: {
    selectedOption(opt) {
      let cur = this.selectedCurrency == 'USD' ? '$' : '₽'
      this.seletedOpt = opt + cur;
    },
    onFocus() {
    },
    onInput(event) {
      event.preventDefault();
      const value = event.target.value;
      let num = Number(value);
      if (num >= this.minAmount) {
        this.inputValue = num;
        this.invalidClass = false;
        this.errorMessage = '';
      } else if (isNaN(num)) {
        this.invalidClass = true;
        this.errorMessage = "Пожалуйста, введите номер."
      }
      else if (num < this.minAmount) {
        this.invalidClass = true;
        this.errorMessage = `Внимание, минимальная сумма ${this.minAmount}${this.selectedCurrency == 'USD' ? '$' : '₽'} `
      } else if (typeof (num) == 'undefined') {
        this.invalidClass = false;
        this.seletedOpt = "";
        this.errorMessage = "";
        this.inputValue = "";
        this.errorMessage = ""
      }
    },
    clearInput() {
      this.seletedOpt = "";
      this.errorMessage = "";
      this.inputValue = "";
      this.invalidClass = false;
    },
  },
  components: {
    SelectAmountComponent,
    IconClose,
  },
};
</script>

<style scoped>
.actived {
  border-radius: 12px;
  border-color: transparent;
  background: linear-gradient(#fff, #fff) padding-box,
    linear-gradient(#e2c299 6%, #c5a67c 94%) border-box;
}
</style>
