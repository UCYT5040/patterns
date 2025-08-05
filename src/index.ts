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

let track;

function selectTrack() {
    track = tracks[Math.floor(Math.random() * tracks.length)];
}

selectTrack();

let audio = new Audio(track.url as unknown as string); // Parcel handles URL to string conversion
let nextAudio: HTMLAudioElement | null = null;

function startTrack() {
    if (!track || !ctx) return;

    if (nextAudio) {
        audio = nextAudio;
        nextAudio = null;
    }

    audio.play().catch(error => {
        console.error('Error playing audio:', error);
    });

    audio.onended = () => {
        // Start fetching a new track when the current one ends
        if (!nextAudio) {
            selectTrack();
            nextAudio = new Audio(track.url as unknown as string); // Parcel handles URL to string conversion
        }
    }

    let pattern: Pattern;
    let continueAnimation = true;

    function stop() { // After a pattern is done, switch to a new one
        pattern = new track.patterns[Math.floor(Math.random() * track.patterns.length)](canvas, ctx, track.bpm, stop);
        // Check if the audio is done
        if (audio.ended) {
            continueAnimation = false;
            selectTrack();
            audio.src = track.url as unknown as string; // Parcel handles URL to string conversion
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    }

    stop();

    function animate() {
        pattern.frame();
        requestAnimationFrame(animate);
    }

    if (continueAnimation) animate();
}

canvas.addEventListener('click', () => {
    startTrack();
});
