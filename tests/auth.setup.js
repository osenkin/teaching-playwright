import { test as setup, expect } from "@playwright/test";
import { LoginForm } from "../PageObjectModel/forms/LoginForm.js";
import path from "path";

const authFile = path.resolve(process.cwd(), "playwright/.auth/user.json");

setup("authenticate user", async ({ page }) => {
	await page.goto("/");

	const loginForm = new LoginForm(page);
	await loginForm.openLoginForm();
	const currentEnv = process.env.ENV || "qauto";
	const dynamicEmail = `yeeeahc+${currentEnv}@gmail.com`;

	console.log(`LOG: Logging in on ${currentEnv} using email: ${dynamicEmail}`);

	await loginForm.login(dynamicEmail, "Test1234");

	await expect(page.locator("h1")).toHaveText("Garage", { timeout: 15000 });

	await page.waitForTimeout(1000);
	await page.context().storageState({ path: authFile });
});
