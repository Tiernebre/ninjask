import { Container, HeadingGroup } from "@tiernebre/kecleon";
import { useEffect } from "react";
import { LeagueTable } from "../../components";
import { useGetLeagues } from "../../hooks/api/leagues/use-get-leagues";

export const LeaguesView = (): JSX.Element => {
  const { leagues, fetchLeagues } = useGetLeagues();

  useEffect(() => {
    void fetchLeagues();
  }, [fetchLeagues]);

  return (
    <Container as="section">
      <HeadingGroup title="Leagues" />
      <LeagueTable leagues={leagues} />
    </Container>
  );
};
