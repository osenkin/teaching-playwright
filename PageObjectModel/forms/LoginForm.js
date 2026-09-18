import { BaseForm } from "./BaseForm";

export class LoginForm extends BaseForm {
	constructor(page) {
		super(page);

		this.signINButton = page.locator("button.header_signin");
		this.emailInput = page.locator("#signinEmail");
		this.passwordInput = page.locator("#signinPassword");
		this.loginButton = page.locator(".modal-footer .btn-primary");
	}
	async openLoginForm() {
		await this.signINButton.click();
	}
	async login() {
		await this.emailInput.fill(user);
		await this.passwordInput.fill(pass);
		await this.loginButton.click();
	}
}
