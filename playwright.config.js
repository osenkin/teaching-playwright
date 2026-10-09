// @ts-check
import { defineConfig, devices } from "@playwright/test";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// 1. Правильний аналог __dirname для ES-модулів (виправляє ReferenceError)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Визначаємо назву середовища (пріоритет у системної змінної з GitHub Actions)
const envName = process.env.ENV_NAME || process.env.ENV || "qauto";

// 3. Завантажуємо файли .env ТІЛЬКИ локально.
// В GitHub Actions (де process.env.CI є істинним) цей блок повністю ігнорується,
// завдяки чому секрети GitHub Actions не будуть перезаписані порожніми файлами!
if (!process.env.CI) {
	dotenv.config({ path: path.resolve(__dirname, `.env.${envName}`) });
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
	testDir: "./tests",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 0 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: "html",
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		storageState: `playwright/.auth/user-${envName}.json`,
		/* Base URL to use in actions like `await page.goto('')`. */
		baseURL: process.env.BASE_URL ?? "",
		httpCredentials: {
			username: process.env.HTTP_USERNAME ?? "",
			password: process.env.HTTP_PASSWORD ?? "",
			send: "always",
		},

		ignoreHTTPSErrors: true,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
		screenshot: "only-on-failure",
		video: "retain-on-failure",
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "setup",
			testMatch: /auth\.(setup|spec)\.js/,
			use: {
				storageState: { cookies: [], origins: [] },
			},
		},
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
			},
			dependencies: ["setup"],
		},

		// {
		// 	name: "firefox",
		// 	use: { ...devices["Desktop Firefox"] },
		// },

		//{
		//	name: "webkit",
		//	use: { ...devices["Desktop Safari"] },
		//},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://localhost:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
});
