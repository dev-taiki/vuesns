<template>
  <div
    class="min-[1160px]:max-w-[1160px] min-[1160px]:mx-auto w-full px-[15px] min-[1160px]:px-0 py-10"
  >
    <h1 class="min-[1160px]:text-4xl text-lg leading-[19.8px] font-bold text-[--color] leading-[42px]">
      Пополните баланс,
      <span class="font-medium text-[--color-opacity-6]">
        чтобы получить номер для приема смс
      </span>
    </h1>
    <CurrencySelectComponent
      @currency-selected="onCurrencySelected"
    />
    <PaymentComponent
      @method-selected="onMethodSelected"
    />  
    <AccordionPanel
      aria-title="in"
      title="Внимание, при нажатии раскрывается информация про страны"
    >
      <AccordionContent></AccordionContent>
    </AccordionPanel>
    <CurrencyInputComponent
      :minAmount="minAmount"
      @amount-input="onAmountInput"
    />
    <button class = "rounded-[12px] bg-gradient-to-l from-[#E2C299] from-[6%] to-[#C5A67C] to-[94%] hover:from-[#E2C299]/90 hover:to-[#C5A67C]/90 w-full text-white text-xl font-medium min-[1160px]:p-5 px-5 py-3.5" @click="handlePayment">Оплатить </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AccordionPanel from "./CountryInfoAccordionBtn.vue";
import AccordionContent from "./CountryInfoAccordionContent.vue";
import CurrencySelectComponent from "./CurrencySelectComponent.vue";
import PaymentComponent from "./PaymentComponent.vue";
import CurrencyInputComponent from "./CurrencyInputComponent.vue";

export default {
  name: "MainComponent",
  components: {
    AccordionPanel,
    AccordionContent,
    CurrencySelectComponent,
    PaymentComponent,
    CurrencyInputComponent,
  },
  methods: {
    ...mapActions(['fetchPaymentInfo', 'handlePayment']),
    onCurrencySelected(currency) {
      this.selectedCurrency = currency;
      this.paymentMethods = this.currencies[currency];
      this.selectedMethod = null; // Reset selected method when currency changes
    },
    onMethodSelected(method) {
      this.selectedMethod = method;
      this.minAmount = method.min_amount;
    },
    onAmountInput(amount) {
      this.amount = amount;
    },
    onhandlePayment() {
      this.handlePayment();
    },
  },
  mounted() {
    this.fetchPaymentInfo()
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
