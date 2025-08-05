import {tracks} from './tracks';
import {Pattern} from './pattern';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (!ctx) {
    throw new Error('Failed to get canvas context');
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);

let track = tracks[0]; // Select the first track for now

const audio = new Audio(track.url as unknown as string); // Parcel handles URL to string conversion

function startTrack() {
    if (!track || !ctx) return;

    audio.loop = true;
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
    });

    let pattern: Pattern;

    function stop() { // After a pattern is done, switch to a new one
        pattern = new track.patterns[Math.floor(Math.random() * track.patterns.length)](canvas, ctx, track.bpm, stop);
    }

    stop();

    function animate() {
        pattern.frame();
        requestAnimationFrame(animate);
    }

    animate();
}

canvas.addEventListener('click', () => {
    startTrack();
});
