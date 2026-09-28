import { BasePage } from "./BasePage";

export class GaragePage extends BasePage {
	constructor(page) {
		super(page, "/panel/garage");
	}
	get addCarButton() {
		return this.page.locator('button:has-text("Add Car")');
	}
}
