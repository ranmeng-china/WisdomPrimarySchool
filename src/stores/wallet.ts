import { defineStore } from 'pinia';
import { Wallet } from '../types';
import { normalizeWallet, hasEnoughCurrency, deductCurrency, addCurrency } from '../utils/currencyHelper';
import { usePetStore } from './pet';

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    wallet: {
      yuan: 0,
      jiao: 0,
      fen: 0
    } as Wallet
  }),
  actions: {
    syncFromPetStore() {
      const petStore = usePetStore();
      this.wallet = petStore.pet.wallet;
    },
    syncToPetStore() {
      const petStore = usePetStore();
      petStore.pet.wallet = this.wallet;
      petStore.saveToStorage();
    },
    addEarnings(fenAmount: number) {
      this.syncFromPetStore();
      this.wallet = addCurrency(this.wallet, { yuan: 0, jiao: 0, fen: fenAmount });
      this.syncToPetStore();
    },
    purchaseItem(price: Wallet, itemId: string) {
      this.syncFromPetStore();
      if (hasEnoughCurrency(this.wallet, price)) {
        this.wallet = deductCurrency(this.wallet, price);
        this.syncToPetStore();

        const petStore = usePetStore();
        if (!petStore.pet.backpack[itemId]) {
          petStore.pet.backpack[itemId] = 0;
        }
        petStore.pet.backpack[itemId] += 1;
        petStore.saveToStorage();
        return true;
      }
      return false;
    },
    exchangeCoins(fromUnit: 'fen' | 'jiao', amount: number) {
      this.syncFromPetStore();
      if (fromUnit === 'fen') {
        if (this.wallet.fen >= amount && amount % 10 === 0) {
          this.wallet.fen -= amount;
          this.wallet.jiao += Math.floor(amount / 10);
        }
      } else if (fromUnit === 'jiao') {
        if (this.wallet.jiao >= amount && amount % 10 === 0) {
          this.wallet.jiao -= amount;
          this.wallet.yuan += Math.floor(amount / 10);
        }
      }
      this.wallet = normalizeWallet(this.wallet);
      this.syncToPetStore();
    }
  }
});
