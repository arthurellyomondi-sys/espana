export function speak(text: string, lang: string = "es-ES") {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.85;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

export function speakSpanish(text: string) {
  speak(text, "es-ES");
}

export function speakEnglish(text: string) {
  speak(text, "en-US");
}

// Sound effect helpers using AudioContext
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine"
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + duration
  );

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

export function playCorrectSound() {
  playTone(523.25, 0.15); // C5
  setTimeout(() => playTone(659.25, 0.15), 100); // E5
  setTimeout(() => playTone(783.99, 0.2), 200); // G5
}

export function playWrongSound() {
  playTone(200, 0.3, "sawtooth");
}

export function playFlipSound() {
  playTone(440, 0.08);
}

export function playSuccessSound() {
  playTone(523.25, 0.12);
  setTimeout(() => playTone(659.25, 0.12), 80);
  setTimeout(() => playTone(783.99, 0.12), 160);
  setTimeout(() => playTone(1046.5, 0.3), 240);
}

export function playClickSound() {
  playTone(800, 0.05);
}
