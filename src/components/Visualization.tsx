import { Box, Paper, Tabs, Text, ThemeIcon, useMantineTheme, Group, ActionIcon, Stack } from '@mantine/core';
import { IconChartBar, IconCode, IconFileText, IconPhoto, IconUpload, IconPlus } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeEditor } from './CodeEditor';
import { ChartView } from './ChartView';
import { FileUpload } from './FileUpload';
import { useState } from 'react';

interface VisualizationProps {
  activeContent?: {
    type: 'chart' | 'code' | 'image' | 'document';
    data: any;
  };
}

export function Visualization({ activeContent }: VisualizationProps) {
  const theme = useMantineTheme();
  const [activeTab, setActiveTab] = useState(activeContent?.type || 'chart');

  return (
    <Box h="100%">
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value as string)} h="100%">
        <Stack h="100%" spacing={0}>
          <Tabs.List grow>
            <Tabs.Tab
              value="chart"
              leftSection={
                <ThemeIcon variant="light" size="sm" color="brand">
                  <IconChartBar size="1rem" />
                </ThemeIcon>
              }
            >
              Charts
            </Tabs.Tab>
            <Tabs.Tab
              value="code"
              leftSection={
                <ThemeIcon variant="light" size="sm" color="brand">
                  <IconCode size="1rem" />
                </ThemeIcon>
              }
            >
              Code
            </Tabs.Tab>
            <Tabs.Tab
              value="files"
              leftSection={
                <ThemeIcon variant="light" size="sm" color="brand">
                  <IconFileText size="1rem" />
                </ThemeIcon>
              }
            >
              Files
            </Tabs.Tab>
            <Tabs.Tab
              value="images"
              leftSection={
                <ThemeIcon variant="light" size="sm" color="brand">
                  <IconPhoto size="1rem" />
                </ThemeIcon>
              }
            >
              Images
            </Tabs.Tab>
          </Tabs.List>

          <Box style={{ flex: 1, position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{ height: '100%' }}
              >
                <Tabs.Panel value="chart" h="100%">
                  <Box p="md" h="100%">
                    <ChartView />
                  </Box>
                </Tabs.Panel>

                <Tabs.Panel value="code" h="100%">
                  <Box p="md" h="100%">
                    <CodeEditor />
                  </Box>
                </Tabs.Panel>

                <Tabs.Panel value="files" h="100%">
                  <Box p="md" h="100%">
                    <FileUpload />
                  </Box>
                </Tabs.Panel>

                <Tabs.Panel value="images" h="100%">
                  <Box p="md" h="100%">
                    <FileUpload 
                      accept={['image/png', 'image/jpeg', 'image/gif', 'image/webp']}
                      maxSize={10 * 1024 ** 2}
                    />
                  </Box>
                </Tabs.Panel>
              </motion.div>
            </AnimatePresence>
          </Box>
        </Stack>
      </Tabs>
    </Box>
  );
} 