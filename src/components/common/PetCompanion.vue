<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    petType?: 'cat' | 'dog';
    mood?: 'idle' | 'happy' | 'sad' | 'cheer';
    speech?: string;
    inline?: boolean;
  }>(),
  {
    petType: 'cat',
    mood: 'idle',
    speech: '',
    inline: false
  }
);
</script>

<template>
  <div class="pet-companion-container" :class="[mood, { 'is-inline': inline }]">
    <div v-if="speech" class="speech-bubble animate-pop-in">
      <div class="bubble-content" v-html="speech"></div>
      <div class="bubble-arrow"></div>
    </div>

    <div class="pet-body-wrapper">
      <div class="character-inner" :class="[petType, mood]">
        <div class="ear-left"></div>
        <div class="ear-right"></div>
        <div class="face">
          <div class="blush"></div>
          <div class="sweat" v-if="mood === 'sad'"></div>
          <div class="eyes">
            <div class="eye eye-left">
              <div class="pupil"></div>
            </div>
            <div class="eye eye-right">
              <div class="pupil"></div>
            </div>
          </div>
          <div class="nose-mouth">
            <div class="nose"></div>
            <div class="mouth"></div>
          </div>
        </div>
        <div class="collar">
          <div class="bell"></div>
        </div>
        <div class="body-main">
          <div class="paw paw-left"></div>
          <div class="paw paw-right"></div>
        </div>
        <div class="tail"></div>
      </div>
      
      <div class="particles" v-if="mood === 'happy'">
        <span class="particle star-1">⭐</span>
        <span class="particle heart-1">💖</span>
        <span class="particle star-2">✨</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pet-companion-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
}

.pet-companion-container.is-inline {
  position: relative;
  bottom: auto;
  right: auto;
  z-index: auto;
}

