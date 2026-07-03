import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePetStore, calculateOfflineDecay } from '../src/stores/pet';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();
vi.stubGlobal('localStorage', localStorageMock);

describe('Pet Offline Decay Tests', () => {
  it('should decay satiety and cleanliness based on hours elapsed', () => {
    const start = '2026-07-03T10:00:00.000Z';
    const end = '2026-07-03T12:00:00.000Z';
    const result = calculateOfflineDecay(start, end, 100, 100);
    expect(result.satiety).toBe(90);
    expect(result.cleanliness).toBe(94);
  });
});

describe('Pet Store Action Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorageMock.clear();
  });

  it('should choose pet and reset daily shield', () => {
    const store = usePetStore();
    store.choosePet('cat', 'Miaomiao');
    expect(store.pet.chosenPet).toBe('cat');
    expect(store.pet.name).toBe('Miaomiao');
    
    store.pet.shieldCount = 0;
    store.resetDailyShield();
    expect(store.pet.shieldCount).toBe(1);
  });

  it('should add exp and level up correctly', () => {
    const store = usePetStore();
    store.pet.level = 1;
    store.pet.exp = 0;
    store.addExp(150);
    expect(store.pet.level).toBe(2);
    expect(store.pet.exp).toBe(50);
  });

  it('should deduct exp and level down with shield protection', () => {
    const store = usePetStore();
    store.pet.level = 2;
    store.pet.exp = 50;
    store.pet.shieldCount = 1;

    store.deductExp(20);
    expect(store.pet.shieldCount).toBe(0);
    expect(store.pet.level).toBe(2);
    expect(store.pet.exp).toBe(50);

    store.deductExp(60);
    expect(store.pet.level).toBe(1);
    expect(store.pet.exp).toBe(40);
  });
});
