import { test, expect } from "@playwright/test";

test.use({ storageState: "playwright/.auth/user.json" });
test.describe("API test cars", () => {
	let carId;
	test("Positeve test for creating a car", async ({ request }) => {
		const response = await request.post("/api/cars", {
			data: {
				carBrandId: 1,
				carModelId: 1,
				mileage: 122,
			},
		});
		expect([200, 201]).toContain(response.status());
		const responseBody = await response.json();
		expect(responseBody.status).toBe("ok");

		carId = responseBody.data.id;
		expect(carId).toBeDefined();

		const updateResponse = await request.put(`/api/cars/${carId}`, {
			data: {
				carBrandId: 1,
				carModelId: 1,
				mileage: 5000,
			},
		});
		expect(updateResponse.status()).toBe(200);
		const updateResponseBody = await updateResponse.json();
		expect(updateResponseBody.data.mileage).toBe(5000);

		const deleteResponse = await request.delete(`/api/cars/${carId}`);
		expect(deleteResponse.status()).toBe(200);

		const deleteResponseBody = await deleteResponse.json();
		expect(deleteResponseBody.status).toBe("ok");
	});
	test("1. Negative test for creating a car with invalid data", async ({
		request,
	}) => {
		const response = await request.post("/api/cars", {
			data: {
				carBrandId: 9999,
				carModelId: 9999,
				mileage: 199,
			},
		});
		expect(response.status()).toBe(404);
		const responseBody = await response.json();
		expect(responseBody.status).toBe("error");
	});
	test("2. Negative test for creating a car with missing data", async ({
		request,
	}) => {
		const response = await request.post("/api/cars", {
			data: {},
		});
		expect(response.status()).toBe(400);
		const body = await response.json();
		expect(body.status).toBe("error");
		expect(body.message).toContain("Car brand id is required");
	});
});
