type HomeProps = {
  accessToken?: string;
};

export const Home = ({ accessToken }: HomeProps) => {
  return <p>Welcome Home {accessToken}.</p>;
};
