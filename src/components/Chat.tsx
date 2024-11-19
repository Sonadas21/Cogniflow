import React from 'react';
import { MessageSquare, Send, ImagePlus } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import MetricsPanel from './MetricsPanel';
import SourcePanel from './SourcePanel';
import ModelSelector from './ModelSelector';
import FileDisplay from './FileDisplay';
import MessageCard from './MessageCard';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

interface UploadedFile {
  name: string;
  file: File;
}

interface ActivePanel {
  type: 'metrics' | 'sources' | null;
  messageId: string | null;
}

export default function Chat() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [model, setModel] = React.useState('gpt-4');
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState<UploadedFile | null>(null);
  const [activePanel, setActivePanel] = React.useState<ActivePanel>({
    type: null,
    messageId: null
  });
  const [isPanelMinimized, setIsPanelMinimized] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: 'user', content: input, id: `msg-${Date.now()}-user` },
      { role: 'assistant', content: 'This is a sample response. In a real application, this would be the AI model\'s response.', id: `msg-${Date.now()}-assistant` }
    ];
    setMessages(newMessages);
    setInput('');
  };

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,.pdf,.doc,.docx,.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setUploadedFile({
          name: file.name,
          file: file
        });
      }
    };
    input.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handlePanelToggle = (messageId: string, type: 'metrics' | 'sources') => {
    setActivePanel(current => {
      if (current.messageId === messageId && current.type === type) {
        return { type: null, messageId: null };
      }
      return { type, messageId };
    });
    setIsPanelMinimized(false);
  };

  const handlePanelClose = () => {
    setActivePanel({ type: null, messageId: null });
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 dark:bg-gray-800 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <button className="flex-1 bg-white/10 hover:bg-white/20 rounded-lg p-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            New Chat
          </button>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Recent Chats</h3>
          {['Previous Chat 1', 'Previous Chat 2'].map((chat, i) => (
            <button key={i} className="w-full text-left p-2 hover:bg-white/10 rounded-lg text-sm">
              {chat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          {/* Model Selection */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <ModelSelector model={model} onChange={setModel} />
              <ThemeToggle isDark={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onMetricsToggle={() => handlePanelToggle(message.id, 'metrics')}
                onSourcesToggle={() => handlePanelToggle(message.id, 'sources')}
                activePanel={activePanel.messageId === message.id ? activePanel.type : null}
              />
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              {uploadedFile && (
                <div className="px-4">
                  <FileDisplay
                    fileName={uploadedFile.name}
                    onRemove={handleRemoveFile}
                  />
                </div>
              )}
              <div className="flex gap-4">
                <div className="flex-1 flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-700">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={handleFileSelect}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                    title="Attach file"
                  >
                    <ImagePlus className="w-5 h-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>

        {activePanel.type && (
          <div className="border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out">
            {activePanel.type === 'metrics' ? (
              <MetricsPanel
                isMinimized={isPanelMinimized}
                onMinimize={() => setIsPanelMinimized(!isPanelMinimized)}
                onClose={handlePanelClose}
              />
            ) : (
              <SourcePanel
                isMinimized={isPanelMinimized}
                onMinimize={() => setIsPanelMinimized(!isPanelMinimized)}
                onClose={handlePanelClose}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}