import { Button, Container } from '@mantine/core';

const Navigation = () => {
  return (
    <div data-component="navigation" className="bg-orange-600 py-4">
      <Container className="flex justify-between items-center gap-4">
        <div>Logo</div>
        <nav className="flex items-center gap-4 text-white1xxxxxxx">
          <a href="#" className="href">
            Home
          </a>
          <a href="#">About</a>
          <a href="#">Mint</a>
          <a href="#">Leaderboard</a>
          <a href="#">Tiny Profile</a>
        </nav>
        <div>
          <Button size="md" variant="white" color="orange">
            Connect
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Navigation;
