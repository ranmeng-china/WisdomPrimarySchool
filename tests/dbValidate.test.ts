import { describe, it, expect } from 'vitest';
import { questions } from '../src/data/questions';

describe('Questions Database Validation', () => {
  it('should have unique question IDs', () => {
    const ids = questions.map(q => q.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('should validate standard fields on all questions', () => {
    questions.forEach(q => {
      expect(q.id).toBeDefined();
      expect(q.grade).toBe('1');
      expect(['up', 'down']).toContain(q.semester);
      expect(['choice', 'fill', 'drag', 'match', 'diagram', 'write']).toContain(q.type);
      expect(['basic', 'medium', 'hard']).toContain(q.difficulty);
      expect(q.stem.length).toBeGreaterThan(0);
      expect(q.explanation.length).toBeGreaterThan(0);
    });
  });

  it('should validate answer structure and type specific properties', () => {
    questions.forEach(q => {
      switch (q.type) {
        case 'choice': {
          expect(q.assets?.options).toBeDefined();
          expect(q.assets.options?.length).toBeGreaterThan(0);
          expect(q.assets.options).toContain(q.answer);
          break;
        }
        case 'drag': {
          expect(q.assets?.options).toBeDefined();
          expect(q.assets?.targets).toBeDefined();
          const ansMap = q.answer as Record<string, string>;
          expect(typeof ansMap).toBe('object');
          expect(Object.keys(ansMap).length).toBeGreaterThan(0);
          Object.entries(ansMap).forEach(([opt, target]) => {
            expect(q.assets.options).toContain(opt);
            expect(q.assets.targets).toContain(target);
          });
          break;
        }
        case 'match': {
          expect(q.assets?.options).toBeDefined();
          expect(q.assets?.targets).toBeDefined();
          const ansMap = q.answer as Record<string, string>;
          expect(typeof ansMap).toBe('object');
          expect(Object.keys(ansMap).length).toBeGreaterThan(0);
          Object.entries(ansMap).forEach(([opt, target]) => {
            expect(q.assets.options).toContain(opt);
            expect(q.assets.targets).toContain(target);
          });
          break;
        }
        case 'diagram':
        case 'fill':
        case 'write': {
          expect(q.answer).toBeDefined();
          expect(String(q.answer).length).toBeGreaterThan(0);
          break;
        }
      }
    });
  });
});
