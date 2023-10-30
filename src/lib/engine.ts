type Coordinate = {
    lat: number
    long: number
}
export type MarsMap = {
    lats: number
    longs: number
    obstacles: Coordinate[]
}

export enum Direction {
    North = 'N',
    East = 'E',
    South = 'S',
    West = 'W'
}

export type Position = Coordinate & {
    direction: Direction
}

export enum Commands {
    Forword = 'F',
    Backward = 'B',
    Left = 'L',
    Right = 'R'
}

export type Command = "L" | "R" | "F" | "B"

export type Path = Command[]

type EngineResult = {
    currentPosition: Position
    obstacleDetected: boolean
    obstaclePosition: Coordinate | null
}

const isTurnCommand = (command: Command): boolean => (command === Commands.Left || command === Commands.Right)
const isMoveCommand = (command: Command): boolean => (command === Commands.Forword || command === Commands.Backward)

const turnRover = (currentPosition: Position, command: Command): Position => {
    const cardinalPoints: Direction[] = [Direction.North, Direction.East, Direction.South, Direction.West]
    const currentCardinalPointIndex = cardinalPoints.findIndex(c => c === currentPosition.direction)

    let newDirection: Direction = currentPosition.direction as Direction;
    switch (command) {
        case Commands.Right:
            newDirection = currentCardinalPointIndex < cardinalPoints.length - 1 ? cardinalPoints[currentCardinalPointIndex + 1] : cardinalPoints[0];
            break
        case Commands.Left:
            newDirection = currentCardinalPointIndex > 0 ? cardinalPoints[currentCardinalPointIndex - 1] : cardinalPoints[cardinalPoints.length - 1]
            break
    }

    return {
        lat: currentPosition.lat,
        long: currentPosition.long,
        direction: newDirection
    }
}

const isCrossingPole = (map: MarsMap, currentPosition: Position, command: Command): boolean => {
    // Se il rover deve girare, non attraversa il polo
    if (isTurnCommand(command)) return false

    if (currentPosition.long === map.longs && currentPosition.direction === Direction.North && command === Commands.Forword) return true
    if (currentPosition.long === map.longs && currentPosition.direction === Direction.South && command === Commands.Backward) return true
    if (currentPosition.long === 1 && currentPosition.direction === Direction.South && command === Commands.Forword) return true
    if (currentPosition.long === 1 && currentPosition.direction === Direction.North && command === Commands.Backward) return true
    return false
}

const isNearNorthPole = (map: MarsMap, currentPosition: Position): boolean => currentPosition.long === map.longs
const isNearSouthPole = (map: MarsMap, currentPosition: Position): boolean => currentPosition.long === 1

const invertDirection = (direction: string): Direction => {
    switch (direction) {
        case Direction.North:
            return Direction.South
        case Direction.South:
            return Direction.North
        case Direction.East:
            return Direction.West
        case Direction.West:
            return Direction.East
        default:
            return direction as Direction
    }
}

const getLatitudePoleCrossed = (map: MarsMap, currentPosition: Position): number => {
    const gap: number = map.lats / 2
    const targetLat: number = currentPosition.lat + gap
    return targetLat > map.lats ? targetLat - map.lats : targetLat
}

const moveRoverCrossPole = (map: MarsMap, currentPosition: Position, command: Command): Position => {
    const isCrossingNorthPole: boolean = isNearNorthPole(map, currentPosition) && ((currentPosition.direction === Direction.North && command === Commands.Forword) || currentPosition.direction === Direction.South && command === Commands.Backward)
    const isCrossingSouthPole: boolean = isNearSouthPole(map, currentPosition) && ((currentPosition.direction === Direction.South && command === Commands.Forword) || currentPosition.direction === Direction.North && command === Commands.Backward)
    if (isCrossingNorthPole || isCrossingSouthPole) {
        return {
            long: currentPosition.long,
            lat: getLatitudePoleCrossed(map, currentPosition),
            direction: invertDirection(currentPosition.direction)
        }
    }
    return currentPosition
}

const isRoverGoingTowardsNorthPole = (currentPosition: Position, command: Command): boolean => {
    if (!isMoveCommand(command)) return false
    return (currentPosition.direction === Direction.North && command === Commands.Forword) || (currentPosition.direction === Direction.South && command === Commands.Backward)
}

const isRoverGoingTowardsSouthPole = (currentPosition: Position, command: Command): boolean => {
    if (!isMoveCommand(command)) return false
    return (currentPosition.direction === Direction.South && command === Commands.Forword) || (currentPosition.direction === Direction.North && command === Commands.Backward)
}

const isRoverGoingTowardsEast = (currentPosition: Position, command: Command): boolean => {
    if (!isMoveCommand(command)) return false
    return (currentPosition.direction === Direction.East && command === Commands.Forword) || (currentPosition.direction === Direction.West && command === Commands.Backward)
}

const isRoverGoingTowardsWest = (currentPosition: Position, command: Command): boolean => {
    if (!isMoveCommand(command)) return false
    return (currentPosition.direction === Direction.West && command === Commands.Forword) || (currentPosition.direction === Direction.East && command === Commands.Backward)
}

const moveRoverNotNearPole = (map: MarsMap, currentPosition: Position, command: Command): Position => {
    let newLong: number = currentPosition.long;
    let newLat: number = currentPosition.lat;
    if (isRoverGoingTowardsNorthPole(currentPosition, command)) {
        ++newLong
    } else if (isRoverGoingTowardsSouthPole(currentPosition, command)) {
        --newLong
    } else if (isRoverGoingTowardsEast(currentPosition, command)) {
        newLat = newLat === map.lats ? 1 : newLat + 1
    } else if (isRoverGoingTowardsWest(currentPosition, command)) {
        newLat = newLat === 1 ? map.lats : newLat - 1
    }
    return {
        long: newLong,
        lat: newLat,
        direction: currentPosition.direction,
    }
}

const isThereAnObstacle = (map: MarsMap, targetPosition: Position): boolean => {
    return map.obstacles.findIndex(obstacle => obstacle.lat === targetPosition.lat && obstacle.long === targetPosition.long) >= 0
}

const executeCommand = (map: MarsMap, currentPosition: Position, command: Command): Position => {
    if (isTurnCommand(command)) {
        return turnRover(currentPosition, command)
    }
    
    const targetPosition: Position = isCrossingPole(map, currentPosition, command)
        ? moveRoverCrossPole(map, currentPosition, command)
        : moveRoverNotNearPole(map, currentPosition, command)
    return targetPosition
}

export default (map: MarsMap, initialPosition: Position, path: Path): EngineResult => {
    let currentPosition: Position = initialPosition
    let obstacleDetected: boolean = false
    let obstaclePosition: Coordinate | null = null
    for(let i = 0; i < path.length; i++) {
        const newPosition: Position = executeCommand(map, currentPosition, path[i])
        if (isThereAnObstacle(map, newPosition)) {
            obstacleDetected = true
            obstaclePosition = { lat: newPosition.lat, long: newPosition.long }
            break
        }
        currentPosition = newPosition
    }
    return {
        currentPosition,
        obstacleDetected,
        obstaclePosition
    }
}