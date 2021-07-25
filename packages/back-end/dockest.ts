import { Dockest } from "dockest";

const onlyRunIntegrationTests = process.argv[2] === "--onlyRunIntegrationTests";

const jestOpts = onlyRunIntegrationTests
  ? {
      testMatch: ["**/?(*.int.)+(spec|test).[jt]s?(x)"],
      watch: true,
    }
  : undefined;

const dockest = new Dockest({
  composeFile: "docker-compose-int.yml",
  jestOpts,
});

const dockestServices = [
  {
    serviceName: "db-integration-test",
  },
];

void dockest.run(dockestServices);
