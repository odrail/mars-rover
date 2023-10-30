import engine, { Command, Direction, MarsMap, Path, Position } from './engine'

describe('Test engine', () => {
    describe('Test rotate rover', () => {
        test('Should rotate from North to West', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.North
            }
            const command: Command = 'L'
            const expectedNewPosition = {
                long: 4,
                lat: 1,
                direction: Direction.West
            }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })

        test('Should rotate from North to East', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.North
            }
            const command: Command = 'R'
            const expectedNewPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.East
            }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })

        test('Should rotate from East to North', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.East
            }
            const command: Command = 'L'
            const expectedNewPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.North
            }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })

        test('Should rotate from East to South', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.East
            }
            const command: Command = 'R'
            const expectedNewPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.South
            }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })

        test('Should rotate from South to East', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.South
            }
            const command: Command = 'L'
            const expectedNewPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.East
            }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })

        test('Should rotate from South to West', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.South
            }
            const command: Command = 'R'
            const expectedNewPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.West
            }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })

        test('Should rotate from West to South', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.West
            }
            const command: Command = 'L'
            const expectedNewPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.South
            }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })

        test('Should rotate from West to North', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.West
            }
            const command: Command = 'R'
            const expectedNewPosition: Position = {
                long: 4,
                lat: 1,
                direction: Direction.North
            }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })
    })

    describe('Test move rover', () => {
        test('Should move towards North', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = { long: 4, lat: 1, direction: Direction.North }
            const command: Command = 'F'
            const expectedNewPosition = { long: 5, lat: 1, direction: Direction.North }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })

        test('Should move towards Sorth', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = { long: 4, lat: 1, direction: Direction.North }
            const command: Command = 'B'
            const expectedNewPosition = {
                long: 3,
                lat: 1,
                direction: Direction.North
            }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })

        test('Should cross north pole', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = { long: 6, lat: 1, direction: Direction.North }
            const command: Command = 'F'
            const expectedNewPosition = { long: 6, lat: 5, direction: Direction.South }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })

        test('Should cross south pole', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = { long: 1, lat: 1, direction: Direction.South }
            const command: Command = 'F'
            const expectedNewPosition = { long: 1, lat: 5, direction: Direction.North }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })

        test('Should move towards East going forward', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = { long: 4, lat: 1, direction: Direction.East }
            const command: Command = 'F'
            const expectedNewPosition = {
                long: 4,
                lat: 2,
                direction: Direction.East
            }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })

        test('Should move towards East going backward', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = { long: 4, lat: 1, direction: Direction.East }
            const command: Command = 'B'
            const expectedNewPosition = {
                long: 4,
                lat: 8,
                direction: Direction.East
            }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })

        test('Should move towards West going forward', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = { long: 4, lat: 1, direction: Direction.West }
            const command: Command = 'F'
            const expectedNewPosition = {
                long: 4,
                lat: 8,
                direction: Direction.West
            }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })

        test('Should move towards West going backward', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = { long: 4, lat: 1, direction: Direction.East }
            const command: Command = 'B'
            const expectedNewPosition = {
                long: 4,
                lat: 8,
                direction: Direction.East
            }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })
    })

    describe('Test detection obstacle', () => {
        test('should throw an error if encounters an obstacle', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [{ long: 5, lat: 1 }] }
            const currentPosition: Position = { long: 4, lat: 1, direction: Direction.North }
            const command: Command = 'F'
            const expectedNewPosition = { long: 4, lat: 1, direction: Direction.North }
            expect(engine(map, currentPosition, [command]).currentPosition).toStrictEqual(expectedNewPosition);
        })
    })

    describe('Test a path', () => {
        test('path 1 with no obstacles', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [] }
            const currentPosition: Position = { long: 4, lat: 1, direction: Direction.North }
            const path: Path = ['R', 'F', 'L', 'B']

            const expectedResult = {
                currentPosition: { long: 3, lat: 2, direction: Direction.North },
                obstacleDetected: false,
                obstaclePosition: null
            }
            expect(engine(map, currentPosition, path)).toStrictEqual(expectedResult);
        })

        test('path 2 with obstacles', () => {
            const map: MarsMap = { lats: 8, longs: 6, obstacles: [{ long: 3, lat: 2}] }
            const currentPosition: Position = { long: 4, lat: 1, direction: Direction.North }
            const path: Path = ['R', 'F', 'L', 'B']

            const expectedResult = {
                currentPosition: { long: 4, lat: 2, direction: Direction.North },
                obstacleDetected: true,
                obstaclePosition: { long: 3, lat: 2 }
            }
            expect(engine(map, currentPosition, path)).toStrictEqual(expectedResult);
        })
    })
})