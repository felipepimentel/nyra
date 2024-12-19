import { Box, Paper, Select, ActionIcon, Group, Stack } from '@mantine/core';
import Editor from '@monaco-editor/react';
import { IconPlayerPlay, IconDownload, IconCopy } from '@tabler/icons-react';
import { useState } from 'react';

interface CodeEditorProps {
  initialValue?: string;
  language?: string;
  onRun?: (code: string) => void;
  onSave?: (code: string) => void;
}

const LANGUAGE_OPTIONS = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'json', label: 'JSON' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
];

export function CodeEditor({ initialValue = '', language = 'javascript', onRun, onSave }: CodeEditorProps) {
  const [code, setCode] = useState(initialValue);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleRun = () => {
    onRun?.(code);
  };

  const handleSave = () => {
    onSave?.(code);
  };

  return (
    <Stack h="100%" spacing="xs">
      <Group>
        <Select
          size="xs"
          value={selectedLanguage}
          onChange={(value) => setSelectedLanguage(value || 'javascript')}
          data={LANGUAGE_OPTIONS}
          w={120}
        />
        <ActionIcon.Group>
          <ActionIcon variant="light" size="sm" onClick={handleRun}>
            <IconPlayerPlay size="1rem" />
          </ActionIcon>
          <ActionIcon variant="light" size="sm" onClick={handleCopy}>
            <IconCopy size="1rem" />
          </ActionIcon>
          <ActionIcon variant="light" size="sm" onClick={handleSave}>
            <IconDownload size="1rem" />
          </ActionIcon>
        </ActionIcon.Group>
      </Group>

      <Paper withBorder style={{ flex: 1, overflow: 'hidden' }}>
        <Box h="100%">
          <Editor
            height="100%"
            defaultLanguage={selectedLanguage}
            language={selectedLanguage}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              lineNumbers: 'on',
              renderWhitespace: 'selection',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </Box>
      </Paper>
    </Stack>
  );
} 