export class Pattern {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    bpm: number;
    startTime: number = 0;
    rawBeat: number = 0;
    beat: number = 0;
    stop: () => void;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, bpm: number, stop: () => void) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.bpm = bpm;
        this.stop = stop;
        this.init();
    }

    init(): void {
        // Implement in subclasses
    }

    draw(delta: number): void {
        // Implement in subclasses
    }

    calculateBeat(delta: number): void {
        const secondsPerBeat = 60 / this.bpm;
        this.rawBeat = delta / 1000 / secondsPerBeat; // Convert delta to seconds and calculate raw beat
        this.beat = Math.floor(this.rawBeat);
    }

    frame(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.startTime === 0) {
            this.startTime = performance.now();
        }
        const now = performance.now();
        const elapsed = now - this.startTime;
        this.calculateBeat(elapsed);
        this.draw(elapsed);
    }
}