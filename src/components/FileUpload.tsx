import { Group, Text, rem, Stack, Paper, ActionIcon, Card, ScrollArea } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconUpload, IconX, IconDownload, IconFile, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

interface FileUploadProps {
  onUpload?: (files: FileWithPath[]) => void;
  maxSize?: number;
  accept?: string[];
}

export function FileUpload({ onUpload, maxSize = 5 * 1024 ** 2, accept }: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
    onUpload?.(acceptedFiles);
  };

  const handleRemove = (file: FileWithPath) => {
    setFiles((prev) => prev.filter((f) => f !== file));
  };

  return (
    <Stack h="100%" spacing="xs">
      <Dropzone
        onDrop={handleDrop}
        maxSize={maxSize}
        accept={accept}
        style={{ flex: 1 }}
      >
        <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color="var(--mantine-color-brand-6)"
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color="var(--mantine-color-red-6)"
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconUpload size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <Stack align="center" spacing="xs">
            <Text size="xl" inline>
              Drag files here or click to select
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Files should not exceed {maxSize / 1024 / 1024}mb
            </Text>
          </Stack>
        </Group>
      </Dropzone>

      {files.length > 0 && (
        <Paper withBorder p="xs">
          <ScrollArea h={200} type="hover">
            <Stack spacing="xs">
              {files.map((file, index) => (
                <Card key={index} withBorder padding="xs">
                  <Group position="apart">
                    <Group spacing="sm">
                      <IconFile size="1.2rem" />
                      <Stack spacing={2}>
                        <Text size="sm" lineClamp={1}>
                          {file.name}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {(file.size / 1024).toFixed(2)} KB
                        </Text>
                      </Stack>
                    </Group>
                    <ActionIcon.Group>
                      <ActionIcon 
                        variant="light" 
                        size="sm" 
                        component="a" 
                        href={URL.createObjectURL(file)} 
                        download={file.name}
                      >
                        <IconDownload size="1rem" />
                      </ActionIcon>
                      <ActionIcon 
                        variant="light" 
                        color="red" 
                        size="sm"
                        onClick={() => handleRemove(file)}
                      >
                        <IconTrash size="1rem" />
                      </ActionIcon>
                    </ActionIcon.Group>
                  </Group>
                </Card>
              ))}
            </Stack>
          </ScrollArea>
        </Paper>
      )}
    </Stack>
  );
} 