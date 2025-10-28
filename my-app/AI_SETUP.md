# AI Feature Setup Guide

## Overview
This expense tracker application uses AI features powered by OpenRouter or OpenAI to provide:
- **Automatic expense categorization** - AI suggests categories based on expense descriptions
- **Smart financial insights** - AI analyzes spending patterns and provides personalized recommendations
- **Interactive Q&A** - Ask questions about your spending habits

## Required API Key

The AI features require an API key from either:
1. **OpenRouter** (Recommended - Free tier available)
2. **OpenAI** (Paid service)

## Setup Instructions

### Option 1: OpenRouter (Recommended)

1. **Get your API key:**
   - Visit https://openrouter.ai/
   - Sign up for a free account
   - Navigate to your API Keys section
   - Create a new API key

2. **Add to your .env file:**
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

3. **Set your app URL (optional):**
   ```
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

### Option 2: OpenAI

1. **Get your API key:**
   - Visit https://platform.openai.com/
   - Sign up or log in
   - Go to API Keys section
   - Create a new API key

2. **Add to your .env file:**
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Current AI Model

The app uses `deepseek/deepseek-chat-v3-0324:free` via OpenRouter, which provides:
- Free tier usage
- Good performance for financial analysis
- Fast response times

## AI Features Breakdown

### 1. Category Suggestion
- **Location:** Add New Expense form (✨ button)
- **Function:** Automatically categorizes expenses based on description
- **Example:** "Coffee at Starbucks" → Food & Dining

### 2. Financial Insights
- **Location:** AI Insights section on dashboard
- **Function:** Analyzes last 30 days of expenses
- **Provides:**
  - Spending pattern analysis
  - Budget alerts
  - Money-saving opportunities
  - Positive reinforcement

### 3. Interactive Q&A
- **Location:** Click on any insight card
- **Function:** Ask follow-up questions about insights
- **Example:** "How can I reduce my food expenses?"

## Troubleshooting

### AI features not working?

1. **Check your .env file:**
   - Ensure `OPENROUTER_API_KEY` or `OPENAI_API_KEY` is set
   - No quotes around the key value
   - No extra spaces

2. **Restart your development server:**
   ```bash
   npm run dev
   ```

3. **Check browser console:**
   - Open Developer Tools (F12)
   - Look for error messages
   - Common issues: Invalid API key, Rate limits

4. **Fallback behavior:**
   - If AI fails, the app shows default messages
   - Category suggestion defaults to "Other"
   - Insights show welcome messages for new users

## API Usage & Costs

### OpenRouter (Free Tier)
- Free credits for testing
- Pay-as-you-go after free tier
- Very affordable for personal use

### OpenAI
- Paid service from the start
- Charges per token used
- More expensive than OpenRouter

## Privacy & Security

- API keys are stored in `.env` file (gitignored)
- Never commit API keys to version control
- Expense data is sent to AI provider for analysis
- No data is stored by AI providers (per their policies)

## Need Help?

If you're still having issues:
1. Check that your API key is valid
2. Verify you have internet connection
3. Check API provider status page
4. Review server logs for detailed error messages
