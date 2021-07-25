import { Container, HeadingGroup, Level } from "@tiernebre/kecleon";
import { ChallengeForm } from "./components/forms/ChallengeForm";

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
      <ChallengeForm />
    </Container>
  );
};
