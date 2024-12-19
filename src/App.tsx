import { MantineProvider, AppShell, createTheme, ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import { Canvas } from './components/Canvas';
import { Header } from './components/Header';

const theme = createTheme({
  primaryColor: 'brand',
  fontFamily: 'Inter, sans-serif',
  defaultRadius: 'md',
  colors: {
    brand: [
      '#EDF2FF',
      '#DBE4FF',
      '#BAC8FF',
      '#91A7FF',
      '#748FFC',
      '#5C7CFA',
      '#4C6EF5',
      '#4263EB',
      '#3B5BDB',
      '#364FC7',
    ],
  },
  defaultGradient: {
    from: 'brand',
    to: 'cyan',
    deg: 45,
  },
  components: {
    Card: {
      defaultProps: {
        radius: 'md',
      },
    },
    ActionIcon: {
      defaultProps: {
        radius: 'md',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});

function App() {
  return (
    <>
      <ColorSchemeScript />
      <MantineProvider 
        theme={theme}
        defaultColorScheme="auto"
      >
        <AppShell
          header={{ height: 60 }}
          padding="md"
        >
          <AppShell.Header>
            <Header />
          </AppShell.Header>

          <AppShell.Main>
            <Canvas />
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </>
  );
}

export default App;
