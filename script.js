

class Point {
    constructor(x, y, number) {
        this._x = x;
        this._y = y;
        this._number = number;
    }

    setX = (x) => {
        this._x = x;
    }
    setY= (y) => {
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



const points = [point1, point2, point3, point4, point5, point7, point8, point9, point10, point11, point12, point13, point14, point15, point16]

const calculateFuturePoint = (event, point) => {
    let destX = point.getX();
    let destY = point.getY();

    if (event.key === 'ArrowLeft') {
        destX = point.getX() - 1;
    }
    if (event.key === 'ArrowRight') {
        destX = point.getX() + 1;
    }
    if (event.key === 'ArrowUp') {
        destY = point.getY() + 1;
    }
    if (event.key === 'ArrowDown') {
        destY = point.getY() - 1;
    }
    return [destX, destY]
}

const crossingBorder = (destX, destY) => {
    const maxValue = 3;
    const minValue = 0;
    let isConditionBorder

    if (minValue <= destX && maxValue >= destX && minValue <= destY && maxValue >= destY) {
        isConditionBorder = true;
    } else {
        isConditionBorder = false;
    }
    return isConditionBorder
}

const findPoint = (destX, destY) => {
    let pointBusy = undefined;
    points.forEach((point) => {
        if (point.getX() === destX && point.getY() === destY) {
            pointBusy = point;
        }
    })
    return pointBusy
}

const handleMoving = (event) => {
    let isPointMoved = false
    points.forEach((startPoint) => {
        if (!isPointMoved) {

            // Вычисляем будущее значение x и y с помощью функции calculateFuturePoint
            const futureCoordinates = calculateFuturePoint(event, startPoint)
            const destX = futureCoordinates[0];
            const destY = futureCoordinates[1];

            //Проверяем наличие боковой границы функцией crossingBorder
            const isConditionBorder = crossingBorder(destX, destY);

            // Проверяем занята ли точка на которую планируется перемещение текущей клетки
            // Сохраняем эту клетку в новую переменную как объект

            const pointBusy = findPoint(destX, destY);

            // Перемещаем клетку на точку с координатами destX и destY

            if (isConditionBorder && pointBusy === undefined) {
                startPoint.setX(destX)
                startPoint.setY(destY)
                isPointMoved = true
            }
        }
    })
    // Перерисовываем поле и объекты
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
    });
}

const main = () => {
    document.addEventListener('keydown', handleMoving);
    render(points);
}

main()
