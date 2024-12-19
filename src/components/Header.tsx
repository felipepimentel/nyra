import { Group, Title, Container, ActionIcon, useMantineColorScheme, Box, Transition } from '@mantine/core';
import { IconSun, IconMoon, IconBrain } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const MotionGroup = motion(Group);

export function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Container fluid h="100%">
      <Group h="100%" px="md" justify="space-between">
        <MotionGroup
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          gap="md"
        >
          <Group gap="xs">
            <IconBrain 
              size={28} 
              style={{ 
                color: 'var(--mantine-color-brand-6)',
              }} 
            />
            <Title order={3} c="brand">NYRA</Title>
          </Group>
          <Box 
            style={{ 
              width: 2, 
              height: 24, 
              background: 'var(--mantine-color-brand-6)',
              opacity: 0.5 
            }} 
          />
          <Title order={4} c="dimmed" fw={400}>
            Minds aligned. Possibilities unleashed.
          </Title>
        </MotionGroup>

        <Transition mounted={true} transition="fade" duration={500}>
          {(styles) => (
            <ActionIcon
              variant="light"
              onClick={() => toggleColorScheme()}
              size="lg"
              radius="md"
              style={styles}
              aria-label="Toggle color scheme"
            >
              {isDark ? (
                <IconSun size="1.2rem" stroke={1.5} />
              ) : (
                <IconMoon size="1.2rem" stroke={1.5} />
              )}
            </ActionIcon>
          )}
        </Transition>
      </Group>
    </Container>
  );
} 