.speech-bubble {
  position: relative;
  background: white;
  border: 3px solid var(--color-text, #333);
  border-radius: 16px;
  padding: 10px 16px;
  max-width: 220px;
  box-shadow: 0 6px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.bubble-content {
  font-size: 15px;
  font-weight: bold;
  color: var(--color-text, #333);
  line-height: 1.6;
  text-align: center;
}

:deep(.bubble-content ruby) {
  ruby-position: over;
  font-size: 14px;
}

:deep(.bubble-content rt) {
  font-size: 10px;
  color: var(--color-text-light, #666);
  font-weight: normal;
}

.bubble-arrow {
  position: absolute;
  bottom: -11px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid var(--color-text, #333);
}

.bubble-arrow::after {
  content: '';
  position: absolute;
  top: -11px;
  left: -6px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid white;
}

.pet-body-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
}

.character-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

.character-inner.idle {
  animation: pet-float 3s ease-in-out infinite;
}

.character-inner.happy {
  animation: pet-happy-bounce 0.6s ease-in-out infinite alternate;
}

.character-inner.sad {
  animation: pet-sad-shake 0.8s ease-in-out infinite;
}

.character-inner.cheer {
  animation: pet-cheer-bounce 0.8s ease-in-out infinite;
}

.face {
  position: absolute;
  top: 15px;
  left: 10px;
  width: 80px;
  height: 70px;
  border-radius: 50% 50% 45% 45%;
  border: 4px solid var(--color-text, #333);
  z-index: 10;
  overflow: hidden;
}

.cat .face {
  background: #fbf5e6;
}

.dog .face {
  background: #f5cf8c;
}

.ear-left, .ear-right {
  position: absolute;
  width: 24px;
  height: 24px;
  border: 4px solid var(--color-text, #333);
  z-index: 5;
}

.cat .ear-left {
  top: 5px;
  left: 10px;
  background: #fbf5e6;
  border-radius: 6px 0 0 0;
  transform: rotate(-15deg) skewY(-20deg);
}

.cat .ear-right {
  top: 5px;
  right: 10px;
  background: #fbf5e6;
  border-radius: 0 6px 0 0;
  transform: rotate(15deg) skewY(20deg);
}

.dog .ear-left {
  top: 15px;
  left: 2px;
  width: 20px;
  height: 40px;
  background: #c99342;
  border-radius: 50% 10% 30% 50%;
  transform: rotate(10deg);
}

.dog .ear-right {
  top: 15px;
  right: 2px;
  width: 20px;
  height: 40px;
  background: #c99342;
  border-radius: 10% 50% 50% 30%;
  transform: rotate(-10deg);
}

.eyes {
  position: absolute;
  top: 24px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  height: 14px;
}

.eye {
  position: relative;
  width: 14px;
  height: 14px;
  background: var(--color-text, #333);
  border-radius: 50%;
  animation: eye-blink 4s infinite;
}

.pupil {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
}

.sad .eye {
  height: 4px;
  border-radius: 2px;
  transform: rotate(10deg);
}

.sad .eye-right {
  transform: rotate(-10deg);
}

.nose-mouth {
  position: absolute;
  top: 36px;
  left: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nose {
  width: 8px;
  height: 6px;
  background: var(--color-text, #333);
  border-radius: 50% 50% 40% 40%;
}

.mouth {
  position: relative;
  width: 12px;
  height: 8px;
  border-bottom: 3px solid var(--color-text, #333);
  border-radius: 0 0 50% 50%;
}

.cat .mouth::before {
  content: '';
  position: absolute;
  left: 4px;
  top: -2px;
  width: 3px;
  height: 4px;
  border-left: 2px solid var(--color-text, #333);
}

.dog .mouth {
  width: 10px;
  height: 10px;
  border: 3px solid var(--color-text, #333);
  background: #ff7675;
  border-radius: 0 0 8px 8px;
  border-top: none;
}

.blush {
  position: absolute;
  bottom: 12px;
  left: 8px;
  width: 10px;
  height: 6px;
  background: rgba(255, 107, 107, 0.4);
  border-radius: 50%;
  box-shadow: 52px 0 0 rgba(255, 107, 107, 0.4);
}

.happy .blush {
  background: rgba(255, 107, 107, 0.8);
  box-shadow: 52px 0 0 rgba(255, 107, 107, 0.8);
}

.sweat {
  position: absolute;
  top: 10px;
  right: 8px;
  width: 6px;
  height: 12px;
  background: #74b9ff;
  border-radius: 50%;
  opacity: 0.8;
  animation: sweat-drop 1.5s infinite;
}

.collar {
  position: absolute;
  bottom: 12px;
  left: 25px;
  width: 50px;
  height: 10px;
  background: #ff2d55;
  border: 3px solid var(--color-text, #333);
  border-radius: 5px;
  z-index: 12;
}

.bell {
  position: absolute;
  bottom: -6px;
  left: 17px;
  width: 10px;
  height: 10px;
  background: #ffd32a;
  border: 3px solid var(--color-text, #333);
  border-radius: 50%;
}

.body-main {
  position: absolute;
  bottom: 0;
  left: 20px;
  width: 60px;
  height: 24px;
  border: 4px solid var(--color-text, #333);
  border-top: none;
  border-radius: 0 0 12px 12px;
  z-index: 6;
}

.cat .body-main {
  background: #fbf5e6;
}

.dog .body-main {
  background: #f5cf8c;
}

.paw {
  position: absolute;
  bottom: -4px;
  width: 14px;
  height: 12px;
  border: 3px solid var(--color-text, #333);
  background: white;
  border-radius: 6px;
}

.paw-left {
  left: 4px;
}

.paw-right {
  right: 4px;
}

.tail {
  position: absolute;
  bottom: 12px;
  z-index: 3;
  width: 8px;
  height: 30px;
  border: 3px solid var(--color-text, #333);
  border-radius: 4px;
  transform-origin: bottom center;
}

.cat .tail {
  right: 15px;
  background: #fbf5e6;
  border-radius: 4px 4px 0 0;
  animation: cat-tail-wag 2s ease-in-out infinite;
}

.dog .tail {
  right: 18px;
  background: #c99342;
  height: 20px;
  animation: dog-tail-wag 0.5s linear infinite;
}

.particles {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  pointer-events: none;
  z-index: 15;
}

.particle {
  position: absolute;
  font-size: 20px;
  opacity: 0;
  animation: particle-fly 0.8s ease-out infinite;
}

.star-1 {
  left: 10px;
  top: 20px;
  animation-delay: 0.1s;
}

.heart-1 {
  left: 40px;
  top: 0px;
  animation-delay: 0.3s;
}

.star-2 {
  right: 10px;
  top: 25px;
  animation-delay: 0.5s;
}

@keyframes pet-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes pet-happy-bounce {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-24px) scaleY(1.1) scaleX(0.95); }
}

@keyframes pet-sad-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px) rotate(-3deg); }
  75% { transform: translateX(4px) rotate(3deg); }
}

@keyframes pet-cheer-bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08) translateY(-6px); }
}

@keyframes eye-blink {
  0%, 90%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}

@keyframes cat-tail-wag {
  0%, 100% { transform: rotate(10deg); }
  50% { transform: rotate(-25deg); }
}

@keyframes dog-tail-wag {
  0%, 100% { transform: rotate(15deg); }
  50% { transform: rotate(-15deg); }
}

@keyframes sweat-drop {
  0% { transform: translateY(0) scale(1); opacity: 0.8; }
  80% { transform: translateY(12px) scale(0.8); opacity: 0.8; }
  100% { transform: translateY(16px) scale(0.5); opacity: 0; }
}

@keyframes particle-fly {
  0% { transform: translateY(20px) scale(0.5); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-30px) scale(1.2); opacity: 0; }
}
</style>
