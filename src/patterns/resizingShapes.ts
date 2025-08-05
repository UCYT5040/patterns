import {Pattern} from '../pattern';

/* ResizingShapes Pattern
 * Every beat, a new shape appears
 * Each beat, shapes increase in size & lose brightness
 */

const shapes = ['circle', 'square', 'triangle', 'star5', 'star6'] as const;

interface Shape {
    type: typeof shapes[number];
    color: [number, number, number];
    x: number;
    y: number;
    size: number;
    opacity: number;
    rotate: number;
    createdAt: number; // The beat when the shape was created
}

export class ResizingShapes extends Pattern {
    shapes: Shape[] = [];
    lastBeatAdded: number = -1;

    draw(delta: number): void {
        // Black background
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.beat !== this.lastBeatAdded) {
            this.addShape();
            this.lastBeatAdded = this.beat;
        }
        this.drawShapes();
        // Stop after 30 beats
        if (this.beat >= 30) {
            this.stop();
        }
    }

    addShape(): void {
        const type = shapes[Math.floor(Math.random() * shapes.length)];
        const color: [number, number, number] = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;
        const size = 40 + Math.random() * 30; // Size between 40 and 70
        const opacity = 1;
        const rotate = Math.random() * 360; // Random rotation angle
        const createdAt = this.beat; // Set the current beat as last modified

        this.shapes.push({ type, color, x, y, size, opacity, rotate, createdAt });
    }

    getSize(time: number): number {
        return time / 2 + (1 / Math.sqrt(5)) * Math.cos(2 * Math.PI * time);
    }

    drawShapes(): void {
        for (const shape of this.shapes) {
            const currentBeat = this.rawBeat - shape.createdAt; // Calculate how many beats have passed since creation
            const size = shape.size + 5 * this.getSize(currentBeat); // Increase size over time
            if (size <= 0) continue; // Skip shapes that are too small
            const opacity = Math.max(0, shape.opacity - (currentBeat * 0.1)); // Decrease opacity over time
            this.ctx.fillStyle = `rgba(${shape.color[0]}, ${shape.color[1]}, ${shape.color[2]}, ${opacity})`;
            this.ctx.save();
            this.ctx.translate(shape.x, shape.y); // Move context to shape position
            this.ctx.rotate(shape.rotate * Math.PI / 180); // Rotate the context
            if (shape.type === 'circle') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                this.ctx.fill();
            } else if (shape.type === 'square') {
                this.ctx.fillRect(- size / 2, - size / 2, size, size); // Center the square
            } else if (shape.type === 'triangle') {
                this.ctx.beginPath();
                this.ctx.moveTo(0, -size / 2);
                this.ctx.lineTo(size / 2, size / 2);
                this.ctx.lineTo(-size / 2, size / 2);
                this.ctx.closePath();
                this.ctx.fill();
            } else if (shape.type === 'star5') {
                this.ctx.beginPath();
                const outerRadius = size / 2;
                const innerRadius = size / 4;
                for (let i = 0; i < 5; i++) {
                    const angle = i * (Math.PI * 2 / 5);
                    this.ctx.lineTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
                    this.ctx.lineTo(Math.cos(angle + Math.PI / 5) * innerRadius, Math.sin(angle + Math.PI / 5) * innerRadius);
                }
                this.ctx.closePath();
                this.ctx.fill();
            } else if (shape.type === 'star6') {
                this.ctx.beginPath();
                const outerRadius = size / 2;
                const innerRadius = size / 4;
                for (let i = 0; i < 6; i++) {
                    const angle = i * (Math.PI * 2 / 6);
                    this.ctx.lineTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
                    this.ctx.lineTo(Math.cos(angle + Math.PI / 6) * innerRadius, Math.sin(angle + Math.PI / 6) * innerRadius);
                }
                this.ctx.closePath();
                this.ctx.fill();
            }
            this.ctx.restore();
        }
    }
}