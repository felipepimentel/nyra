import { Box, Paper, Select, ActionIcon, Group, Stack, Text, Button } from '@mantine/core';
import { IconDownload, IconRefresh, IconPlus } from '@tabler/icons-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface ChartViewProps {
  data?: any[];
  onSave?: (data: any) => void;
  onRefresh?: () => void;
}

const SAMPLE_DATA = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 900 },
];

const CHART_TYPES = [
  { value: 'line', label: 'Line Chart' },
  { value: 'bar', label: 'Bar Chart' },
  { value: 'area', label: 'Area Chart' },
  { value: 'pie', label: 'Pie Chart' },
];

export function ChartView({ data = SAMPLE_DATA, onSave, onRefresh }: ChartViewProps) {
  const [chartType, setChartType] = useState('line');

  return (
    <Stack h="100%" spacing="xs">
      <Group position="apart">
        <Group>
          <Select
            size="xs"
            value={chartType}
            onChange={(value) => setChartType(value || 'line')}
            data={CHART_TYPES}
            w={120}
          />
          <Button size="xs" leftIcon={<IconPlus size="1rem" />} variant="light">
            Add Data
          </Button>
        </Group>
        <ActionIcon.Group>
          <ActionIcon variant="light" size="sm" onClick={onRefresh}>
            <IconRefresh size="1rem" />
          </ActionIcon>
          <ActionIcon variant="light" size="sm" onClick={() => onSave?.(data)}>
            <IconDownload size="1rem" />
          </ActionIcon>
        </ActionIcon.Group>
      </Group>

      <Paper withBorder style={{ flex: 1, overflow: 'hidden' }}>
        <Box p="md" h="100%">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--mantine-color-brand-6)" 
                strokeWidth={2}
                dot={{ 
                  fill: 'var(--mantine-color-brand-6)',
                  r: 4,
                }}
                activeDot={{ 
                  r: 6,
                  stroke: 'var(--mantine-color-brand-6)',
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Stack>
  );
} 