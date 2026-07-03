import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useWalletStore } from '../src/stores/wallet';
import { usePetStore } from '../src/stores/pet';
import { normalizeWallet, hasEnoughCurrency } from '../src/utils/currencyHelper';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();
vi.stubGlobal('localStorage', localStorageMock);

describe('Wallet Currency Conversion Tests', () => {
  it('should normalize wallet amounts correctly', () => {
    const w = { yuan: 1, jiao: 12, fen: 25 };
    const normalized = normalizeWallet(w);
    expect(normalized.yuan).toBe(2);
    expect(normalized.jiao).toBe(4);
    expect(normalized.fen).toBe(5);
  });

  it('should check affordability accurately', () => {
    const wallet = { yuan: 1, jiao: 2, fen: 5 };
    const price = { yuan: 0, jiao: 15, fen: 0 };
    expect(hasEnoughCurrency(wallet, price)).toBe(false);
  });
});

describe('Wallet Store Action Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorageMock.clear();
  });

  it('should earn money and sync with pet store', () => {
    const petStore = usePetStore();
    const walletStore = useWalletStore();

    petStore.pet.wallet = { yuan: 0, jiao: 0, fen: 50 };
    walletStore.addEarnings(80);

    expect(walletStore.wallet.yuan).toBe(1);
    expect(walletStore.wallet.jiao).toBe(3);
    expect(walletStore.wallet.fen).toBe(0);
    expect(petStore.pet.wallet.yuan).toBe(1);
  });

  it('should buy items and update backpack', () => {
    const petStore = usePetStore();
    const walletStore = useWalletStore();

    petStore.pet.wallet = { yuan: 2, jiao: 5, fen: 0 };
    petStore.pet.backpack = {};

    const bought = walletStore.purchaseItem({ yuan: 1, jiao: 2, fen: 0 }, 'apple');
    expect(bought).toBe(true);
    expect(walletStore.wallet.yuan).toBe(1);
    expect(walletStore.wallet.jiao).toBe(3);
    expect(petStore.pet.backpack['apple']).toBe(1);
  });

  it('should exchange coins correctly', () => {
    const petStore = usePetStore();
    const walletStore = useWalletStore();

    petStore.pet.wallet = { yuan: 0, jiao: 12, fen: 25 };
    
    walletStore.exchangeCoins('fen', 20);
    expect(walletStore.wallet.fen).toBe(5);
    expect(walletStore.wallet.jiao).toBe(4);
    expect(walletStore.wallet.yuan).toBe(1);
  });
});
