import {Pattern} from './pattern';
import {ResizingShapes} from './patterns/resizingShapes';
import {Title} from './patterns/title';
import {Drip} from './patterns/drip';

interface Track {
    title: string;
    author: string;
    url: URL;
    bpm: number;
    patterns: (typeof Pattern)[];
}

const allPatterns = [ResizingShapes, Title, Drip, Drip, Drip, Drip, Drip, Drip]

export const tracks: Track[] = [
    {
        title: 'Načnyja Zarnicy',
        author: 'Cantroll',
        url: new URL('music/nacnyja-zarnicy.mp3', import.meta.url),
        bpm: 100,
        patterns: allPatterns
    },
    {
        title: "She Comes at Night",
        author: "Emmraan",
        url: new URL('music/she-comes-at-night.mp3', import.meta.url),
        bpm: 157,
        patterns: allPatterns
    },
    {
        title: "Old Harlem Style",
        author: "Andy Warner",
        url: new URL('music/old-harlem-style.mp3', import.meta.url),
        bpm: 80,
        patterns: allPatterns
    },
    {
        title: "Dance of Hope",
        author: "Tal Babitzky",
        url: new URL('music/dance-of-hope.mp3', import.meta.url),
        bpm: 130,
        patterns: allPatterns
    },
    {
        title: "Piano Hip Hop",
        author: "UrbanGodzilla",
        url: new URL('music/piano-hip-hop.mp3', import.meta.url),
        bpm: 119,
        patterns: allPatterns
    }
];