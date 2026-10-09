import { test as setup, expect } from "@playwright/test";
import { LoginForm } from "../PageObjectModel/forms/LoginForm.js";
import path from "path";

const authFile = path.resolve(process.cwd(), "playwright/.auth/user.json");
setup("authenticate user", async ({ page }) => {
	await page.goto("/");
	const loginForm = new LoginForm(page);
	await loginForm.openLoginForm();
	await loginForm.login("yeeeahc@gmail.com", "Test1234");
	await page.waitForURL(/\/panel\/garage/, {
		waitUntil: "commit",
		timeout: 20000,
	});
	await expect(page.locator("h1")).toHaveText("Garage", { timeout: 10000 });
	await page.context().storageState({ path: authFile });
});
