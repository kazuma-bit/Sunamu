import { ArtData, Metadata, Position, Update } from "../../types";
import { save as saveLyrics } from "../integrations/lyricsOffline";

interface DemoTrack {
	title: string;
	artist: string;
	artists: string[];
	album: string;
	length: number;
	id: string;
	palette: {
		Vibrant: string;
		Muted: string;
		DarkVibrant: string;
		DarkMuted: string;
		LightVibrant: string;
		LightMuted: string;
	};
	lyrics: {
		provider: string;
		synchronized: boolean;
		copyright: string;
		lines: Array<{
			text: string;
			time?: number;
			karaoke?: Array<{ text: string; start: number }>;
		}>;
	};
}

const DEMO_TRACKS: DemoTrack[] = [
	{
		title: "Never Gonna Give You Up",
		artist: "Rick Astley",
		artists: ["Rick Astley"],
		album: "Whenever You Need Somebody",
		length: 213,
		id: "spotify:track:4cOdK2wGLETKBW3PvgPWqT",
		palette: {
			Vibrant: "#b33939",
			Muted: "#596275",
			DarkVibrant: "#78281f",
			DarkMuted: "#2c3e50",
			LightVibrant: "#e17055",
			LightMuted: "#a4b0be"
		},
		lyrics: {
			provider: "Musixmatch",
			synchronized: true,
			copyright: "Sony/ATV Music Publishing LLC",
			lines: [
				{ text: "We're no strangers to love", time: 18.5, karaoke: [{ text: "We're ", start: 18.5 }, { text: "no ", start: 19.0 }, { text: "strangers ", start: 19.5 }, { text: "to ", start: 20.2 }, { text: "love", start: 20.8 }] },
				{ text: "You know the rules and so do I", time: 22.8, karaoke: [{ text: "You ", start: 22.8 }, { text: "know ", start: 23.2 }, { text: "the ", start: 23.6 }, { text: "rules ", start: 24.0 }, { text: "and ", start: 24.6 }, { text: "so ", start: 25.0 }, { text: "do ", start: 25.4 }, { text: "I", start: 25.8 }] },
				{ text: "A full commitment's what I'm thinkin' of", time: 27.0, karaoke: [{ text: "A ", start: 27.0 }, { text: "full ", start: 27.4 }, { text: "commitment's ", start: 27.9 }, { text: "what ", start: 28.5 }, { text: "I'm ", start: 28.9 }, { text: "thinkin' ", start: 29.3 }, { text: "of", start: 29.8 }] },
				{ text: "You wouldn't get this from any other guy", time: 31.2, karaoke: [{ text: "You ", start: 31.2 }, { text: "wouldn't ", start: 31.7 }, { text: "get ", start: 32.2 }, { text: "this ", start: 32.6 }, { text: "from ", start: 33.1 }, { text: "any ", start: 33.6 }, { text: "other ", start: 34.0 }, { text: "guy", start: 34.6 }] },
				{ text: "I just wanna tell you how I'm feeling", time: 35.5, karaoke: [{ text: "I ", start: 35.5 }, { text: "just ", start: 35.9 }, { text: "wanna ", start: 36.3 }, { text: "tell ", start: 36.8 }, { text: "you ", start: 37.2 }, { text: "how ", start: 37.6 }, { text: "I'm ", start: 38.0 }, { text: "feeling", start: 38.4 }] },
				{ text: "Gotta make you understand", time: 40.0, karaoke: [{ text: "Gotta ", start: 40.0 }, { text: "make ", start: 40.5 }, { text: "you ", start: 41.0 }, { text: "understand", start: 41.5 }] },
				{ text: "Never gonna give you up", time: 43.2, karaoke: [{ text: "Never ", start: 43.2 }, { text: "gonna ", start: 43.7 }, { text: "give ", start: 44.2 }, { text: "you ", start: 44.7 }, { text: "up", start: 45.1 }] },
				{ text: "Never gonna let you down", time: 47.4, karaoke: [{ text: "Never ", start: 47.4 }, { text: "gonna ", start: 47.9 }, { text: "let ", start: 48.4 }, { text: "you ", start: 48.9 }, { text: "down", start: 49.3 }] },
				{ text: "Never gonna run around and desert you", time: 51.6, karaoke: [{ text: "Never ", start: 51.6 }, { text: "gonna ", start: 52.1 }, { text: "run ", start: 52.6 }, { text: "around ", start: 53.1 }, { text: "and ", start: 53.6 }, { text: "desert ", start: 54.1 }, { text: "you", start: 54.7 }] },
				{ text: "Never gonna make you cry", time: 56.0, karaoke: [{ text: "Never ", start: 56.0 }, { text: "gonna ", start: 56.5 }, { text: "make ", start: 57.0 }, { text: "you ", start: 57.5 }, { text: "cry", start: 58.0 }] },
				{ text: "Never gonna say goodbye", time: 60.2, karaoke: [{ text: "Never ", start: 60.2 }, { text: "gonna ", start: 60.7 }, { text: "say ", start: 61.2 }, { text: "goodbye", start: 61.8 }] },
				{ text: "Never gonna tell a lie and hurt you", time: 64.5, karaoke: [{ text: "Never ", start: 64.5 }, { text: "gonna ", start: 65.0 }, { text: "tell ", start: 65.5 }, { text: "a ", start: 66.0 }, { text: "lie ", start: 66.5 }, { text: "and ", start: 67.0 }, { text: "hurt ", start: 67.5 }, { text: "you", start: 68.0 }] },
			]
		}
	},
	{
		title: "Racing into the Night",
		artist: "YOASOBI",
		artists: ["YOASOBI"],
		album: "THE BOOK",
		length: 261,
		id: "spotify:track:6WrI0LAC5M1Rw2MnX2ZvEg",
		palette: {
			Vibrant: "#6c5ce7",
			Muted: "#a29bfe",
			DarkVibrant: "#2d3436",
			DarkMuted: "#1e272e",
			LightVibrant: "#fd79a8",
			LightMuted: "#dfe6e9"
		},
		lyrics: {
			provider: "NetEase",
			synchronized: true,
			copyright: "Sony Music Entertainment Japan",
			lines: [
				{ text: "沈むように溶けてゆくように", time: 1.0 },
				{ text: "二人だけの空が広がる夜に", time: 6.2 },
				{ text: "「さよなら」だけだった", time: 11.5 },
				{ text: "その一言で全てが分かった", time: 13.8 },
				{ text: "日が沈み出した空と君の姿", time: 17.5 },
				{ text: "フェンス越しに重なっていた", time: 22.0 },
				{ text: "初めて会った日から", time: 28.0 },
				{ text: "僕の心の全てを奪った", time: 31.5 },
				{ text: "どこか儚い空気を纏う君は", time: 36.2 },
				{ text: "寂しい目をしてたんだ", time: 41.5 }
			]
		}
	},
	{
		title: "Get Lucky",
		artist: "Daft Punk feat. Pharrell Williams",
		artists: ["Daft Punk", "Pharrell Williams"],
		album: "Random Access Memories",
		length: 248,
		id: "spotify:track:69kOkLUCkxIZYexIgSG8rq",
		palette: {
			Vibrant: "#e67e22",
			Muted: "#d35400",
			DarkVibrant: "#1a1a1a",
			DarkMuted: "#111111",
			LightVibrant: "#f39c12",
			LightMuted: "#bdc3c7"
		},
		lyrics: {
			provider: "Musixmatch",
			synchronized: true,
			copyright: "Daft Life Ltd.",
			lines: [
				{ text: "Like the legend of the phoenix", time: 16.0 },
				{ text: "All ends with beginnings", time: 20.0 },
				{ text: "What keeps the planet spinning", time: 24.0 },
				{ text: "The force from the beginning", time: 28.0 },
				{ text: "We've come too far to give up who we are", time: 32.5 },
				{ text: "So let's raise the bar and our cups to the stars", time: 40.0 },
				{ text: "She's up all night 'til the sun", time: 48.0 },
				{ text: "I'm up all night to get some", time: 52.0 },
				{ text: "She's up all night for good fun", time: 56.0 },
				{ text: "I'm up all night to get lucky", time: 60.0 }
			]
		}
	}
];

