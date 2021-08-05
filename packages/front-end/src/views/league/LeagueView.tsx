import { Container, HeadingGroup, PageSpinner } from "@tiernebre/kecleon";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetLeague } from "../../hooks/api/leagues/use-get-league";

type LeagueViewParams = {
  id: string;
};

export const LeagueView = (): JSX.Element => {
  const { id } = useParams<LeagueViewParams>();
  const { league, seasons, fetchLeague } = useGetLeague({ id: Number(id) });

  useEffect(() => {
    void fetchLeague();
  }, [fetchLeague]);

  const content =
    league && seasons.length ? (
      <>
        <HeadingGroup title={league.name} subtitle={league.description} />
      </>
    ) : (
      <PageSpinner />
    );

  return <Container as="section">{content}</Container>;
};
