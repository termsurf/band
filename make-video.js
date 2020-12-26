
const { launch, getStream } = require('puppeteer-stream')

const fs = require("fs");

const file = fs.createWriteStream(`${__dirname}/docs/song1.webm`)

const wait = (ms) => new Promise((res, rej) => setTimeout(res, ms))

async function start() {
	const browser = await launch({
    defaultViewport: null,
    args: [`--window-size=${1280},${640}`]
  })

	const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 640,
  })
	await page.goto('http://localhost:3000')
	const stream = await getStream(page, { audio: true, video: true })
	console.log("recording")

	stream.pipe(file)
	setTimeout(async () => {
		await stream.destroy()
		file.close()
		console.log("finished")
    await browser.close()
	}, 1000 * 300)
}

start();
// ffmpeg -fflags +genpts -i song1.webm -r 24 song1.mp4
