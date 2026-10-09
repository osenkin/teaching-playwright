import { test, expect } from "@playwright/test";

test.use({ storageState: "playwright/.auth/user.json" });
test.describe("Mocking API Response", () => {
	test('Підміна данних профілю з "lakki world" на кастомні', async ({
		page,
	}) => {
		const mockedProfileBody = {
			status: "ok",
			data: {
				userId: 12345,
				photoFilename: null,
				name: "vas",
				lastName: "das",
			},
		};

		await page.route("**/api/users/profile", async (route) => {
			await route.fulfill({
				status: 200,
				contentType: "application/json",
				body: JSON.stringify(mockedProfileBody),
			});
		});

		await page.goto("/panel/profile");

		await expect(page.getByText(/vas/)).toBeVisible();
	});
});
