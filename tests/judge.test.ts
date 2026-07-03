import { describe, it, expect } from 'vitest';
import { judgeAnswer } from '../src/utils/judgeHelper';
import { Question } from '../src/types';

describe('Judge Engine Tests', () => {
  it('should judge choice questions correctly', () => {
    const question = {
      type: 'choice',
      answer: '2'
    } as Question;
    expect(judgeAnswer(question, '2')).toBe(true);
    expect(judgeAnswer(question, '3')).toBe(false);
  });

  it('should judge fill questions correctly', () => {
    const question = {
      type: 'fill',
      answer: ' 15 '
    } as Question;
    expect(judgeAnswer(question, '15')).toBe(true);
    expect(judgeAnswer(question, ' 15')).toBe(true);
    expect(judgeAnswer(question, '16')).toBe(false);
  });

  it('should judge match questions correctly', () => {
    const question = {
      type: 'match',
      answer: { '1': 'cat', '2': 'dog' }
    } as Question;
    expect(judgeAnswer(question, { '1': 'cat', '2': 'dog' })).toBe(true);
    expect(judgeAnswer(question, { '1': 'cat', '2': 'bird' })).toBe(false);
  });
});
