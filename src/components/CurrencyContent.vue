<template>
    <div @click="selectCurrency" class="text-[--color] min-[1160px]:text-sm text-xs font-medium rounded-[12px] bg-white min-[1160px]:py-[15px] min-[1160px]:px-5 px-4 py-2.5 flex items-center border-2 border-white gap-x-2.5 drop-shadow-[0_0px_15px_rgba(0,0,0,0.06)] hover:drop-shadow-[0_0px_15px_rgba(0,0,0,0.1)] cursor-pointer" :class="addClass" v-bind:key="currency.code">
        <img class="rounded-full min-[1160px]:w-[28px] min-[1160px]:h-[28px] object-cover w-[24px] h-[24px]" :src="require(`@/assets/${currency.log}.png`)" :alt="`{{ currency.code }}`">
        <p>{{ currency.title }}</p>
    </div>
</template>

<script>
    export default {
        name: 'CurrencyContent',
        props: {
            currency: {
                type: Object,
                required: true
            },
            addClass: String
        },
        methods: {
            selectCurrency() {
                this.$store.commit('SET_SELECTED_CURRENCY', this.currency.code);
            }
            
        }
    }
</script>

<style scoped>

</style>