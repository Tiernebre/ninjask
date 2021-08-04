import { Container } from "@tiernebre/kecleon";
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
      <LeagueTable leagues={leagues} />
    </Container>
  );
};
