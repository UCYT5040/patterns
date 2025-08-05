import {Pattern} from './pattern';
import {ResizingShapes} from './patterns/resizingShapes';
import {Title} from './patterns/title';

interface Track {
    title: string;
    author: string;
    url: URL;
    bpm: number;
    patterns: (typeof Pattern)[];
}

export const tracks: Track[] = [
    {
        title: 'Načnyja Zarnicy',
        author: 'Cantroll',
        url: new URL('music/nacnyja-zarnicy.mp3', import.meta.url),
        bpm: 100,
        patterns: [ResizingShapes, Title]
    }
];