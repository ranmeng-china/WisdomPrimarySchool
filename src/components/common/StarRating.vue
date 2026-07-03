<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    rating: number;
    maxStars?: number;
    starSize?: number;
  }>(),
  {
    maxStars: 3,
    starSize: 36,
  }
);
</script>

<template>
  <div class="star-rating">
    <div
      v-for="index in maxStars"
      :key="index"
      class="star-wrapper"
      :class="{ 'is-active': index <= rating }"
      :style="{ width: `${starSize}px`, height: `${starSize}px` }"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="star-svg"
      >
        <path
          d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
          class="star-path"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.star-rating {
  display: inline-flex;
  gap: 8px;
  align-items: center;
}

.star-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.star-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 2px 0 rgba(0, 0, 0, 0.15));
}

.star-path {
  fill: hsl(0, 0%, 80%);
  stroke: var(--color-text);
  stroke-width: 2px;
  stroke-linejoin: round;
  transition: fill 0.3s ease;
}

.is-active .star-path {
  fill: var(--color-warning);
}

.is-active {
  animation: popStar 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.5) forwards;
}

@keyframes popStar {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
