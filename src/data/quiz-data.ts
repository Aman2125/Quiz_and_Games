export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const categories = [
  "General Knowledge",
  "Science",
  "History",
  "Technology"
] as const;

export type Category = typeof categories[number];

export const questions: Question[] = [
  {
    id: 1,
    category: "General Knowledge",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    category: "General Knowledge",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 3,
    category: "Science",
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Fe", "Au", "Cu"],
    correctAnswer: 2
  },
  {
    id: 4,
    category: "Science",
    question: "What is the largest organ in the human body?",
    options: ["Brain", "Heart", "Liver", "Skin"],
    correctAnswer: 3
  },
  {
    id: 5,
    category: "History",
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2
  },
  {
    id: 6,
    category: "History",
    question: "Who was the first President of the United States?",
    options: ["John Adams", "Thomas Jefferson", "Benjamin Franklin", "George Washington"],
    correctAnswer: 3
  },
  {
    id: 7,
    category: "Technology",
    question: "Who co-founded Apple Computer Company?",
    options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Jeff Bezos"],
    correctAnswer: 1
  },
  {
    id: 8,
    category: "Technology",
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Computer Processing Unit"],
    correctAnswer: 0
  },
  {
    id: 9,
    category: "General Knowledge",
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    correctAnswer: 2
  },
  {
    id: 10,
    category: "General Knowledge",
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    correctAnswer: 2
  },
  {
    id: 11,
    category: "Science",
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctAnswer: 2
  },
  {
    id: 12,
    category: "Science",
    question: "What is the speed of light?",
    options: ["299,792 km/s", "199,792 km/s", "399,792 km/s", "499,792 km/s"],
    correctAnswer: 0
  },
  {
    id: 13,
    category: "History",
    question: "Who was the first woman to win a Nobel Prize?",
    options: ["Mother Teresa", "Marie Curie", "Jane Addams", "Pearl Buck"],
    correctAnswer: 1
  },
  {
    id: 14,
    category: "History",
    question: "In which year did the Berlin Wall fall?",
    options: ["1987", "1988", "1989", "1990"],
    correctAnswer: 2
  },
  {
    id: 15,
    category: "Technology",
    question: "Which company developed the first iPhone?",
    options: ["Samsung", "Apple", "Nokia", "Motorola"],
    correctAnswer: 1
  },
  {
    id: 16,
    category: "Technology",
    question: "What does 'HTTP' stand for?",
    options: [
      "HyperText Transfer Protocol",
      "High Transfer Text Protocol",
      "HyperText Technical Protocol",
      "High Technical Transfer Protocol"
    ],
    correctAnswer: 0
  },
  {
    id: 17,
    category: "General Knowledge",
    question: "Which is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: 1
  },
  {
    id: 18,
    category: "General Knowledge",
    question: "What is the most spoken language in the world?",
    options: ["English", "Spanish", "Mandarin", "Hindi"],
    correctAnswer: 2
  },
  {
    id: 19,
    category: "Science",
    question: "What is the atomic number of Carbon?",
    options: ["4", "6", "8", "12"],
    correctAnswer: 1
  },
  {
    id: 20,
    category: "Science",
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: 1
  },
  {
    id: 21,
    category: "History",
    question: "Who was the first woman to win the Nobel Prize?",
    options: ["Mother Teresa", "Marie Curie", "Jane Addams", "Pearl Buck"],
    correctAnswer: 1
  },
  {
    id: 22,
    category: "History",
    question: "Which ancient wonder was located in Egypt?",
    options: ["Hanging Gardens", "Great Pyramid", "Colossus", "Temple of Artemis"],
    correctAnswer: 1
  },
  {
    id: 23,
    category: "Technology",
    question: "Who is known as the father of computer science?",
    options: ["Alan Turing", "Charles Babbage", "John von Neumann", "Ada Lovelace"],
    correctAnswer: 0
  },
  {
    id: 24,
    category: "Technology",
    question: "Which programming language was created first?",
    options: ["FORTRAN", "COBOL", "BASIC", "Pascal"],
    correctAnswer: 0
  },
  {
    id: 25,
    category: "General Knowledge",
    question: "What is the currency of Brazil?",
    options: ["Peso", "Real", "Dollar", "Euro"],
    correctAnswer: 1
  },
  {
    id: 26,
    category: "Science",
    question: "What is the fastest land animal?",
    options: ["Lion", "Gazelle", "Cheetah", "Leopard"],
    correctAnswer: 2
  },
  {
    id: 27,
    category: "History",
    question: "In which year did the Russian Revolution take place?",
    options: ["1905", "1917", "1923", "1931"],
    correctAnswer: 1
  },
  {
    id: 28,
    category: "Technology",
    question: "Which company invented the USB port?",
    options: ["IBM", "Apple", "Microsoft", "Intel"],
    correctAnswer: 3
  },
  {
    id: 29,
    category: "General Knowledge",
    question: "Which ocean is the deepest?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    correctAnswer: 2
  },
  {
    id: 30,
    category: "Science",
    question: "What is the human body's largest organ?",
    options: ["Brain", "Liver", "Skin", "Heart"],
    correctAnswer: 2
  },
  {
    id: 31,
    category: "History",
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Michelangelo", "Raphael"],
    correctAnswer: 1
  },
  {
    id: 32,
    category: "Technology",
    question: "What does PDF stand for?",
    options: [
      "Portable Document Format",
      "Personal Data File",
      "Printed Document Form",
      "Public Data Format"
    ],
    correctAnswer: 0
  }
];

export const getQuestionsByCategory = (category: Category) => {
  return questions.filter(q => q.category === category);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