let currentTrackIndex = 0;
let playbackStatus: "Playing" | "Paused" | "Stopped" = "Playing";
let loopStatus: "None" | "Track" | "Playlist" = "None";
let isShuffled = false;
let currentPosition = 18;
let lastPositionTime = Date.now();
let updateCallback: Function | undefined;

function getElapsedSeconds(): number {
	if (playbackStatus === "Playing") {
		const delta = (Date.now() - lastPositionTime) / 1000;
		return Math.min(DEMO_TRACKS[currentTrackIndex].length, currentPosition + delta);
	}
	return currentPosition;
}

function setElapsedSeconds(pos: number) {
	currentPosition = Math.max(0, Math.min(DEMO_TRACKS[currentTrackIndex].length, pos));
	lastPositionTime = Date.now();
}

function seedLyricsCache(track: DemoTrack) {
	const id = `${track.artist}:${track.album}:${track.title}`;
	saveLyrics(id, track.lyrics).catch(() => {});
}

function createArtData(track: DemoTrack): ArtData {
	// 1x1 transparent png buffer placeholder
	const fakePng = Buffer.from(
		"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
		"base64"
	);
	return {
		type: ["image/png"],
		data: fakePng,
		palette: track.palette
	};
}

export async function init(callback: Function): Promise<void> {
	updateCallback = callback;

	// Pre-seed lyrics for demo tracks
	for (const track of DEMO_TRACKS) 
		seedLyricsCache(track);
	

	const update = await getUpdate();
	if (update && updateCallback) 
		updateCallback(update);
	
}

