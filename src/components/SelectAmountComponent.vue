<template>
  <div class="flex min-[1160px]:gap-x-2.5 gap-x-2 overflow-x-auto">
    <div
      v-for="(option, i) of options"
      :key="i"
      @click="selectOption(option)"
      class="w-[78px] h-[32px] bg-[#F6F6F6] rounded-[10px] border border-white text-[14px] leading-[16.3px] text-center font-medium text-[--color-opacity-6] hover:text-[--color] px-3 py-2 cursor-pointer rounded-2.5"
      :class="addActiveClass == option ? 'actived' : ''"
    >
      {{ option }}{{ selectedCurrency == "USD" ? "$" : "₽" }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        addActiveClass: ''
    }
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    selectedCurrency: {
      type: String,
      required: true,
    },
  },
  methods: {
    selectOption(option) {
      this.$emit("select", option);
      this.addActiveClass = option;
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
