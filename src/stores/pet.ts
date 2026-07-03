import { defineStore } from 'pinia';
import { PetData, PetType } from '../types';

export function calculateOfflineDecay(
  lastTimeStr: string,
  currentTimeStr: string,
  currentSatiety: number,
  currentCleanliness: number
): { satiety: number; cleanliness: number } {
  const lastTime = new Date(lastTimeStr).getTime();
  const currentTime = new Date(currentTimeStr).getTime();
  const elapsedMs = currentTime - lastTime;
  if (elapsedMs <= 0) {
    return { satiety: currentSatiety, cleanliness: currentCleanliness };
  }

  const elapsedHours = elapsedMs / (1000 * 60 * 60);
  const satietyDecay = Math.floor(elapsedHours * 5);
  const cleanlinessDecay = Math.floor(elapsedHours * 3);

  return {
    satiety: Math.max(0, currentSatiety - satietyDecay),
    cleanliness: Math.max(0, currentCleanliness - cleanlinessDecay)
  };
}

export const usePetStore = defineStore('pet', {
  state: () => ({
    pet: {
      chosenPet: null,
      name: '',
      level: 1,
      exp: 0,
      satiety: 100,
      cleanliness: 100,
      shieldCount: 1,
      wallet: { yuan: 0, jiao: 0, fen: 0 },
      backpack: {},
      lastUpdateTime: new Date().toISOString()
    } as PetData
  }),
  getters: {
    getUpgradeLimit(): number {
      return this.pet.level * 100;
    }
  },
  actions: {
    loadFromStorage() {
      const data = localStorage.getItem('math_game_pet');
      if (data) {
        const parsed = JSON.parse(data) as PetData;
        const now = new Date().toISOString();
        const decayed = calculateOfflineDecay(
          parsed.lastUpdateTime,
          now,
          parsed.satiety,
          parsed.cleanliness
        );
        parsed.satiety = decayed.satiety;
        parsed.cleanliness = decayed.cleanliness;
        parsed.lastUpdateTime = now;
        this.pet = parsed;
      }
    },
    saveToStorage() {
      this.pet.lastUpdateTime = new Date().toISOString();
      localStorage.setItem('math_game_pet', JSON.stringify(this.pet));
    },
    choosePet(type: PetType, name: string) {
      this.pet.chosenPet = type;
      this.pet.name = name;
      this.saveToStorage();
    },
    resetDailyShield() {
      this.pet.shieldCount = 1;
      this.saveToStorage();
    },
    addExp(amount: number) {
      this.pet.exp += amount;
      let limit = this.getUpgradeLimit;
      while (this.pet.exp >= limit) {
        this.pet.exp -= limit;
        this.pet.level += 1;
        limit = this.getUpgradeLimit;
      }
      this.saveToStorage();
    },
    deductExp(amount: number) {
      if (this.pet.shieldCount > 0) {
        this.pet.shieldCount -= 1;
        this.saveToStorage();
        return;
      }

      this.pet.exp -= amount;
      if (this.pet.exp < 0) {
        if (this.pet.level > 1) {
          this.pet.level -= 1;
          this.pet.exp = this.getUpgradeLimit - amount;
        } else {
          this.pet.exp = 0;
        }
      }
      this.saveToStorage();
    },
    feedPet(itemId: string, recoveryAmount: number) {
      if (this.pet.backpack[itemId] && this.pet.backpack[itemId] > 0) {
        this.pet.backpack[itemId] -= 1;
        if (this.pet.backpack[itemId] === 0) {
          delete this.pet.backpack[itemId];
        }
        this.pet.satiety = Math.min(100, this.pet.satiety + recoveryAmount);
        this.saveToStorage();
      }
    },
    cleanPet(recoveryAmount: number) {
      this.pet.cleanliness = Math.min(100, this.pet.cleanliness + recoveryAmount);
      this.saveToStorage();
    }
  }
});
