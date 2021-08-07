import { Box, Container, HeadingGroup, PageSpinner } from "@tiernebre/kecleon";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChallengeTable } from "../../components";
import { SeasonTable } from "../../components/season";
import { useGetLeague } from "../../hooks/api/leagues/use-get-league";

type LeagueViewParams = {
  id: string;
};

export const LeagueView = (): JSX.Element => {
  const { id } = useParams<LeagueViewParams>();
  const { league, seasons, challenges, fetchLeague } = useGetLeague({
    id: Number(id),
  });

  useEffect(() => {
    void fetchLeague();
  }, [fetchLeague]);

  const content =
    league && seasons.length && challenges.length ? (
      <>
        <HeadingGroup title={league.name} subtitle={league.description} />
        <Box>
          <HeadingGroup title="Seasons" level={4} />
          <SeasonTable seasons={seasons} />
        </Box>
        <Box>
          <HeadingGroup title="Challenges" level={4} />
          <ChallengeTable challenges={challenges} />
        </Box>
      </>
    ) : (
      <PageSpinner />
    );

  return <Container as="section">{content}</Container>;
};
