import { Howl } from 'howler';

const sounds = {
  click: new Howl({ src: ['/sounds/click.mp3'] }),
  success: new Howl({ src: ['/sounds/success.mp3'] }),
  error: new Howl({ src: ['/sounds/error.mp3'] }),
  complete: new Howl({ src: ['/sounds/complete.mp3'] }),
};

export const playSound = (sound: keyof typeof sounds) => {
  if (typeof window !== 'undefined') {
    sounds[sound].play();
  }
};