import { Box, Container, HeadingGroup, PageSpinner } from "@tiernebre/kecleon";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChallengeTable } from "../../components";
import { useGetSeason } from "../../hooks";

type SeasonViewParams = {
  id: string;
};

export const SeasonView = (): JSX.Element => {
  const { id } = useParams<SeasonViewParams>();
  const { season, challenges, fetchSeason } = useGetSeason(Number(id));

  useEffect(() => {
    void fetchSeason();
  }, [fetchSeason]);

  const content =
    season && challenges.length ? (
      <>
        <HeadingGroup title={season.name} subtitle={season.description} />
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
