import { Container } from "@tiernebre/kecleon";
import { LeagueTable } from "../../components";

export const LeaguesView = (): JSX.Element => {
  return (
    <Container as="section">
      <LeagueTable leagues={[]} />
    </Container>
  );
};
