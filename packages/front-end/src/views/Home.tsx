type HomeProps = {
  accessToken: string;
};

export const Home = ({ accessToken }: HomeProps) => (
  <p>Welcome {accessToken}</p>
);
