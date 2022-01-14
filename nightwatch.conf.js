const chromedriver = require("chromedriver");

module.exports = {
  src_folders: ["tests"],
  //   detailed_output: true,
  //   page_objects_path: ["pages"],
  // custom_commands_path: [ 'commands' ],

  test_settings: {
    use_xpath: true,
    default: {
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: false,
        path: "screenshots",
      },
      webdriver: {
        start_process: true,
        server_path: chromedriver.path,
        port: 9517,
        cli_args: ["--port=9517"],
      },
      desiredCapabilities: {
        browserName: "chrome",
      },
    },
  },
};
