# Chat Templates Documentation

## Overview
Two reusable chat templates for task pages, supporting image uploads and database persistence.

## Template 1: ChatTemplate1 (with LLM)
**File**: `src/components/chat/ChatTemplate1.tsx`

### Features:
- ✅ Connected to Doubao LLM (model: doubao-seed-1-6-250615)
- ✅ User input: text + multiple image uploads
- ✅ Real-time message updates
- ✅ Automatic message saving to database
- ✅ Image storage in Supabase storage bucket
- ✅ AI-powered responses

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
- ✅ Automatic saving to database
- ✅ Image storage in Supabase storage bucket
- ❌ No AI responses (just storage)

### Usage:
```tsx
import { ChatTemplate2 } from '@/components/chat/ChatTemplate2';

<ChatTemplate2 taskId="task-1" />
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
The ThemeParkTask page now uses **ChatTemplate1** by default.