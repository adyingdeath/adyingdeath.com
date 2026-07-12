import { md, CodeBlock, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  title: "Github Snake",
  summary: "A fun JavaScript snippet that turns your GitHub contribution graph into a playable Snake game. Paste it in the console and start playing!",
  date: "2026-07-12",
};

export default function post() {
  return (
    <>
      {md`
I created this github profile snake game purely for fun. The code isn't optimized. Feel free to experiment with it below.
      `}

      {md`
Navigate to your github profile page. Then open \`devtools > Console\`. Copy and paste the following code. Run it, then you will see the snake game. Press any key to begin. Use arrow keys to move.
      `}

      <CodeBlock
        language="javascript"
        filename="Snake.js"
        code={`
(() => {
    const tbody = document.querySelector("#user-profile-frame > div > div:nth-child(2) > div > div.col-12.col-lg-10 > div.js-yearly-contributions > div > div > div > div:nth-child(1) > table > tbody");
    const width = Array.from(tbody.querySelectorAll("tr"))
        .map((tr) => tr.querySelectorAll("td.ContributionCalendar-day").length)
        .reduce((pre, cur) => cur <= pre ? cur : pre, 1024);
    const height = tbody.querySelectorAll("tr").length;

    let grids = new Array(width).fill(0).map((e) => new Array(height));

    // Link grids
    Array.from(tbody.querySelectorAll("tr")).forEach((tr, y) => {
        let x = 0;
        for (let grid of tr.querySelectorAll("td.ContributionCalendar-day")) {
            if (x >= width) break;
            grids[x++][y] = grid;
        }
    });

    const setLevel = (x, y, level) => {
        if (x >= width || y >= height) return;
        if (level < 0 || level > 4) return;
        grids[x][y].setAttribute("data-level", level);
    }

    const clearAll = () => {
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                setLevel(x, y, 0);
            }
        }
    };

    // Digit patterns (3x5)
    const DIGITS = {
        '0': [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]],
        '1': [[0, 1, 0], [1, 1, 0], [0, 1, 0], [0, 1, 0], [1, 1, 1]],
        '2': [[1, 1, 1], [0, 0, 1], [1, 1, 1], [1, 0, 0], [1, 1, 1]],
        '3': [[1, 1, 1], [0, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
        '4': [[1, 0, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [0, 0, 1]],
        '5': [[1, 1, 1], [1, 0, 0], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
        '6': [[1, 1, 1], [1, 0, 0], [1, 1, 1], [1, 0, 1], [1, 1, 1]],
        '7': [[1, 1, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]],
        '8': [[1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1]],
        '9': [[1, 1, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]]
    };

    const drawScore = (score) => {
        const str = score.toString();
        const digitWidth = 3;
        const gap = 1;
        let totalWidth = str.length * (digitWidth + gap) - gap;
        let displayStr = str;
        const maxWidth = Math.floor(width * 0.8);
        while (totalWidth > maxWidth && displayStr.length > 1) {
            displayStr = displayStr.slice(1);
            totalWidth = displayStr.length * (digitWidth + gap) - gap;
        }
        if (totalWidth > maxWidth && displayStr.length > 1) {
            displayStr = displayStr.slice(-1);
            totalWidth = digitWidth;
        }
        const startX = 0;
        let x = startX;
        const y = 1;
        for (let ch of displayStr) {
            const pattern = DIGITS[ch];
            if (!pattern) continue;
            for (let row = 0; row < pattern.length; row++) {
                for (let col = 0; col < pattern[row].length; col++) {
                    if (pattern[row][col]) {
                        const px = x + col;
                        const py = y + row;
                        if (px < width && py < height) {
                            setLevel(px, py, 1);
                        }
                    }
                }
            }
            x += digitWidth + gap;
        }
    };

    // Letter patterns (5x7)
    const LETTERS = {
        S: [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
        N: [[1, 0, 0, 0, 1], [1, 1, 0, 0, 1], [1, 1, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 1, 1], [1, 0, 0, 1, 1], [1, 0, 0, 0, 1]],
        A: [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
        K: [[1, 0, 0, 0, 1], [1, 0, 0, 1, 0], [1, 0, 1, 0, 0], [1, 1, 0, 0, 0], [1, 0, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 0, 1]],
        E: [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1]]
    };

    // State
    const STATE = { TITLE: 'title', PLAYING: 'playing', PAUSED: 'paused', GAMEOVER: 'gameover' };
    let gameState = STATE.TITLE;
    let snake = [];
    let food = null;
    let direction = 'right';
    let score = 0;
    let timerId = null;
    const MOVE_INTERVAL = 150;
    let directionQueue = [];

    let titleCells = [];
    let blinkTimer = null;

    const startBlinking = () => {
        if (blinkTimer) clearInterval(blinkTimer);
        if (titleCells.length === 0) return;
        let level = 4;
        let dir = 1;
        blinkTimer = setInterval(() => {
            if (level + dir > 4 || level + dir < 0) {
                dir *= -1;
            }
            level += dir;
            titleCells.forEach(cell => {
                if (cell.x < width && cell.y < height) {
                    setLevel(cell.x, cell.y, level);
                }
            });
        }, 200);
    };

    const stopBlinking = () => {
        if (blinkTimer) { clearInterval(blinkTimer); blinkTimer = null; }
    };

    const drawTitle = () => {
        clearAll();
        titleCells = [];
        const word = ['S', 'N', 'A', 'K', 'E'];
        const letterWidth = 5, gap = 1;
        const totalWidth = word.length * (letterWidth + gap) - gap;
        const startX = Math.max(0, Math.floor((width - totalWidth) / 2));
        const startY = Math.max(0, Math.floor((height - 7) / 2));
        let x = startX;
        word.forEach(ch => {
            const pattern = LETTERS[ch];
            if (pattern) {
                for (let row = 0; row < pattern.length; row++) {
                    for (let col = 0; col < pattern[row].length; col++) {
                        if (pattern[row][col]) {
                            const px = x + col, py = startY + row;
                            if (px < width && py < height) {
                                setLevel(px, py, 4);
                                titleCells.push({ x: px, y: py });
                            }
                        }
                    }
                }
                x += letterWidth + gap;
            }
        });
        startBlinking();
    };

    const generateFood = () => {
        const total = width * height;
        if (snake.length >= total) return false;
        const snakeSet = new Set(snake.map(p => \`\${p.x},\${p.y}\`));
        let attempts = 0, pos;
        do {
            pos = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
            attempts++;
        } while (snakeSet.has(\`\${pos.x},\${pos.y}\`) && attempts < 2000);
        if (attempts >= 2000) return false;
        food = pos;
        return true;
    };

    const drawGame = () => {
        clearAll();
        drawScore(score);
        if (food) {
            setLevel(food.x, food.y, 4);
        }
        for (let i = 0; i < snake.length - 1; i++) {
            const p = snake[i];
            setLevel(p.x, p.y, 3);
        }
        if (snake.length > 0) {
            const head = snake[snake.length - 1];
            setLevel(head.x, head.y, 4);
        }
    };

    const gameOver = () => {
        if (gameState === STATE.GAMEOVER) return;
        gameState = STATE.GAMEOVER;
        if (timerId) { clearInterval(timerId); timerId = null; }
    };

    const gameWin = () => {
        gameState = STATE.GAMEOVER;
        if (timerId) { clearInterval(timerId); timerId = null; }
    };

    const step = () => {
        if (gameState !== STATE.PLAYING) return;

        if (directionQueue.length > 0) {
            direction = directionQueue.shift();
        }

        const head = snake[snake.length - 1];
        let newHead = { ...head };
        switch (direction) {
            case 'up': newHead.y--; break;
            case 'down': newHead.y++; break;
            case 'left': newHead.x--; break;
            case 'right': newHead.x++; break;
            default: return;
        }
        const isEating = food && newHead.x === food.x && newHead.y === food.y;
        if (newHead.x < 0 || newHead.x >= width || newHead.y < 0 || newHead.y >= height) {
            gameOver(); return;
        }
        const selfCollision = snake.some((seg, index) => {
            if (isEating) return seg.x === newHead.x && seg.y === newHead.y;
            else return index !== 0 && seg.x === newHead.x && seg.y === newHead.y;
        });
        if (selfCollision) { gameOver(); return; }

        snake.push(newHead);
        if (isEating) {
            score++;
            if (!generateFood()) { gameWin(); return; }
        } else {
            snake.shift();
        }
        drawGame();
    };

    const startGame = () => {
        stopBlinking();
        clearAll();
        const startX = Math.min(width - 3, Math.floor(width / 2));
        const startY = Math.min(height - 1, Math.floor(height / 2));
        snake = [
            { x: startX - 2, y: startY },
            { x: startX - 1, y: startY },
            { x: startX, y: startY }
        ];
        direction = 'right';
        directionQueue = [];
        score = 0;
        food = null;
        if (!generateFood()) {
            food = { x: startX + 1, y: startY };
            if (food.x >= width) food.x = startX - 3;
        }
        gameState = STATE.PLAYING;
        drawGame();
        if (timerId) clearInterval(timerId);
        timerId = setInterval(step, MOVE_INTERVAL);
    };

    const resetToTitle = () => {
        stopBlinking();
        if (timerId) { clearInterval(timerId); timerId = null; }
        gameState = STATE.TITLE;
        snake = [];
        food = null;
        score = 0;
        directionQueue = [];
        drawTitle();
    };

    const keyHandler = (e) => {
        const key = e.key;
        if (key.startsWith('Arrow') || key === ' ' || key === 'Spacebar' || key === 'Space') {
            e.preventDefault();
        }
        if (gameState === STATE.TITLE) {
            if (key !== '') { startGame(); }
            return;
        }
        if (gameState === STATE.GAMEOVER) {
            resetToTitle();
            return;
        }
        if (gameState === STATE.PLAYING) {
            let newDir = null;
            switch (key) {
                case 'ArrowUp': newDir = 'up'; break;
                case 'ArrowDown': newDir = 'down'; break;
                case 'ArrowLeft': newDir = 'left'; break;
                case 'ArrowRight': newDir = 'right'; break;
                default: return;
            }

            const lastDir = directionQueue.length > 0 ? directionQueue[directionQueue.length - 1] : direction;
            const opposites = { up: 'down', down: 'up', left: 'right', right: 'left' };

            if (newDir !== opposites[lastDir]) {
                if (directionQueue.length < 3) {
                    directionQueue.push(newDir);
                }
            }
        }
    };
    document.addEventListener('keydown', keyHandler);

    resetToTitle();
    window.addEventListener('beforeunload', () => { if (timerId) clearInterval(timerId); stopBlinking(); });
    console.log('Snake game started. Press any key to begin.');
})();
`}
      />
    </>
  );
}
