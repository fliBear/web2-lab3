export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPosition(x, y) {
    let rndX = getRandomNumber(0, x);
    let rndY = getRandomNumber(0, y);
    return [rndX, rndY];
}

function randomSpeed(base) {
    return Math.random() + getRandomNumber(1, base);
}

function randomSpeedWithDirection(base) {
    let direction = getRandomNumber(0, 1);
    let speed = randomSpeed(base);
    if (direction) {
        return speed;
    }
    return -1 * speed;
}

export default function component(
    width,
    height,
    color,
    canvasWidth,
    canvasHeight,
    type,
    ctx
) {
    let pos = randomPosition(canvasWidth, canvasHeight);
    this.type = type;
    this.width = width;
    this.height = height;
    this.speed_x = randomSpeedWithDirection(3);
    this.speed_y = randomSpeedWithDirection(3);
    this.x = pos[0];
    this.y = pos[1];
    this.ctx = ctx;
    this.update = function () {
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.restore();
    };
    this.newPos = function () {
        //X change
        if (this.x <= 0)
            this.speed_x =
                Math.abs(this.speed_x) + randomSpeedWithDirection(2) / 2;
        else if (this.x + this.width >= this.ctx.canvas.width)
            this.speed_x =
                -1 * Math.abs(this.speed_x) + randomSpeedWithDirection(2) / 2;

        //Y change
        if (this.y < 0)
            this.speed_y =
                Math.abs(this.speed_y) + randomSpeedWithDirection(2) / 2;
        else if (this.y + this.height >= this.ctx.canvas.height)
            this.speed_y =
                -1 * Math.abs(this.speed_y) + randomSpeedWithDirection(2) / 2;

        this.x += this.speed_x;
        this.y += this.speed_y;
    };
}
