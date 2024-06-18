import type {InputController, ObjectAnimation, GameContext} from '@/components/game/common/Draw'
import {Position} from "@/components/game/common/Draw";
import {LeftRightAnimation} from '@/components/game/common/LeftRightAnimation'
import {OpossumSprite2} from "@/components/game/opossum/OpossumSprite2";
import {GenericOpossum} from "@/components/game/opossum/GenericOpossum";
import {AnimatedSprite, type SpritePointer} from "@/components/game/common/AnimatedSprite";
import {AlternateAnimation} from "@/components/game/common/AlternateAnimation";

export class Opossum2 extends GenericOpossum {
  private animation: ObjectAnimation

  constructor(game: GameContext, initialXShift: number, initialYShift: number) {
    super(game, new AnimatedSprite(OpossumSprite2, { row: 0, frame: 3 }), initialXShift, initialYShift)
    this.animation = new AlternateAnimation([
      () => new LeftRightAnimation(0, 7, 3, 6),
      () => new LeftRightAnimation(1, 5, 0, 2)
    ])
  }

  nextFrame(input: InputController): SpritePointer {
    return this.animation.update(input)
  }
}
