# Chat Templates Documentation

## Overview
Two reusable chat templates for task pages, supporting image uploads and database persistence.

## Template 1: ChatTemplate1 (with LLM)
**File**: `src/components/chat/ChatTemplate1.tsx`

### Features:
- ✅ Connected to Doubao LLM (model: doubao-seed-1-6-250615)
- ✅ User input: text + multiple image uploads
- ✅ Real-time message updates
- ✅ Automatic message saving to database (both user input AND AI response)
- ✅ Image storage in Supabase storage bucket
- ✅ AI-powered responses

### Display Behavior:
When using ChatTemplate1, display AI responses in a summary section:
```tsx
// Filter for AI responses
const aiResponses = messages.filter(m => m.role === 'assistant');
```

### Usage:
```tsx
import { ChatTemplate1 } from '@/components/chat/ChatTemplate1';

<ChatTemplate1 taskId="task-1" />
```

### Edge Function:
- **Endpoint**: `doubao-chat`
- **Location**: `supabase/functions/doubao-chat/index.ts`
- **API Key**: ARK_API_KEY (already configured)

## Template 2: ChatTemplate2 (without LLM)
**File**: `src/components/chat/ChatTemplate2.tsx`

### Features:
- ✅ Simple note-taking interface
- ✅ User input: text + multiple image uploads
- ✅ Real-time updates
- ✅ Automatic saving to database (user input only)
- ✅ Image storage in Supabase storage bucket
- ❌ No AI responses (just storage)

### Display Behavior:
When using ChatTemplate2, display user's original input in a summary section:
```tsx
// Filter for user messages
const userAnswers = messages.filter(m => m.role === 'user');
```

### Usage:
```tsx
import { ChatTemplate2 } from '@/components/chat/ChatTemplate2';

<ChatTemplate2 taskId="task-1" />

{/* Display user answers below */}
{userAnswers.length > 0 && (
  <Card>
    <CardHeader>
      <CardTitle>我的回答</CardTitle>
    </CardHeader>
    <CardContent>
      {userAnswers.map(answer => (
        <div key={answer.id}>
          <p>{answer.content}</p>
          {answer.image_urls?.map(url => <img src={url} />)}
        </div>
      ))}
    </CardContent>
  </Card>
)}
```

## Database Structure

### Tables:
1. **conversations**
   - id (uuid)
   - user_id (uuid, nullable)
   - task_id (text)
   - title (text)
   - created_at, updated_at

2. **messages**
   - id (uuid)
   - conversation_id (uuid)
   - role ('user' | 'assistant')
   - content (text)
   - image_urls (text[])
   - created_at

### Storage:
- **Bucket**: `chat-images`
- **Access**: Public
- **File naming**: `{timestamp}-{filename}`

## Current Implementation

### Task 1 (ThemeParkTask)
- Uses **ChatTemplate2** (note-taking mode)
- Displays user's original input below the chat interface
- Shows all submitted answers with images and timestamps