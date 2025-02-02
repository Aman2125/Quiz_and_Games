type Achievement = {
  progress: number;
  total: number;
  completed?: boolean;
};

type Achievements = {
  dailyChallenger: Achievement;
  perfectScore: Achievement;
  quizMaster: Achievement;
};

type QuizResult = {
  date: string;
  category: string;
  score: number;
  totalQuestions: number;
};

const DEFAULT_ACHIEVEMENTS: Achievements = {
  dailyChallenger: { progress: 0, total: 5 },
  perfectScore: { progress: 0, total: 1 },
  quizMaster: { progress: 0, total: 10 }
};

export const getAchievements = (): Achievements => {
  const stored = localStorage.getItem('achievements');
  return stored ? JSON.parse(stored) : DEFAULT_ACHIEVEMENTS;
};

export const updateAchievement = (key: keyof Achievements, progress: number) => {
  const achievements = getAchievements();
  achievements[key].progress = Math.min(progress, achievements[key].total);
  achievements[key].completed = achievements[key].progress >= achievements[key].total;
  localStorage.setItem('achievements', JSON.stringify(achievements));
  return achievements;
};

export const getDailyStreak = (): number => {
  const stored = localStorage.getItem('dailyStreak');
  return stored ? parseInt(stored) : 0;
};

export const updateDailyStreak = () => {
  const lastPlayed = localStorage.getItem('lastPlayed');
  const today = new Date().toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toDateString();

  let streak = getDailyStreak();

  if (lastPlayed === yesterdayString) {
    streak += 1;
  } else if (lastPlayed !== today) {
    streak = 1;
  }

  localStorage.setItem('dailyStreak', streak.toString());
  localStorage.setItem('lastPlayed', today);
  return streak;
};

export const getCategoryProgress = (category: string): number => {
  const stored = localStorage.getItem(`category_${category}`);
  return stored ? parseInt(stored) : 0;
};

export const updateCategoryProgress = (category: string, completed: boolean) => {
  if (completed) {
    const progress = getCategoryProgress(category) + 1;
    localStorage.setItem(`category_${category}`, progress.toString());
    return progress;
  }
  return getCategoryProgress(category);
};

// Add new functions for quiz results
export const saveQuizResult = (result: QuizResult) => {
  const results = getQuizResults();
  results.push(result);
  localStorage.setItem('quizResults', JSON.stringify(results));
};

export const getQuizResults = (): QuizResult[] => {
  const stored = localStorage.getItem('quizResults');
  return stored ? JSON.parse(stored) : [];
};

export const getProgress = () => {
  const history = getQuizResults();
  const highScores: Record<string, number> = {};
  
  history.forEach(result => {
    const score = (result.score / result.totalQuestions) * 100;
    if (!highScores[result.category] || score > highScores[result.category]) {
      highScores[result.category] = score;
    }
  });
  
  return {
    history,
    highScores
  };
};

export const saveLeaderboardEntry = (entry: {
  name: string;
  score: number;
  game: string;
  date: string;
}) => {
  const leaderboard = getLeaderboard();
  leaderboard.push(entry);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
};

export const getLeaderboard = () => {
  const stored = localStorage.getItem('leaderboard');
  return stored ? JSON.parse(stored) : [];
};
