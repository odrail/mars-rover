import { Joi, Segments, celebrate } from "celebrate"
import { Commands } from "../../lib/engine"

export default celebrate({
    [Segments.BODY]: Joi.object().keys({
        commands: Joi.array().items(
            Joi.string().valid(
                Commands.Backward,
                Commands.Forword,
                Commands.Left,
                Commands.Right
            ).required()
        ).required()
    })
})