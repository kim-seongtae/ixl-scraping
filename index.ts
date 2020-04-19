import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

class Scrap {
	constructor(private url: string) {}
	private page: puppeteer.Page | undefined;
	private browser: puppeteer.Browser | undefined;

	openBrowser = async () => {
		this.browser = await puppeteer.launch({
			headless: false,
			devtools: true,
			defaultViewport: null,
		});
	};
	scrap = async () => {
		this.page = await this.browser!.newPage();
		await this.page.setRequestInterception(true);
		await this.page.on('request', (interceptedRequest) => {
			const requestUrl = interceptedRequest.url();
			if (requestUrl.includes('site-nav-css-min.css')) {
				interceptedRequest.abort();
			} else {
				interceptedRequest.continue();
			}
		});
		await this.page.setViewport({ width: 350, height: 500 });
		await this.page.goto(this.url);
		await this.page!.evaluate(`(async () => {
			const observer = new MutationObserver(async (mutations, observer) => {
				document.querySelector('.ixl-modal-mask').remove();
				document.querySelector('.example-question-toggle').remove();
				Array.from(document.querySelectorAll('div')).filter(el => el.id.includes('practice-audio-button-js')).map(el => el.remove());
				Array.from(document.querySelectorAll('div')).filter(el => el.className.includes('yui3-widget-ft')).map(el => el.remove());
				
				if (document.querySelector('.yui3-questionwidget')) {
					if (document.querySelectorAll('.yui3-questionwidget .secContentPiece').length === 3){
						const title = document.querySelector('.yui3-questionwidget .secContentPiece').innerText.toLowerCase().replace(/\\s+/g, '_').replace(/\\?/g,'');
						const fileTitle = document.querySelectorAll('.secContentPiece')[2].innerText.toLowerCase().replace(/(\\r\\n|\\n|\\r)/gm, '_').replace(/\\s+/g, '_');
						
						sessionStorage.setItem('title', title);
						sessionStorage.setItem('fileTitle', fileTitle);
						
						document.querySelector('.yui3-questionwidget .secContentPiece').remove();
						const element = document.querySelector('#practice');
						document.body.innerHTML = '';
						document.body.appendChild(element);
					}
				}
			});
			const targetNode = document.querySelector('#practice');
			observer.observe(targetNode, { attributes: true, childList: true, subtree: true });
		})()`);
		await sleep(3000);
		const fileTitle = await this.page!.evaluate(() => sessionStorage.getItem('fileTitle'));

		const path = await this.getPath();

		if (!fs.existsSync(`.${path}`)) {
			fs.mkdirSync(`.${path}`, { recursive: true });
		}

		await this.page!.screenshot({
			path: `./${path}/${fileTitle}.png`,
		});
		await this.page.close();
	};

	async getPath() {
		return await this.page!.evaluate(() => window.location.pathname);
	}
}

(async function () {
	const urls = [
		'https://www.ixl.com/ela/grade-2/choose-the-r-control-word-that-matches-the-picture',
		'https://www.ixl.com/ela/grade-1/choose-the-short-a-word-that-matches-the-picture',
		'https://www.ixl.com/ela/grade-1/choose-the-short-a-sentence-that-matches-the-picture',
	];

	for (const url of urls) {
		const scrap = new Scrap(url);
		await scrap.openBrowser();
		for (let i = 0; i < 20; i++) {
			await scrap.scrap();
		}
	}
})();


async function sleep(timeout: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, timeout);
	});
}
