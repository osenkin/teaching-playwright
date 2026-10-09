import { test as base } from "@playwright/test";
import { GaragePage } from "../pages/GaragePage.js";

const envName = process.env.ENV_NAME || "qauto";
const authFile = `playwright/.auth/user-${envName}.json`;

export const test = base.extend({
	userGaragePage: async ({ browser, request }, use) => {
		const credentials =
			request._requestContext?._config?.projects?.[0]?.use?.httpCredentials ||
			request._requestContext?._config?.use?.httpCredentials;

		const context = await browser.newContext({
			storageState: authFile,
			httpCredentials: credentials,
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
