import { Dockest } from "dockest";

const dockest = new Dockest({
  composeFile: "docker-compose-int.yml",
});

const dockestServices = [
  {
    serviceName: "db-integration-test",
  },
];

void dockest.run(dockestServices);
