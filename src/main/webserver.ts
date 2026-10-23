import { createReadStream } from "fs";
import { stat } from "fs/promises";
import path from "path";
import mime from "mime";
import getPlayer, { Player } from "./player";
import { get as getConfig, getAll as getAllConfig } from "./config";
import { widgetMode, debugMode, useElectron } from "./appStatus";
import { getAppData } from "./util";

import { Server, Socket } from "socket.io";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { addLyricsUpdateCallback, addSongDataCallback, songdata, addPositionCallback } from "./playbackStatus";
import { getThemeLocation, getThemesDirectory } from "./themes";

let player: Player;

const wwwDir = path.resolve(__dirname, "..", "www");
const themesDir = getThemesDirectory();

async function handleStaticRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
	try {
		let urlPath = (req.url || "/").split("?")[0];
		let basePath = wwwDir;

		if (urlPath.startsWith("/themes/")) {
			urlPath = urlPath.slice("/themes".length);
			basePath = themesDir;
		}

		let filePath = path.normalize(path.join(basePath, urlPath));
		if (!filePath.startsWith(basePath)) {
			res.statusCode = 403;
			res.end("Forbidden");
			return;
		}

		let stats = await stat(filePath).catch(() => null);
		if (stats?.isDirectory()) {
			filePath = path.join(filePath, "index.htm");
			stats = await stat(filePath).catch(() => null);
		}

		if (!stats || !stats.isFile()) {
			res.statusCode = 404;
			res.end("Not Found");
			return;
		}

		const mimeType = mime.getType(filePath) || "application/octet-stream";
		res.setHeader("Content-Type", mimeType);
		res.setHeader("Content-Length", stats.size);
		res.setHeader("Cache-Control", "no-cache");

		if (req.method === "HEAD") {
			res.statusCode = 200;
			res.end();
			return;
		}

		const stream = createReadStream(filePath);
		stream.on("error", () => {
			if (!res.headersSent) {
				res.statusCode = 500;
				res.end("Server Error");
			}
		});
		stream.pipe(res);
	} catch (_) {
		if (!res.headersSent) {
			res.statusCode = 500;
			res.end("Server Error");
		}
	}
}

const server = createServer(handleStaticRequest);

export const io = new Server(server);

function registerSocketIO(socket: Socket) {

	socket.on("previous", () => player.Previous());
	socket.on("playPause", () => player.PlayPause());
	socket.on("next", () => player.Next());

	socket.on("shuffle", () => player.Shuffle());
	socket.on("repeat", () => player.Repeat());

	socket.on("seek", (perc) => player.SeekPercentage(perc));
	socket.on("getPosition", async (callback) => callback(await player.GetPosition()));
	socket.on("setPosition", (position) => player.SetPosition(position));

	socket.on("getSongData", (callback) => callback(songdata));
	socket.on("getConfig", (callback) => callback(getAllConfig()));

	socket.on("shouldBullyGlasscordUser", async (callback) => {
		let bullyGlasscordUser = false;
		const gcPath = path.resolve(getAppData(), "glasscord");

		try {
			await stat(gcPath);
			bullyGlasscordUser = true;
			await stat(path.resolve(gcPath, "DONTBULLYME"));
			bullyGlasscordUser = false;
		} catch (_) {
			//...
		}

		callback(bullyGlasscordUser);
	});

	socket.on("isWidgetMode", (callback) => callback(widgetMode));
	socket.on("isDebugMode", (callback) => callback(debugMode));
	socket.on("isElectronRunning", (callback) => callback(useElectron));

	socket.on("getThemeLocationFor", async (theme, callback) => {
		const themeLocation = await getThemeLocation(theme);
		if(!themeLocation)
			return callback();

		callback("/themes/" + path.relative(getThemesDirectory(), themeLocation).split("\\").join("/"));
	});

	addPositionCallback(async (position, reportsPosition) => { socket.emit("position", position, reportsPosition); });
	addSongDataCallback(async (songdata, metadataChanged) => { socket.emit("update", songdata, metadataChanged); });
	addLyricsUpdateCallback(async () => { socket.emit("refreshLyrics"); });
}

export default async function webserverMain(){
	player = await getPlayer();

	const port = Number(getConfig("webserverPort")) || 3000;
	server.listen(port, "0.0.0.0", () => console.log(`Sunamu WebServer listening on 0.0.0.0:${port}`));

	io.on("connection", socket => {
		registerSocketIO(socket);
	});
}
