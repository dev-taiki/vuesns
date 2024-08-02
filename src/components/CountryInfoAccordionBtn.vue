<template>
  <div class="mt-[15px]">
    <div @click.prevent="togglePanel" class="text-sm flex items-center gap-[5px] font-medium m-0 p-0 align-text-bottom text-[--color] hover:cursor-pointer">
      <div><IconWarning /></div>
      <p class="leading-[20.9px] max-[1160px]:text-[12px] font-medium leading-[14.06px] text-start text-wrap">{{ props.title }}</p> 
      <div><IconDown /></div>
    </div>
    <transition name="slide-fade" mode="in-out">
      <div v-if="showPanel">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import IconWarning from "./icons/IconWarning.vue";
import IconDown from "./icons/IconDown.vue";
import { ref, defineProps } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  ariaTitle: { type: String, required: true },
});

const showPanel = ref(false);

const togglePanel = () => {
  showPanel.value = !showPanel.value;
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
  max-height: 230px;
}

.slide-fade-leave-active {
  transition: all 0.4s ease-out;
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
</style>
