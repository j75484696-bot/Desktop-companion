import { Logger } from '@/common/logger';
import { Habit } from '@/common/types';
import { generateId, isToday, daysBetween } from '@/common/utils';

export class HabitTracker {
  private logger: Logger;
  private habits: Map<string, Habit> = new Map();

  constructor() {
    this.logger = new Logger('HabitTracker');
  }

  async createHabit(name: string, frequency: 'daily' | 'weekly' | 'monthly' = 'daily'): Promise<Habit> {
    const habit: Habit = {
      id: generateId(),
      name,
      createdAt: new Date(),
      lastCompleted: null,
      streak: 0,
      longestStreak: 0,
      targetFrequency: frequency,
    };

    this.habits.set(habit.id, habit);
    this.logger.log('Created habit:', name);
    return habit;
  }

  async completeHabit(habitId: string): Promise<void> {
    const habit = this.habits.get(habitId);
    if (!habit) {
      this.logger.warn('Habit not found:', habitId);
      return;
    }

    if (habit.lastCompleted && isToday(habit.lastCompleted)) {
      this.logger.log('Habit already completed today:', habit.name);
      return;
    }

    if (habit.lastCompleted) {
      const days = daysBetween(habit.lastCompleted, new Date());
      if (days === 1) {
        habit.streak++;
      } else {
        habit.streak = 1;
      }
    } else {
      habit.streak = 1;
    }

    habit.lastCompleted = new Date();
    if (habit.streak > habit.longestStreak) {
      habit.longestStreak = habit.streak;
    }

    this.logger.log('Completed habit:', habit.name, '- Streak:', habit.streak);
  }

  getHabits(): Habit[] {
    return Array.from(this.habits.values());
  }

  getHabit(habitId: string): Habit | undefined {
    return this.habits.get(habitId);
  }
}
