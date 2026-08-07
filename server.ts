import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 2. Pincode verification endpoint
const VALID_PINCODES: Record<string, { city: string; area: string; estimatedDelivery: string }> = {
  '110001': { city: 'New Delhi', area: 'Connaught Place / Central Delhi', estimatedDelivery: 'Express 30 Mins' },
  '110016': { city: 'New Delhi', area: 'Hauz Khas / Green Park', estimatedDelivery: 'Morning 6 AM Slot' },
  '201301': { city: 'Noida', area: 'Sector 18 / Atta Market', estimatedDelivery: 'Express 45 Mins' },
  '122002': { city: 'Gurugram', area: 'DLF Phase II / Cyber City', estimatedDelivery: 'Express 30 Mins' },
  '110024': { city: 'New Delhi', area: 'Lajpat Nagar / Defence Colony', estimatedDelivery: 'Express 40 Mins' },
  '201307': { city: 'Noida', area: 'Sector 62 / Electronic City', estimatedDelivery: 'Morning 6 AM Slot' },
  '160017': { city: 'Chandigarh', area: 'Sector 17 Plaza', estimatedDelivery: 'Next Morning 6 AM' }
};

app.post('/api/pincode/check', (req, res) => {
  const { pincode } = req.body;
  if (!pincode || typeof pincode !== 'string') {
    res.status(400).json({ available: false, message: 'Please enter a valid 6-digit Pincode.' });
    return;
  }
  const cleanPin = pincode.trim();
  const info = VALID_PINCODES[cleanPin];
  if (info) {
    res.json({
      available: true,
      pincode: cleanPin,
      city: info.city,
      area: info.area,
      estimatedDelivery: info.estimatedDelivery,
      slots: ['Morning 6:00 AM - 8:00 AM', 'Afternoon 12:00 PM - 2:00 PM', 'Evening 6:00 PM - 8:00 PM']
    });
  } else {
    // Standard coverage for testing any Indian 6 digit pincode
    if (/^\d{6}$/.test(cleanPin)) {
      res.json({
        available: true,
        pincode: cleanPin,
        city: 'Delhi NCR Region',
        area: 'Standard Delivery Zone',
        estimatedDelivery: 'Next Morning 6 AM Slot',
        slots: ['Morning 6:00 AM - 8:00 AM', 'Evening 6:00 PM - 8:00 PM']
      });
    } else {
      res.json({ available: false, message: 'Pincode not currently serviceable. We are expanding rapidly!' });
    }
  }
});

// 3. AI Chatbot / Sommelier / Sweet Advisor Endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback rule-based response if API key is absent
      res.json({
        reply: `Welcome to **Shiv Milk & Sweets**! I am your AI Dairy & Sweet Advisor. For ${message}, I recommend our signature **Silver Vark Kaju Katli** and **Pure A2 Bilona Desi Ghee**. How can I help you customize your subscription or festival order today?`
      });
      return;
    }

    const systemInstruction = `You are "Shiv Dairy Sommelier", the executive AI concierge and culinary expert for Shiv Milk & Sweets (Taste & Purity Together Since 1999).
You specialize in:
- Recommending authentic Indian sweets (Kaju Katli, Milk Cake, Gulab Jamun, Rasgulla, Peda, Burfi).
- Advising on daily organic A2 Cow Milk & Full Cream Buffalo Milk subscriptions.
- Explaining the traditional Vedic Bilona Ghee process.
- Recommending festival gift hampers and corporate/wedding bulk orders.
- Guiding users on health benefits of A2 milk, soft Malai Paneer, and probiotic Kulhad Curd/Lassi.
Keep responses regal, polite, helpful, and concise with bullet points when applicable. Include Indian cultural charm!`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: message,
      config: {
        systemInstruction
      }
    });

    res.json({ reply: response.text || 'I am delighted to help you discover the finest sweets and fresh dairy products from Shiv Milk & Sweets.' });
  } catch (err: any) {
    console.error('Gemini AI Chat error:', err);
    res.json({
      reply: 'At Shiv Milk & Sweets, purity is our hallmark. Try our signature A2 Bilona Desi Ghee and fresh Malai Paneer today!'
    });
  }
});

// 4. AI Recommendation / Sweet Box Builder
app.post('/api/ai/recommend', async (req, res) => {
  try {
    const { occasion, budget, dietaryPreference, familySize } = req.body;
    const ai = getGeminiClient();

    const prompt = `Suggest a luxury sweet and dairy combo box from Shiv Milk & Sweets for:
Occasion: ${occasion || 'General Gifting'}
Budget: ₹${budget || 1000}
Dietary preference: ${dietaryPreference || 'Pure Vegetarian, Fresh'}
Family size: ${familySize || '4 persons'}

Return a JSON array of 3 recommended products with reason. Format response as clean text suggestions.`;

    if (!ai) {
      res.json({
        recommendation: `For your ${occasion || 'celebration'} with budget ₹${budget || 1000}:
1. **Silver Vark Kaju Katli (500g)** - ₹490
2. **Traditional A2 Bilona Desi Ghee (1kg)** - ₹1450
3. **Royal Kesari Kulhad Lassi (2 Bottles)** - ₹120
*Reason:* Balanced blend of pure celebration sweets and daily organic wellness!`
      });
      return;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an AI sweet gifting curator for Shiv Milk & Sweets.'
      }
    });

    res.json({ recommendation: response.text });
  } catch (err) {
    res.json({
      recommendation: 'Recommended Combo: Silver Vark Kaju Katli + Fresh Malai Paneer + A2 Bilona Desi Ghee!'
    });
  }
});

// 5. Bulk Order Inquiry API
app.post('/api/bulk/inquiry', (req, res) => {
  const { fullName, organization, phone, eventType, estimatedGuests } = req.body;
  res.json({
    success: true,
    inquiryId: `BULK-${Math.floor(100000 + Math.random() * 900000)}`,
    message: `Thank you ${fullName || 'Valued Customer'}! Our Corporate & Event Gifting Specialist will call you at ${phone || 'your phone number'} within 2 hours with an official quotation.`
  });
});

// Start Express + Vite
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Shiv Milk & Sweets Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
