class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    moveLeft = () => {
        this._x = this._x - 1;
    }
    moveRight = () => {
        this._x = this._x + 1;
    }
    moveUp = () => {
        this._y = this._y + 1;
    }
    moveDown = () => {
        this._y = this._y - 1;
    }
    getX = () => {
        return this._x
    }
    getY = () => {
        return this._y
    }
}

const startPoint = new Point(0,0);


const handleMoving = (event) => {
    const maxValue = 3;
    const minValue = 0;

    if (event.key === 'ArrowLeft' && startPoint.getX() > minValue && startPoint.getX() <= maxValue) {
        startPoint.moveLeft();
    }

    if (event.key === 'ArrowRight' && startPoint.getX() >= minValue && startPoint.getX() < maxValue) {
        startPoint.moveRight();

    }

    if (event.key === 'ArrowUp' && startPoint.getY() >= minValue && startPoint.getY() < maxValue) {
        startPoint.moveUp();
    }

    if (event.key === 'ArrowDown' && startPoint.getY() > minValue && startPoint.getY() <= maxValue) {
        startPoint.moveDown();
    }
    render(startPoint)
}

document.addEventListener('keydown', handleMoving)

const render = (point) => {
    const listTableItem = document.querySelectorAll('.table__item');

    listTableItem.forEach((item) => {
        if (item.classList.contains('lukas_enable')) {
            item.classList.remove('lukas_enable')
        }
        if (item.classList.contains('square_enable')) {
            item.classList.remove('square_enable')
        }
    });

    const lukas = document.querySelector(`[x="${point.getX()}"][y="${point.getY()}"]`);
    lukas.classList.add('lukas_enable');

    const parameterX = document.querySelector('.parameters__x');
    const parameterY = document.querySelector('.parameters__y');
    parameterX.textContent = point.getX();
    parameterY.textContent = point.getY();

}
