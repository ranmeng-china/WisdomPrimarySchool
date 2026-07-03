import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    soundEnabled: true,
    animationEnabled: true,
    questionLimit: 10 // 5, 10, 15
  }),
  actions: {
    loadSettings() {
      const data = localStorage.getItem('math_game_settings');
      if (data) {
        try {
          const parsed = JSON.parse(data);
          this.soundEnabled = parsed.soundEnabled ?? true;
          this.animationEnabled = parsed.animationEnabled ?? true;
          this.questionLimit = parsed.questionLimit ?? 10;
        } catch (e) {
          // ignore
        }
      }
    },
    saveSettings() {
      localStorage.setItem(
        'math_game_settings',
        JSON.stringify({
          soundEnabled: this.soundEnabled,
          animationEnabled: this.animationEnabled,
          questionLimit: this.questionLimit
        })
      );
    },
    setSound(val: boolean) {
      this.soundEnabled = val;
      this.saveSettings();
    },
    setAnimation(val: boolean) {
      this.animationEnabled = val;
      this.saveSettings();
    },
    setQuestionLimit(limit: number) {
      this.questionLimit = limit;
      this.saveSettings();
    }
  }
});
