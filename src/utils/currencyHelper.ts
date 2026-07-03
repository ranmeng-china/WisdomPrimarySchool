import { Wallet } from '../types';

export function normalizeWallet(wallet: Wallet): Wallet {
  let totalFen = wallet.yuan * 100 + wallet.jiao * 10 + wallet.fen;
  if (totalFen < 0) {
    totalFen = 0;
  }
  const yuan = Math.floor(totalFen / 100);
  const remaining = totalFen % 100;
  const jiao = Math.floor(remaining / 10);
  const fen = remaining % 10;
  return { yuan, jiao, fen };
}

export function addCurrency(w1: Wallet, w2: Wallet): Wallet {
  return normalizeWallet({
    yuan: w1.yuan + w2.yuan,
    jiao: w1.jiao + w2.jiao,
    fen: w1.fen + w2.fen
  });
}

export function hasEnoughCurrency(wallet: Wallet, price: Wallet): boolean {
  const totalWalletFen = wallet.yuan * 100 + wallet.jiao * 10 + wallet.fen;
  const totalPriceFen = price.yuan * 100 + price.jiao * 10 + price.fen;
  return totalWalletFen >= totalPriceFen;
}

export function deductCurrency(wallet: Wallet, price: Wallet): Wallet {
  const totalWalletFen = wallet.yuan * 100 + wallet.jiao * 10 + wallet.fen;
  const totalPriceFen = price.yuan * 100 + price.jiao * 10 + price.fen;
  const remainingFen = Math.max(0, totalWalletFen - totalPriceFen);
  return normalizeWallet({ yuan: 0, jiao: 0, fen: remainingFen });
}
