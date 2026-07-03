export function speakText(text: string) {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    let cleanText = text.replace(/<rt>.*?<\/rt>/g, '');
    cleanText = cleanText.replace(/<[^>]+>/g, '');
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }
}
