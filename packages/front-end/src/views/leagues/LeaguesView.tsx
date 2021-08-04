import { Container } from "@tiernebre/kecleon";
import { LeagueTable } from "../../components/league/LeagueTable";

export const LeaguesView = (): JSX.Element => {
  return (
    <Container as="section">
      <LeagueTable />
    </Container>
  );
};
