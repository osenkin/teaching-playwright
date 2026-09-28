import { test as setup } from "@playwright/test";
import { LoginForm } from "../PageObjectModel/forms/LoginForm.js";
import path from "path";

const authFile = path.resolve(process.cwd(), "playwright/.auth/user.json");
setup("authenticate user", async ({ page }) => {
	await page.goto("/");
	const loginForm = new LoginForm(page);
	await loginForm.openLoginForm();
	await loginForm.login("yeeeahc@gmail.com", "Test1234");
	await page.waitForURL(/\/panel\/garage/);
	await page.waitForLoadState("networkidle");
	await page.context().storageState({ path: authFile });
});
