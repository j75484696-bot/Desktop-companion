export enum CharacterState {
  IDLE = 'idle',
  WALK_LEFT = 'walk-left',
  WALK_RIGHT = 'walk-right',
  CLIMB_WALL = 'climb-wall',
  CEILING_HANG = 'ceiling-hang',
  SLEEP = 'sleep',
  CELEBRATE = 'celebrate',
  THINK = 'think',
  TALK = 'talk',
  DISAPPOINTED = 'disappointed',
}

export interface CharacterPosition {
  x: number;
  y: number;
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  lastCompleted: Date | null;
  streak: number;
  longestStreak: number;
  targetFrequency: 'daily' | 'weekly' | 'monthly';
  color?: string;
}

export interface FocusSession {
  id: string;
  startedAt: Date;
  duration: number;
  completed: boolean;
  taskName?: string;
  endedAt?: Date;
}

export interface AppSettings {
  characterSize: 'small' | 'medium' | 'large';
  characterOpacity: number;
  alwaysOnTop: boolean;
  enableVoice: boolean;
  personalityPreset: 'strict' | 'friendly' | 'playful';
  notificationsEnabled: boolean;
  theme: 'light' | 'dark';
}
