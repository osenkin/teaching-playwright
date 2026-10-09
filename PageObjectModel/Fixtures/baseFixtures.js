import { test as base } from "@playwright/test";
import { GaragePage } from "../pages/GaragePage.js";

const envName = process.env.ENV_NAME || "qauto";
const authFile = `playwright/.auth/user-${envName}.json`;

export const test = base.extend({
	userGaragePage: async ({ browser, request }, use) => {
		const context = await browser.newContext({
			storageState: authFile,
			httpCredentials: {
				username: process.env.HTTP_USERNAME ?? "",
				password: process.env.HTTP_PASSWORD ?? "",
				send: "always",
			},
		});

		const page = await context.newPage();

		const garagePage = new GaragePage(page);

		await page.goto("/");
		await garagePage.visit();

		await use(garagePage);

		await page.close();
		await context.close();
	},
});

export { expect } from "@playwright/test";
