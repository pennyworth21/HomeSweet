const { Builder, By, until } = require("selenium-webdriver");

describe("Selenium Tests", () => {
  test("Example Selenium Test", async () => {
    let driver = await new Builder().forBrowser("chrome").build();
    try {
      await driver.manage().window().maximize();
      await driver.get("http://localhost:3000");
      let title = await driver.getTitle();
      console.log("Page Title:", title);

      let button = await driver.findElement(By.id("button-id"));
      await button.click();

      await driver.wait(until.titleIs("New Page Title"), 10000);
    } catch (error) {
      console.error("Error occurred during test:", error);
    } finally {
      await driver.quit();
    }
  });
});
