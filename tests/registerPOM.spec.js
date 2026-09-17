import { test, expect } from "@playwright/test";
import { BasePage } from "../PageObjectModel/pages/BasePage";
import { LoginForm } from "../PageObjectModel/forms/LoginForm";
import { RegisterForm } from "../PageObjectModel/forms/RegisterForm";

test.describe("Test form registration", () => {
	let basePage;
	let loginForm;
	let registerForm;

	const getUnicEmail = () => `test.user+${Date.now()}@gmail.com`;

	test.beforeEach(async ({ page }) => {
		basePage = new BasePage(page, "/");
		loginForm = new LoginForm(page);
		registerForm = new RegisterForm(page);

		await basePage.visit();
		await loginForm.openLoginForm();
		await registerForm.openRegisterForm();
	});
	test("Positive test from valid data", async () => {
		await registerForm.fillForm({
			name: " John ",
			lastName: " Travolta ",
			email: getUnicEmail(),
			password: "Test1234",
			repeatPassword: "Test1234",
		});
		await expect(registerForm.registerButton).toBeEnabled();
		await registerForm.registerButton.click();
	});
	test("Negative 1 : Validation empty mandatory row", async () => {
		await registerForm.triggerBlurOnAllField();

		await expect(registerForm.errorMessage(/Name required/)).toBeVisible();
		await expect(registerForm.errorMessage(/Last name required/)).toBeVisible();
		await expect(registerForm.errorMessage(/Email required/)).toBeVisible();
		await expect(registerForm.errorMessage(/Password required/)).toBeVisible();
		await expect(
			registerForm.errorMessage(/Re-enter password required/),
		).toBeVisible();

		await expect(registerForm.registerButton).toBeDisabled();
	});

	test("Negative 2: Incorect wrong name", async () => {
		await registerForm.nameInput.fill("A");
		await registerForm.nameInput.blur();

		await expect(
			registerForm.textError("Name has to be from 2 to 20 characters long "),
		).toBeVisible();
		await expect(registerForm.registerButton).toBeDisabled();
	});

	test("Negative 3 : Incorect format email", async () => {
		await registerForm.emailInput.fill("invalid-email-format");
		await registerForm.emailInput.blur();

		await expect(registerForm.textError("Email is incorrect")).toBeVisible();
		await expect(registerForm.registerButton).toBeDisabled();
	});

	test("Nagetive 4: password don`t answer  requirments", async () => {
		await registerForm.passwordInput.fill("fullpass");
		await registerForm.passwordInput.blur();

		const pwErrorText =
			"Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";
		await expect(registerForm.errorMessage(pwErrorText)).toBeVisible();
		await expect(registerForm.registerButton).toBeDisabled();
	});

	test("Negative 5: Passwrods in row password and Re-enter password do not match", async () => {
		await registerForm.fillForm({
			name: " John ",
			lastName: " Travolta",
			email: getUnicEmail(),
			password: "Test1234",
			repeatPassword: "Vohoo12345",
		});
		await registerForm.passwordInput.click();
		await expect(
			registerForm.textError("Passwords do not match"),
		).toBeVisible();
		await expect(registerForm.registerButton).toBeDisabled();
	});
});
