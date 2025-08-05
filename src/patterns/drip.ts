import {Pattern} from '../pattern';

/* Drip Pattern
 * Each beat, a drop drips from the top of the screen
 * It falls at the perfect speed to hit the liquid level at the next beat
 * The liquid level rises with each drop
 * Liquid color is chosen randomly from a set of colors
 * Drops are a thin rectangle
 */

interface Drop {
    speed: number;
    beatAdded: number; // The beat when the drop was added
    x: number; // X position of the drop
}

const liquidColors = [
    '#7979f0',
    '#1b61e5',
    '#5b5bf0',
    '#8d27e6',
    '#e62b70',
    '#d02be6',
    '#2be654',
    '#e6d02b',
    '#e6a12b',
    '#ffffff',
]

const dropWidth = 0.0025; // 0.25% of canvas width
const dropHeight = 0.05; // 5% of canvas height


export class Drip extends Pattern {
    lastDropAdded: number = -1; // Beat when the last drop was added
    drops: Drop[] = []; // Array to hold drops
    liquidColor: string = liquidColors[Math.floor(Math.random() * liquidColors.length)];
    
    liquidLevel(x: number): number {
        return x / 2 + (1 / Math.sqrt(5)) * Math.cos(2 * Math.PI * x) + 1;
    }

    calculateDropSpeed(beat: number): number {
        const nextLevel = this.liquidLevel(beat + 1);
        const currentLevel = this.liquidLevel(beat);
        const speed = (nextLevel - currentLevel) * this.canvas.height; // Convert to pixels
        return speed;
    }

    draw(delta: number): void {
        if (this.beat !== this.lastDropAdded) {
            this.addDrop();
            this.lastDropAdded = this.beat;
        }
        this.drawDrops();
        // Stop after 30 beats
        if (this.beat >= 30) {
            this.stop();
        }
    }

    addDrop(): void {
        const speed = this.calculateDropSpeed(this.beat);
        const beatAdded = this.beat; // Set the current beat as last modified
        const x = Math.random() * this.canvas.width; // Random X position for the drop
        this.drops.push({ speed, beatAdded, x });
    }

    drawDrops(): void {
        // Black background
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw liquid level
        const liquidHeight = this.liquidLevel(this.rawBeat) * this.canvas.height * 0.01;
        this.ctx.fillStyle = this.liquidColor;
        this.ctx.fillRect(0, this.canvas.height - liquidHeight, this.canvas.width, liquidHeight);

        // Draw drops
        for (const drop of this.drops) {
            const y = drop.speed * (this.rawBeat - drop.beatAdded) - dropHeight;
            // Skip drops that are below the liquid level
            if (y > this.canvas.height - liquidHeight) continue;
            const x = drop.x - dropWidth / 2;
            this.ctx.fillStyle = this.liquidColor;
            this.ctx.fillRect(x, y, dropWidth * this.canvas.width, dropHeight * this.canvas.height);
        }
    }
}