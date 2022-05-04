class Point {
    constructor(x, y, number) {
        this._x = x;
        this._y = y;
        this._number = number;
    }

    setX = (x) => {
        this._x = x;
    }
    setY = (y) => {
        this._y = y;
    }

    getX = () => {
        return this._x
    }
    getY = () => {
        return this._y
    }
    getNumber = () => {
        return this._number
    }
}

const point1 = new Point(0,0, '5');
const point2 = new Point(1,0, '14');
const point3 = new Point(2, 0, '9');
const point4 = new Point(3, 0, '11');
const point5 = new Point(0, 1, '2');
const point6 = new Point(1, 1, '');
const point7 = new Point(2, 1, '6');
const point8 = new Point(3, 1, '13');
const point9 = new Point(0, 2, '10');
const point10 = new Point(1, 2, '7');
const point11 = new Point(2, 2, '4');
const point12 = new Point(3, 2, '15');
const point13 = new Point(0, 3, '3');
const point14 = new Point(1, 3, '8');
const point15 = new Point(2, 3, '12');
const point16 = new Point(3, 3, '1');

const points = [point1, point2, point3, point4, point5, point6, point7, point8, point9, point10, point11, point12, point13, point14, point15, point16]

const swapСhips = (event) => {
    const freePoint = searchFreePoint(points)

    const futureCoordinates = receiptFutureCoordinates(event, freePoint);
    let destX = futureCoordinates[0]
    let destY = futureCoordinates[1]

    const crossingBorder = detectionBorder(destX, destY)

    const futurePoint = searchFuturePoint(points, destX, destY)

    if (crossingBorder) {
        shiftCards(freePoint, futurePoint)
    }
}

const searchFreePoint = (points) => {
    let freePoint
    points.forEach((point) => {
        if (point.getNumber() === '') {
            freePoint = point
        }
    })
    return freePoint
}

const receiptFutureCoordinates = (event, freePoint) => {
    let destX = freePoint.getX()
    let destY = freePoint.getY()

    if (event.key === 'ArrowLeft') {
        destX = freePoint.getX() + 1;
    }
    if (event.key === 'ArrowRight') {
        destX = freePoint.getX() - 1;
    }
    if (event.key === 'ArrowUp') {
        destY = freePoint.getY() - 1;
    }
    if (event.key === 'ArrowDown') {
        destY = freePoint.getY() + 1;
    }
    return [destX, destY]
}

const detectionBorder = (destX, destY) => {
    const minValue = 0
    const maxValue = 3
    let crossingBorder = false

    if (minValue <= destX && destX <= maxValue && minValue <= destY && destY <= maxValue) {
        crossingBorder = true
    }
    return crossingBorder
}

function soundPlay() {
    let audio = new Audio('pokagu.mp3');
    audio.play();
}

const searchFuturePoint = (points, destX, destY) => {
    let futurePoint
    points.forEach((point) => {
        if (point.getX() === destX && point.getY() === destY) {
            futurePoint = point
        }
    })
    return futurePoint
}

const shiftCards = (freePoint, futurePoint) => {
    let pointFutureX = futurePoint.getX()
    let pointFutureY = futurePoint.getY()
    futurePoint.setX(freePoint.getX())
    futurePoint.setY(freePoint.getY())
    freePoint.setX(pointFutureX)
    freePoint.setY(pointFutureY)
}

const chooseDifficulty = (points) => {
    const easy = document.querySelector('#point1')
    const intermediate = document.querySelector('#point2')
    const normal = document.querySelector('#point3')
    const hard = document.querySelector('#point4')

    let skillPoints

    if (easy.checked) {
         skillPoints = points.filter((point) => {
            if (point.getNumber() >= 1 && point.getNumber() <= 4) {
                return point
            }
        })
    }
    if (intermediate.checked) {
        skillPoints = points.filter((point) => {
            if (point.getNumber() >= 1 && point.getNumber() <= 8) {
                return point
            }
        })
    }
    if (normal.checked) {
        skillPoints = points.filter((point) => {
            if (point.getNumber() >= 1 && point.getNumber() <= 12) {
                return point
            }
        })
    }

    if (hard.checked) {
        skillPoints = points
    }

    return skillPoints
}

const validate = (points) => {
    const template = {
        '1': {'x': 0, 'y': 3},
        '2': {'x': 1, 'y': 3},
        '3': {'x': 2, 'y': 3},
        '4': {'x': 3, 'y': 3},
        '5': {'x': 0, 'y': 2},
        '6': {'x': 1, 'y': 2},
        '7': {'x': 2, 'y': 2},
        '8': {'x': 3, 'y': 2},
        '9': {'x': 0, 'y': 1},
        '10': {'x': 1, 'y': 1},
        '11': {'x': 2, 'y': 1},
        '12': {'x': 3, 'y': 1},
        '13': {'x': 0, 'y': 0},
        '14': {'x': 1, 'y': 0},
        '15': {'x': 2, 'y': 0},
        '': {'x': 3, 'y': 0}
    }
    let valid = true

    points.forEach((point) => {
                let validX = template[point.getNumber()]['x']
                let validY = template[point.getNumber()]['y']

                if (!(point.getX() === validX && point.getY() === validY)) {
                    valid = false
                }
        })

    return valid
}

const checkEndGame = () => {
    const difficulty = chooseDifficulty(points)
    let valid = validate(difficulty)
    if(valid) {
        const lukas = document.querySelector('.lukas')
        soundPlay()
        lukas.classList.add('lukas_enable')
        document.removeEventListener('keydown', handleMoving)
    }
}

function listenersDifficulty() {
    document.addEventListener('keydown', handleMoving);
    const pointers = document.querySelectorAll('input')
    pointers.forEach((point) => {
        point.addEventListener('click', () => {
            chooseDifficulty(points)
        })
    })
}

const handleMoving = (event) => {

    swapСhips(event)

    checkEndGame()

    render(points)
}

const render = (points) => {
    const listTableItem = document.querySelectorAll('.table__item');

    listTableItem.forEach((item) => {
        item.textContent = ''
    });

    points.forEach((point) => {
        const pointElement = document.querySelector(`[x="${point.getX()}"][y="${point.getY()}"]`);
        pointElement.textContent = point.getNumber();
    })
}

const main = () => {
    listenersDifficulty();
    render(points);
}

main()