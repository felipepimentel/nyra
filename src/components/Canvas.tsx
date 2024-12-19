import { Paper, Grid, Container, Card, ScrollArea, TextInput, ActionIcon, Stack, Text, rem, Transition, Box, Group, Button, Menu, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconSend, IconBrain, IconSparkles, IconDotsVertical, IconPhoto, IconCode, IconChartBar, IconFileText, IconMicrophone, IconPlayerStop, IconMaximize, IconMinimize } from '@tabler/icons-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Visualization } from './Visualization';

interface Message {
  id: string;
  text: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  attachments?: {
    type: 'image' | 'code' | 'chart' | 'document';
    content: string;
  }[];
}

export function Canvas() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'How can I assist you today?',
      type: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'visualization'>('chat');
  const [activeContent, setActiveContent] = useState<{
    type: 'chart' | 'code' | 'image' | 'document';
    data: any;
  }>();
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I understand your request. Let me help you with that.',
        type: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic
  };

  const handleClearHistory = () => {
    setMessages([{
      id: Date.now().toString(),
      text: 'How can I assist you today?',
      type: 'assistant',
      timestamp: new Date(),
    }]);
  };

  return (
    <Container fluid h="calc(100vh - 92px)" p={0}>
      <Grid h="100%" gutter={0}>
        <Grid.Col span={{ base: 12, md: isExpanded ? 12 : 8 }} pos="relative">
          <Paper shadow="sm" h="100%" radius={0}>
            <Stack h="100%" spacing={0}>
              <Group p="xs" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
                <Button.Group>
                  <Button 
                    variant={activeTab === 'chat' ? 'filled' : 'light'}
                    onClick={() => setActiveTab('chat')}
                    size="xs"
                  >
                    Chat
                  </Button>
                  <Button
                    variant={activeTab === 'visualization' ? 'filled' : 'light'}
                    onClick={() => setActiveTab('visualization')}
                    size="xs"
                  >
                    Visualization
                  </Button>
                </Button.Group>

                {!isMobile && (
                  <ActionIcon 
                    variant="subtle"
                    onClick={() => setIsExpanded(!isExpanded)}
                    ml="auto"
                  >
                    {isExpanded ? <IconMinimize size="1.1rem" /> : <IconMaximize size="1.1rem" />}
                  </ActionIcon>
                )}
              </Group>

              <Box style={{ flex: 1, overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                  {activeTab === 'chat' ? (
                    <motion.div
                      key="chat"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      style={{ height: '100%' }}
                    >
                      <ScrollArea h="100%" type="hover">
                        <Stack p="md" gap="md">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Card withBorder>
                              <Group gap="sm">
                                <IconBrain size={24} color="var(--mantine-color-brand-6)" />
                                <Text size="sm" c="dimmed">
                                  Welcome to Nyra. I'm here to help you explore, create, and transform ideas into reality.
                                </Text>
                              </Group>
                            </Card>
                          </motion.div>
                          {messages.map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Card 
                                withBorder 
                                style={{ 
                                  marginLeft: message.type === 'user' ? 'auto' : '0',
                                  marginRight: message.type === 'assistant' ? 'auto' : '0',
                                  maxWidth: '85%',
                                  background: message.type === 'user' ? 'var(--mantine-color-brand-6)' : undefined,
                                }}
                              >
                                <Group gap="xs" align="flex-start">
                                  {message.type === 'assistant' && (
                                    <IconSparkles size={16} style={{ marginTop: rem(4) }} />
                                  )}
                                  <Text 
                                    size="sm"
                                    c={message.type === 'user' ? 'white' : undefined}
                                  >
                                    {message.text}
                                  </Text>
                                </Group>
                                {message.attachments?.map((attachment, index) => (
                                  <Box key={index} mt="xs">
                                    {/* Render attachments based on type */}
                                  </Box>
                                ))}
                              </Card>
                            </motion.div>
                          ))}
                          
                          <Transition mounted={isTyping} transition="fade" duration={200}>
                            {(styles) => (
                              <Box style={styles}>
                                <Card withBorder w="120px">
                                  <Text size="sm" c="dimmed">Typing...</Text>
                                </Card>
                              </Box>
                            )}
                          </Transition>
                          
                          <div ref={messagesEndRef} />
                        </Stack>
                      </ScrollArea>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="visualization"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      style={{ height: '100%' }}
                    >
                      <Visualization activeContent={activeContent} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </Stack>
          </Paper>
        </Grid.Col>

        {(!isExpanded || !isMobile) && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper shadow="sm" h="100%" radius={0}>
              <Stack h="100%" p="md" justify="space-between">
                <Group position="apart" mb="xs">
                  <Text size="sm" fw={500}>Messages</Text>
                  <Menu shadow="md" width={200} position="bottom-end">
                    <Menu.Target>
                      <ActionIcon variant="subtle" size="sm">
                        <IconDotsVertical size="1rem" />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>Options</Menu.Label>
                      <Menu.Item icon={<IconFileText size="1rem" />}>Export Chat</Menu.Item>
                      <Menu.Item icon={<IconPhoto size="1rem" />}>Share Screenshot</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item color="red" onClick={handleClearHistory}>Clear History</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>

                <ScrollArea h="100%" type="hover">
                  <Stack gap="xs">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card 
                            withBorder 
                            style={{ 
                              marginLeft: message.type === 'user' ? 'auto' : '0',
                              marginRight: message.type === 'assistant' ? 'auto' : '0',
                              maxWidth: '85%',
                              background: message.type === 'user' ? 'var(--mantine-color-brand-6)' : undefined,
                            }}
                          >
                            <Group gap="xs" align="flex-start">
                              {message.type === 'assistant' && (
                                <IconSparkles size={16} style={{ marginTop: rem(4) }} />
                              )}
                              <Text 
                                size="sm"
                                c={message.type === 'user' ? 'white' : undefined}
                              >
                                {message.text}
                              </Text>
                            </Group>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </Stack>
                </ScrollArea>

                <Stack spacing="xs">
                  <Group grow>
                    <Tooltip label="Upload File">
                      <ActionIcon 
                        variant="light" 
                        size="lg"
                        onClick={() => {
                          setActiveTab('visualization');
                          setActiveContent({ type: 'image', data: null });
                        }}
                      >
                        <IconPhoto size="1.1rem" />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Share Code">
                      <ActionIcon 
                        variant="light" 
                        size="lg"
                        onClick={() => {
                          setActiveTab('visualization');
                          setActiveContent({ type: 'code', data: null });
                        }}
                      >
                        <IconCode size="1.1rem" />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Create Chart">
                      <ActionIcon 
                        variant="light" 
                        size="lg"
                        onClick={() => {
                          setActiveTab('visualization');
                          setActiveContent({ type: 'chart', data: null });
                        }}
                      >
                        <IconChartBar size="1.1rem" />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label={isRecording ? 'Stop Recording' : 'Start Recording'}>
                      <ActionIcon 
                        variant={isRecording ? 'filled' : 'light'} 
                        size="lg"
                        color={isRecording ? 'red' : undefined}
                        onClick={handleVoiceToggle}
                      >
                        {isRecording ? <IconPlayerStop size="1.1rem" /> : <IconMicrophone size="1.1rem" />}
                      </ActionIcon>
                    </Tooltip>
                  </Group>

                  <TextInput
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.currentTarget.value)}
                    rightSection={
                      <ActionIcon 
                        variant="filled" 
                        color="brand" 
                        disabled={!input.trim()}
                        onClick={handleSendMessage}
                      >
                        <IconSend size="1rem" />
                      </ActionIcon>
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && input.trim()) {
                        handleSendMessage();
                      }
                    }}
                  />
                </Stack>
              </Stack>
            </Paper>
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
} 