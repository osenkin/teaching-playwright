import { BaseForm } from "./BaseForm";

export class LoginForm extends BaseForm {
	constructor(page) {
		super(page);

		this.signINButton = page.locator("button.header_signin");
		this.emailInput = page.locator("#signinEmail");
		this.passwordInput = page.locator("#signinPassword");
		this.loginButton = page.locator(".modal-content button.btn-primary", {
			hasText: "Login",
		});
	}
	async openLoginForm() {
		await this.signINButton.click();
	}
	async login(user, pass) {
		await this.emailInput.fill(user, { dalay: 100 });
		await this.passwordInput.fill(pass, { delay: 100 });
		await this.loginButton.click();
	}
}