export async function getUpdate(): Promise<Update | null> {
	const track = DEMO_TRACKS[currentTrackIndex];
	const elapsedSeconds = getElapsedSeconds();

	const metadata: Metadata = {
		title: track.title,
		artist: track.artist,
		artists: track.artists,
		album: track.album,
		albumArtist: track.artist,
		albumArtists: track.artists,
		length: track.length,
		id: track.id,
		artData: createArtData(track)
	};

	const update: Update = {
		provider: "WebPlayer",
		metadata,
		capabilities: {
			canControl: true,
			canPlayPause: true,
			canGoNext: true,
			canGoPrevious: true,
			canSeek: true
		},
		status: playbackStatus,
		loop: loopStatus,
		shuffle: isShuffled,
		volume: 1,
		elapsed: {
			howMuch: elapsedSeconds,
			when: new Date()
		},
		app: "webplayer",
		appName: "Sunamu Web Player"
	};

	return update;
}

export async function Play(): Promise<void> {
	if (playbackStatus !== "Playing") {
		playbackStatus = "Playing";
		lastPositionTime = Date.now();
		if (updateCallback) updateCallback(await getUpdate());
	}
}

export async function Pause(): Promise<void> {
	if (playbackStatus === "Playing") {
		currentPosition = getElapsedSeconds();
		playbackStatus = "Paused";
		lastPositionTime = Date.now();
		if (updateCallback) updateCallback(await getUpdate());
	}
}

export async function PlayPause(): Promise<void> {
	if (playbackStatus === "Playing")
		await Pause();
	else
		await Play();
}

export async function Stop(): Promise<void> {
	playbackStatus = "Stopped";
	setElapsedSeconds(0);
	if (updateCallback) updateCallback(await getUpdate());
}

export async function Next(): Promise<void> {
	if (isShuffled)
		currentTrackIndex = Math.floor(Math.random() * DEMO_TRACKS.length);
	else
		currentTrackIndex = (currentTrackIndex + 1) % DEMO_TRACKS.length;

	setElapsedSeconds(0);
	seedLyricsCache(DEMO_TRACKS[currentTrackIndex]);
	if (updateCallback) updateCallback(await getUpdate());
}

export async function Previous(): Promise<void> {
	if (getElapsedSeconds() > 3)
		setElapsedSeconds(0);
	else {
		currentTrackIndex = (currentTrackIndex - 1 + DEMO_TRACKS.length) % DEMO_TRACKS.length;
		setElapsedSeconds(0);
		seedLyricsCache(DEMO_TRACKS[currentTrackIndex]);
	}
	if (updateCallback) updateCallback(await getUpdate());
}

export function Shuffle(): void {
	isShuffled = !isShuffled;
	getUpdate().then(u => u && updateCallback && updateCallback(u));
}

export function Repeat(): void {
	switch (loopStatus) {
		case "None":
			loopStatus = "Track";
			break;
		case "Track":
			loopStatus = "Playlist";
			break;
		case "Playlist":
			loopStatus = "None";
			break;
	}
	getUpdate().then(u => u && updateCallback && updateCallback(u));
}

export async function Seek(offset: number): Promise<void> {
	setElapsedSeconds(getElapsedSeconds() + offset);
	if (updateCallback) updateCallback(await getUpdate());
}

export async function SeekPercentage(percentage: number): Promise<void> {
	const track = DEMO_TRACKS[currentTrackIndex];
	setElapsedSeconds(track.length * percentage);
	if (updateCallback) updateCallback(await getUpdate());
}

export async function SetPosition(position: number): Promise<void> {
	setElapsedSeconds(position);
	if (updateCallback) updateCallback(await getUpdate());
}

export async function GetPosition(): Promise<Position> {
	const pos = getElapsedSeconds();
	const track = DEMO_TRACKS[currentTrackIndex];

	// Auto advance when track reaches end
	if (pos >= track.length && playbackStatus === "Playing") {
		if (loopStatus === "Track")
			setElapsedSeconds(0);
		else
			Next();
	}

	return {
		howMuch: pos,
		when: new Date()
	};
}
