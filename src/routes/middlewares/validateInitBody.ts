import { Joi, Segments, celebrate } from "celebrate"
import { Direction } from "../../lib/engine"

const evenNumber = (value: number, helpers: { error: (arg0: string) => any }) => {
    // if (typeof value !== 'number') return helpers.error('any.invalid')

    if (value % 2 === 0) {
        return value
    } else return helpers.error('number.notEven')
}

export default celebrate({
    [Segments.BODY]: Joi.object().keys({
        map: Joi.object().keys({
            lats: Joi.number().integer().min(2).custom(evenNumber).required().messages({ 'number.notEven': 'lats is not even' }),
            longs: Joi.number().integer().min(2).custom(evenNumber).required().messages({ 'number.notEven': 'longs is not even' }),
            obstacles: Joi.array().items(Joi.object().keys({
                long: Joi.number().integer().min(1).required(),
                lat: Joi.number().integer().min(1).required()
            })).required()
        }).required(),
        initialPosition: Joi.object().keys({
            long: Joi.number().integer().min(1).max(Joi.ref('...map.longs')).required(),
            lat: Joi.number().integer().min(1).max(Joi.ref('...map.lats')).required(),
            direction: Joi.string().valid(Direction.North, Direction.East, Direction.South, Direction.West).required()
        }).required()
    })
})