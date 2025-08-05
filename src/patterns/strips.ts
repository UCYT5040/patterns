import {Pattern} from '../pattern';

/* Strips Pattern
 * Each beat, a strip is added from the left
 * A random y is assigned
 * The strip moves to the right such that it reaches the right side in 8 beats
 * Speed should be increased as a beat occurs (using sine waves)
 * Strip width is calculated by integrating the sine wave over 8 beats
 * Strips are semi-transparent and overlap
 * Colors are chosen randomly from a set of colors
 */

interface Strip {
    beatAdded: number; // The beat when the strip was added
    y: number; // Y position of the strip
    color: string; // Color of the strip
}

const stripColors = [
    '#1b61e5',
    '#8d27e6',
    '#e62b70',
    '#d02be6',
    '#2be654',
    '#e6d02b',
    '#e6a12b',
    '#ffffff',
]

const stripHeight = 0.1; // 10% of canvas height
const stripOpacity = 0.75; // 75% opacity


export class Strips extends Pattern {
    lastStripAdded: number = -1; // Beat when the last drop was added
    strips: Strip[] = []; // Array to hold strips

    calculateStripWidth(strip: Strip): number {
        const t = (this.rawBeat - strip.beatAdded);
        console.log("T", t)
        return ((Math.sin(2 * Math.PI * t) / (4 * Math.PI)) + (t / 2))/4;
    }

    addStrip(): void {
        const y = Math.random() * (this.canvas.height - this.canvas.height * stripHeight); // Random y position
        const color = stripColors[Math.floor(Math.random() * stripColors.length)];
        const beatAdded = this.beat; // Set the current beat as last modified

        this.strips.push({ beatAdded, y, color });
    }

    draw(delta: number): void {
        // Black background
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.beat !== this.lastStripAdded) {
            this.addStrip();
            this.lastStripAdded = this.beat;
        }
        this.drawStrips();
        // Stop after 24 beats
        if (this.beat >= 24) {
            this.stop();
        }
    }

    drawStrips(): void {
        for (const strip of this.strips) {
            const width = this.calculateStripWidth(strip) * this.canvas.width; // Calculate width based on sine wave
            console.log(width);
            const x = 0;
            const y = strip.y; // Y position of the strip
            this.ctx.fillStyle = `${strip.color}${Math.floor(stripOpacity * 255).toString(16)}`; // Semi-transparent color
            this.ctx.fillRect(x, y, width, this.canvas.height * stripHeight); // Draw the strip
        }
    }
}