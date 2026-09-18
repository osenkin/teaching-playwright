export class BasePage {
	constructor(page, url = "/") {
		this.page = page;
		this.url = url;
	}

	async visit() {
		await this.page.goto(this.url);
	}
	async reload() {
		await this.page.reload();
	}
	async goBack() {
		await this.page.goBack();
	}
	async goForward() {
		await this.page.goForward();
	}
}
