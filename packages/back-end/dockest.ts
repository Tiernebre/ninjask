import { Dockest } from "dockest";

const dockest = new Dockest({});

const dockestServices = [
  {
    serviceName: "db",
  },
];

void dockest.run(dockestServices);
