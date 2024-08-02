<template>
  <div
    @click="selectedMethod"
    class="flex items-center border-2 border-white bg-white md:pl-5 pl-3 md:w-[219.2px] md:h-[68px] w-[141px] h-[51px] rounded-[12px] drop-shadow-[0_0px_10px_rgba(0,0,0,0.06)] hover:drop-shadow-[0_0px_20px_rgba(0,0,0,0.06)] cursor-pointer"
    :class="addActiveClass == payment_item.title  ? 'actived': ''"
    v-bind:key="payment_item.code"
  >
    <img
      class="md:w-[48px] w-[36px]"
      :src="require(`@/assets/payment_img/${payment_item.code}.png`)"
      :alt="payment_item.code"
    />
    <div class="md:ml-3 ml-[6px]">
      <p
        class="md:text-base text-[13px] text-[--text-color] font-medium leading-[15.4px]"
      >
        {{ payment_item.title }}
      </p>
      <p class="md:text-[13px] text-[11px]">
        <span class="text-[--text-color-opacity]">Комиссия</span>:{{
          payment_item.commission
        }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
    name:'paymentItem',
    props: {
        payment_item: {
            type: Object,
            required: true,
        },
        addActiveClass: {
          type: String,
          require: true
        }
    },
    methods: {
        selectedMethod() {
          this.$store.commit('SET_SELECTED_METHOD', this.payment_item.title);
          this.$store.commit('SET_MIN_AMOUNT', this.payment_item.min_amount);
        },
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
