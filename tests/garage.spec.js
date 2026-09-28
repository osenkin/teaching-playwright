import { test, expect } from "../PageObjectModel/Fixtures/baseFixtures.js";

test.describe("Garage Page test", () => {
	test("should open garage page successfully with pre-login state", async ({
		userGaragePage,
	}) => {
		await expect(userGaragePage.page).toHaveURL(/\/panel\/garage/);
	});
});
