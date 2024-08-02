<template>
  <div class="mt-[30px] relative">
    <p class="text-[--text-color] min-[1160px]:text-xl text-sm font-normal">
      Выберите способ оплаты
    </p>
    <div
      class="flex h-auto flex-wrap md:gap-3 md:p-2.5 px-0 py-2.5 gap-1 overflow-auto mt-[5px] max-h-[214px]"
      id="payMethod"
    >
      <PaymentItemComponent
        v-for="item in processedPaymentMethods"
        :payment_item="item"
        :key="item.code"
        :addActiveClass="selectedPay"
        @select="selectedMethod"
      ></PaymentItemComponent>
    </div>
  </div>
  <!-- {{ processedPaymentMethods }} -->
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PaymentItemComponent from "./PaymentItemComponent.vue";

export default {
  data() {
    return {
      paymentMethod: "",
    };
  },
  components: {
    PaymentItemComponent,
  },
  setup() {
    const store = useStore();

    const processedPaymentMethods = computed(() => {
      const methods = store.state.paymentMethods;
      const selectedCurrency = store.state.selectedCurrency;

      let selectedMethods = methods[selectedCurrency];
      return selectedMethods;
    });
    const selectedPay = computed(() => store.state.selectedMethod);
    
    return {
      processedPaymentMethods,
      selectedPay,
    };
  },
  methods: {
    selectedMethod(method) {
      this.paymentMethod = method;
    },
  },
};
</script>

<style scoped>
.active-method {
  border-radius: 12px;
  border-color: transparent;
  background: linear-gradient(#fff, #fff) padding-box,
    linear-gradient(#e2c299 6%, #c5a67c 94%) border-box;
}
#payMethod::-webkit-scrollbar {
  width: 4px;
  height: 10px;
  background-color: #ffffff;
  border-radius: 25px;
  position: absolute;
  right: -10px;
}

#payMethod::-webkit-scrollbar-thumb {
  background-color: #d8d8d8;
  border-radius: 50px;
}
</style>
