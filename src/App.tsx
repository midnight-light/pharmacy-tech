import { Header } from './widgets/header';
import { Grid, GridItem } from '@chakra-ui/react';
import { MainLayout } from './layaouts/main-layout';
function App() {
  return (
    <Grid
      templateColumns="repeat(12, 1fr)"
      templateRows="auto 1fr"
      minH="100vh"
    >
      <GridItem colSpan={12}>
        <Header />
      </GridItem>

      <GridItem colSpan={12}>
        <MainLayout />
      </GridItem>
    </Grid>
  );
}

export default App;
