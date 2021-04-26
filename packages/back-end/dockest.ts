import { Dockest } from "dockest";

const dockest = new Dockest({
  composeFile: 'docker-compose-int'
});

const dockestServices = [
  {
    serviceName: "db",
  },
];

void dockest.run(dockestServices);
