import { Dockest } from "dockest";

const dockest = new Dockest({
  composeFile: 'docker-compose-int.yml'
});

const dockestServices = [
  {
    serviceName: "db",
  },
];

void dockest.run(dockestServices);
