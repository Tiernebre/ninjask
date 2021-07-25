import { Container, HeadingGroup, Level } from "@tiernebre/kecleon";

export const CreateChallengeView = (): JSX.Element => {
  return (
    <Container as="section">
      <Level
        left={
          <div>
            <HeadingGroup title="Create Challenge" />
          </div>
        }
      />
    </Container>
  );
};
