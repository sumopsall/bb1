import { GoogleGenerativeAI } from '@google/generative-ai';

const CARE4U_SYSTEM_PROMPT = `You are Care4U, a supportive and empathetic digital assistant designed to help students manage stress, anxiety, and emotional well-being. Provide advice, support, or comforting responses. Keep responses friendly and helpful. If a student seems in distress, gently suggest talking to a real mental health professional.`;

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey && apiKey !== 'your_gemini_api_key_here') {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    }
  }

  async sendMessage(userMessage: string): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini API key not configured. Please add your API key to the .env file.');
    }

    try {
      // Inject the Care4U prompt with the user's message
      const fullPrompt = `${CARE4U_SYSTEM_PROMPT}\n\nUser: ${userMessage}`;
      
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to get response from Care4U. Please try again.');
    }
  }

  isConfigured(): boolean {
    return this.model !== null;
  }
}

export const geminiService = new GeminiService();