<script setup>
import { ref, watch, onUnmounted } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "success", // success, error, warning, info
  },
  show: {
    type: Boolean,
    required: true,
  },
  duration: {
    type: Number,
    default: 4000, // 4 seconds
  },
});

const emit = defineEmits(["close"]);

const visible = ref(false);
let timer;

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      visible.value = true;
      startTimer();
    }
  }
);

const startTimer = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    closeAlert();
  }, props.duration);
};

const closeAlert = () => {
  visible.value = false;
  emit("close");
};

onUnmounted(() => {
  clearTimeout(timer);
});
</script>

<template>
  <Transition name="fade-slide">
    <div
      v-if="visible"
      :class="[
        'alert',
        `alert-${type}`,
        'alert-dismissible',
        'position-fixed',
      ]"
    >
      {{ message }}
      <button
        type="button"
        class="btn-close"
        @click="closeAlert"
        aria-label="Close"
      ></button>
    </div>
  </Transition>
</template>

<style scoped>
/* Positioning the alert at the center */
.alert {
  display: flex;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  min-width: 250px;
  z-index: 1050;
  text-align: center;
  font-size: 1rem;
}

/* Transition Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translate(-50%, -60%);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -40%);
}
</style>
