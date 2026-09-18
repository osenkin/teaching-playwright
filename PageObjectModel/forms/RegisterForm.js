import { BaseForm } from "./BaseForm";

export class RegisterForm extends BaseForm {
	constructor(page) {
		super(page);

		this.signUpLink = page.locator(".modal-footer .btn-link");
		this.nameInput = page.locator("#signupName");
		this.lastNameInput = page.locator("#signupLastName");
		this.emailInput = page.locator("#signupEmail");
		this.passwordInput = page.locator("#signupPassword");
		this.rePasswordInput = page.locator("#signupRepeatPassword");

		this.registerButton = page.getByRole("button", { name: "Register" });

		this.errorMessage = (text) =>
			page.locator(".invalid-feedback", { hasText: text });
		this.textError = (text) => page.locator(`text=${text}`);
	}
	async openRegisterForm() {
		await this.signUpLink.click();
	}
	async fillForm(data) {
		if (data.name) await this.nameInput.fill(data.name.trim());
		if (data.lastName) await this.lastNameInput.fill(data.lastName.trim());
		if (data.email) await this.emailInput.fill(data.email);
		if (data.password) await this.passwordInput.fill(data.password);
		if (data.repeatPassword)
			await this.rePasswordInput.fill(data.repeatPassword);
	}
	async triggerBlurOnAllField() {
		await this.nameInput.dispatchEvent("blur");
		await this.lastNameInput.dispatchEvent("blur");
		await this.emailInput.dispatchEvent("blur");
		await this.passwordInput.dispatchEvent("blur");
		await this.rePasswordInput.dispatchEvent("blur");
	}
}
