import { CharacterState, CharacterPosition } from '@/common/types';
import { GRAVITY, FRICTION, GROUND_LEVEL, ANIMATION_FRAME_DURATION } from '@/common/constants';
import { Logger } from '@/common/logger';

export abstract class BaseCharacter {
  protected logger: Logger;
  protected currentState: CharacterState = CharacterState.IDLE;
  protected position: CharacterPosition = { x: 0, y: 0 };
  protected velocity = { x: 0, y: 0 };
  protected direction: 'left' | 'right' = 'right';
  protected currentFrame = 0;
  protected frameTime = 0;
  protected size = { width: 100, height: 100 };

  constructor(protected name: string) {
    this.logger = new Logger(`Character:${name}`);
  }

  public update(deltaTime: number): void {
    this.applyPhysics(deltaTime);
    this.frameTime += deltaTime;

    const frameDuration = ANIMATION_FRAME_DURATION;
    if (this.frameTime >= frameDuration) {
      this.frameTime -= frameDuration;
      this.currentFrame++;

      const totalFrames = this.getFramesForState(this.currentState);
      if (this.currentFrame >= totalFrames) {
        this.currentFrame = 0;
      }
    }
  }

  protected applyPhysics(deltaTime: number): void {
    if (this.position.y > GROUND_LEVEL) {
      this.velocity.y -= GRAVITY;
    } else {
      this.position.y = GROUND_LEVEL;
      this.velocity.y = 0;
    }

    this.velocity.x *= FRICTION;
    this.position.x += (this.velocity.x * deltaTime) / 1000;
    this.position.y += (this.velocity.y * deltaTime) / 1000;
  }

  protected abstract getFramesForState(state: CharacterState): number;

  public getState(): CharacterState {
    return this.currentState;
  }

  public getPosition(): CharacterPosition {
    return { ...this.position };
  }

  public setPosition(position: CharacterPosition): void {
    this.position = position;
  }

  public getSize(): { width: number; height: number } {
    return { ...this.size };
  }

  public setSize(width: number, height: number): void {
    this.size = { width, height };
  }
}
