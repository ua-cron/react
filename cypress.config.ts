import { defineConfig } from "cypress";

export default defineConfig({
  fileServerFolder: './',
  component: {
    numTestsKeptInMemory: 0,
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'e2e-results/test-result-[hash].xml',
      includePending: true,
      attachments: true,
      outputs: true
    }
  }
});
