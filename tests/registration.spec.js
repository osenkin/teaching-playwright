import { test, expect } from "@playwright/test";
import { findSourceMap } from "node:module";

test.describe("Test form registration", () => {
	const getUniqEmail = () => `test.user+${Date.now()}@gmail.com`;

	test.beforeEach(async ({ page }) => {
		await page.goto("/");

		await page.locator("button.header_signin").click();
		await page.locator(".modal-footer .btn-link").click();
	});

	test("Positive test from valid data", async ({ page }) => {
		const firstName = " John ";
		const lastName = " Travolta ";
		await page.locator("#signupName").fill(firstName.trim());
		await page.locator("#signupLastName").fill(lastName.trim());
		await page.locator("#signupEmail").fill(getUniqEmail());
		await page.locator("#signupPassword").fill("Test1234");
		await page.locator("#signupRepeatPassword").fill("Test1234");

		const registerButton = page.getByRole("button", { name: "Register" });
		await expect(registerButton).toBeEnabled();
		await registerButton.click();
	});

	test("Negative 1: Validation empty mandatory row", async ({ page }) => {
		await page.locator("#signupName").dispatchEvent("blur");
		await page.locator("#signupLastName").dispatchEvent("blur");
		await page.locator("#signupEmail").dispatchEvent("blur");
		await page.locator("#signupPassword").dispatchEvent("blur");
		await page.locator("#signupRepeatPassword").dispatchEvent("blur");
		await expect(
			page.locator(".invalid-feedback", { hasText: /^Name required$/ }),
		).toBeVisible();
		await expect(
			page.locator(".invalid-feedback", { hasText: /^Last name required$/ }),
		).toBeVisible();
		await expect(
			page.locator(".invalid-feedback", { hasText: /^Email required$/ }),
		).toBeVisible();
		await expect(
			page.locator(".invalid-feedback", { hasText: /^Password required$/ }),
		).toBeVisible();
		await expect(
			page.locator(".invalid-feedback", {
				hasText: /^Re-enter password required$/,
			}),
		).toBeVisible();
		await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
	});

	test("Negative 2: Incorect wrong name", async ({ page }) => {
		await page.locator("#signupName").fill("A");
		await page.locator("#signupName").blur();
		await expect(
			page.locator("text=Name has to be from 2 to 20 characters long"),
		).toBeVisible();
		await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
	});

	test("Negative 3:Incorect format email", async ({ page }) => {
		await page.locator("#signupEmail").fill("invalid-email-format");
		await page.locator("#signupEmail").blur();
		await expect(page.locator("text=Email is incorrect")).toBeVisible();
		await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
	});
	test("Negative 4: password don`t answer requirements", async ({ page }) => {
		await page.locator("#signupPassword").fill("fullpass");
		await page.locator("#signupPassword").blur();
		await expect(
			page.locator(".invalid-feedback", {
				hasText:
					"Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
			}),
		).toBeVisible();
		await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
	});
	test("Negative 5: Passwords in row password and Re-enter password do not match", async ({
		page,
	}) => {
		await page.locator("#signupName").fill("John");
		await page.locator("#signupLastName").fill("Travolta");
		await page.locator("#signupPassword").fill("Test1234");
		await page.locator("#signupRepeatPassword").fill("Vohoo12dasf");
		await page.locator("#signupRepeatPassword").blur();
		await expect(page.locator("text=Passwords do not match")).toBeVisible();
		await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
	});
});
