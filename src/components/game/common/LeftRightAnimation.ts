import type {ObjectAnimation} from "@/components/game/common/Draw";
import type {SpritePointer} from "@/components/game/common/AnimatedSprite";

export class LeftRightAnimation implements ObjectAnimation {
  private row: number
  private frameCount: number
  private turn: number
  private startFrame: number
  private frame: number
  private right: boolean = true

  constructor(spriteRow: number, frameCount: number, startFrame: number, turn = 1) {
    this.row = spriteRow
    this.frameCount = frameCount
    this.startFrame = startFrame
    this.frame = startFrame
    this.turn = turn
  }
  update(): SpritePointer {
    if (this.frame >= (this.frameCount - 1)) {
      this.right = false
    } else if (this.frame <= 0) {
      this.turn--
      this.right = true
    }

    if (this.right) {
      this.frame++
    } else {
      this.frame--
    }
    return {
      row: this.row,
      frame: this.frame
    }
  }
  isFinished(): boolean {
    return this.turn <= 0 &&  this.frame == this.startFrame
  }
}