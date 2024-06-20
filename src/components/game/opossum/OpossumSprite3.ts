import Sprite from '../../../assets/opossum/Opossum3Sprite.png'
import type {AnimationSprite} from "@/components/game/common/AnimatedSprite";

const image = new Image()
image.src = Sprite

export const OpossumSprite3: AnimationSprite = {
    img: Sprite,
    image,
    colWidth: 150,
    rowHeight: 150,
    states: [
        {
            name: 'eyes',
            frames: 7
        }
    ]
}