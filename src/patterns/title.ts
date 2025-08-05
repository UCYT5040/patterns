import {Pattern} from '../pattern';

/* Title Pattern
 * Follows the sequence (at a spead of 1 beat):
 * 1. Empty black background
 * 2. Rectangle
 * 3. Each letter of "patterns" (1 letter per beat)
 * 4. Inverted colors
 */

const word = 'patterns';
const rectHeight = 0.1; // 10% of canvas height
const letterWidth = 0.1; // 10% of canvas width
const rectWidth = letterWidth * word.length; // Width of the rectangle based on the word length
const xOffset = 0.01; // 5% of canvas width offset for centering the text
const yOffset = 0.025; // 5% of canvas height offset for centering the text
const underlineHeight = 0.01; // 1% of canvas height for underline

export class Title extends Pattern {
    getFontSize(): number {
        return Math.min(this.canvas.width, this.canvas.height) * 0.1; // 10% of the smaller dimension
    }

    draw(delta: number): void {
        const inverted = this.beat >= (2 + word.length); // Check if we are on the last beat to invert colors
        // Black background
        this.ctx.fillStyle = inverted ? 'white' : 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Rectangle
        if (this.beat >= 1) {
            this.ctx.fillStyle = inverted ? 'black' : 'white';
            const height = this.canvas.height * rectHeight;
            const width = this.canvas.width * rectWidth;
            const x = (this.canvas.width - width) / 2;
            const y = (this.canvas.height - height) / 2;
            this.ctx.fillRect(x, y, width, height);
        }
        // Letters
        if (this.beat >= 2) {
            this.ctx.fillStyle = inverted ? 'white' : 'black';
            this.ctx.font = `${this.getFontSize()}px sans-serif`;
            const startX = (this.canvas.width - rectWidth * this.canvas.width) / 2 + this.canvas.width * xOffset;
            const startY = (this.canvas.height - this.canvas.height * rectHeight) / 2 + this.canvas.height * rectHeight / 2 + this.canvas.height * yOffset;
            for (let i = 0; i < word.length; i++) {
                if (this.beat >= 2 + i) {
                    const letter = word[i];
                    const x = startX + i * letterWidth * this.canvas.width + (letterWidth * this.canvas.width - this.getFontSize()) / 2;
                    this.ctx.fillText(letter, x, startY);
                }
            }
        }
        // Stop after the last beat
        if (this.beat >= 2 + word.length + 1) {
            this.stop();
        }
    }
}