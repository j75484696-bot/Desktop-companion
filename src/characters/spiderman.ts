import { BaseCharacter } from './base-character';
import { CharacterState } from '@/common/types';

export class Spiderman extends BaseCharacter {
  constructor() {
    super('Spiderman');
  }

  protected getFramesForState(state: CharacterState): number {
    switch (state) {
      case CharacterState.IDLE:
      case CharacterState.SLEEP:
      case CharacterState.CEILING_HANG:
        return 2;
      case CharacterState.WALK_LEFT:
      case CharacterState.WALK_RIGHT:
      case CharacterState.CLIMB_WALL:
        return 4;
      case CharacterState.CELEBRATE:
      case CharacterState.THINK:
        return 6;
      default:
        return 1;
    }
  }

  public celebrate(): void {
    this.currentState = CharacterState.CELEBRATE;
    this.currentFrame = 0;
  }

  public climbWall(direction: 'up' | 'down'): void {
    this.currentState = CharacterState.CLIMB_WALL;
    this.currentFrame = 0;
    this.velocity.y = direction === 'up' ? 3 : -3;
  }

  public hangFromCeiling(): void {
    this.currentState = CharacterState.CEILING_HANG;
    this.currentFrame = 0;
    this.position.y = 0;
    this.velocity.y = 0;
  }

  public sleep(): void {
    this.currentState = CharacterState.SLEEP;
    this.currentFrame = 0;
  }
}
