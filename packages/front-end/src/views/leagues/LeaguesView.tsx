import { Container, HeadingGroup, PageSpinner } from "@tiernebre/kecleon";
import { useEffect } from "react";
import { LeagueTable } from "../../components";
import { useGetLeagues } from "../../hooks/api/leagues/use-get-leagues";

export const LeaguesView = (): JSX.Element => {
  const { leagues, fetchLeagues } = useGetLeagues();

  useEffect(() => {
    void fetchLeagues();
  }, [fetchLeagues]);

  const content = leagues.length ? (
    <LeagueTable leagues={leagues} />
  ) : (
    <PageSpinner />
  );

  return (
    <Container as="section">
      <HeadingGroup title="Leagues" />
      {content}
    </Container>
  );
};
