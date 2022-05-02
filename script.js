

class Point {
    constructor(x, y, image, border) {
        this._x = x;
        this._y = y;
        this._image = image;
        this._border = border;
    }

    setX = (x) => {
        this._x = x;
    }
    setY= (y) => {
        this._y = y;
    }
    setImage = (image) => {
        this._image = image;
    }
    setBorder = (border) => {
        this._border = border;
    }

    getImage = () => {
        return this._image
    }

    getBorder = () => {
        return this._border
    }

    getX = () => {
        return this._x
    }
    getY = () => {
        return this._y
    }
}

const startPoint = new Point(0,0, 'square_enable', 'table__item-border');
const fakePoint = new Point(1,2, 'lukas_enable', undefined);
const manPoint = new Point(0, 1, 'lukas_enable', undefined);

const points = [startPoint, fakePoint, manPoint,
    new Point(3, 1, 'lukas_enable', undefined)
]




const handleMoving = (event) => {

// Вычисляем будущее значение x и y
    let destX = startPoint.getX();
    let destY = startPoint.getY();

    if (event.key === 'ArrowLeft') {
        destX = startPoint.getX() - 1;
    }
    if (event.key === 'ArrowRight') {
        destX = startPoint.getX() + 1;
    }
    if (event.key === 'ArrowUp') {
        destY = startPoint.getY() + 1;
    }
    if (event.key === 'ArrowDown') {
        destY = startPoint.getY() - 1;
    }

    //Проверяем границу
    const maxValue = 3;
    const minValue = 0;
    let isConditionBorder

    if (minValue <= destX && maxValue >= destX && minValue <= destY && maxValue >= destY) {
         isConditionBorder = true;
    } else {
         isConditionBorder = false
    }

    // Проверяем наличие и находим лукаса который расположен на точке перемещения
    // Найти точку с которой пересекаемся (а если не найдено undefinied)
    let pointBusy = undefined;
    points.forEach((point) => {
        if (point.getX() === destX && point.getY() === destY) {
            pointBusy = point;
        }
    })


    // Перемещаем вопрос на точку с координатами destX и destY

    if (isConditionBorder) {
        if (pointBusy !== undefined) {
            pointBusy.setX(startPoint.getX())
            pointBusy.setY(startPoint.getY())
        }
        startPoint.setX(destX)
        startPoint.setY(destY)
    }

 // Перерисовываем поле и объекты
    render(points)

}



const render = (points) => {
    const listTableItem = document.querySelectorAll('.table__item');

    listTableItem.forEach((item) => {
        item.classList.remove('lukas_enable')
        item.classList.remove('square_enable')
        item.classList.remove('table__item-border')
    });

    points.forEach((point) => {
        const lukas = document.querySelector(`[x="${point.getX()}"][y="${point.getY()}"]`);
        lukas.classList.add(point.getImage());
        lukas.classList.add(point.getBorder());

    });
}

const main = () => {
    document.addEventListener('keydown', handleMoving);
    render(points);
}

main()
