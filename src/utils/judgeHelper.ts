import { Question } from '../types';

export function judgeAnswer(question: Question, userAnswer: unknown): boolean {
  if (userAnswer === undefined || userAnswer === null) {
    return false;
  }

  switch (question.type) {
    case 'choice': {
      return String(question.answer) === String(userAnswer);
    }
    case 'fill': {
      const standard = String(question.answer).trim().toLowerCase();
      const user = String(userAnswer).trim().toLowerCase();
      return standard === user;
    }
    case 'drag': {
      return JSON.stringify(question.answer) === JSON.stringify(userAnswer);
    }
    case 'match': {
      const standardMap = question.answer as Record<string, string>;
      const userMap = userAnswer as Record<string, string>;
      const standardKeys = Object.keys(standardMap);
      const userKeys = Object.keys(userMap);
      if (standardKeys.length !== userKeys.length) {
        return false;
      }
      return standardKeys.every(key => standardMap[key] === userMap[key]);
    }
    case 'diagram': {
      const standardExprs = Array.isArray(question.answer) 
        ? question.answer.map(v => String(v).replace(/\s+/g, '')) 
        : [String(question.answer).replace(/\s+/g, '')];
      const userExpr = String(userAnswer).replace(/\s+/g, '');
      return standardExprs.includes(userExpr);
    }
    case 'write': {
      return true;
    }
    default: {
      return false;
    }
  }
}
