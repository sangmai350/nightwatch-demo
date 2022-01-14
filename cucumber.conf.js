const fs = require("fs");

const reporter = require("cucumber-html-reporter");

const {
  setDefaultTimeout,
  AfterAll,
  BeforeAll,
  After,
} = require("@cucumber/cucumber");
const {
  createSession,
  closeSession,
  startWebDriver,
  stopWebDriver,
  getNewScreenshots,
} = require("nightwatch-api");

setDefaultTimeout(60 * 1000);

BeforeAll(async () => {
  await startWebDriver();
  await createSession();
});

AfterAll(async () => {
  await closeSession();
  await stopWebDriver();

  function waitReportJSON(retry) {
    if (retry-- > 0) {
      try {
        const data = fs.readFileSync("report/cucumber_report.json", "utf8");

        const features = JSON.parse(data);
        console.info("\ngenerating report (%d features)...", features.length);

        reporter.generate({
          theme: "bootstrap",
          jsonFile: "report/cucumber_report.json",
          output: "report/cucumber_report.html",
          reportSuiteAsScenarios: true,
          launchReport: false,
        });
      } catch (err) {
        setTimeout(() => {
          waitReportJSON(retry);
        }, 250);
      }
    } else {
      console.error("\nreport generation has failed.");
    }
  }

  setTimeout(() => {
    waitReportJSON(8);
  }, 0);
});

After(() => {
  getNewScreenshots().forEach((file) =>
    this.attach(fs.readFileSync(file), "image/png")
  );
});
