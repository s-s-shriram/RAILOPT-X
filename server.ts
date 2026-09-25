import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    try {
      geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.error("Failed to initialize Gemini client:", err);
    }
  }
  return geminiClient;
}

// Health check API
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "RAILOPT-X Decision Support Server",
    timestamp: new Date().toISOString(),
  });
});

// AI Copilot Endpoint with server-side Gemini and Railway Domain fallback
app.post("/api/ai-copilot", async (req, res) => {
  const { query, corridorState } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `You are the RAILOPT-X Railway Maintenance Planning Copilot for Indian Railways (SIH 2026 Problem Statement SIH26027).
You are an expert in railway operations, BDMS, TMS, SMMS, TDMS, COA, OHE traction isolation, track machines, S&T interlocking, and constraint optimization.

Corridor Context:
- Fictional Corridor: Chennai Central (ST001) to Chittoor (ST036) over 35 sections.
- Current active section under coordination: SEC018 (Tiruvallur - Egattur) with high-synergy bundle (ENG-0187 Track Alignment, SNT-0098 Signal Inspection, TRC-0076 OHE Inspection).
- High freight corridor sections: SEC018, SEC025 (Arakkonam), SEC033 (Renigunta).
- Summary Stats: ${JSON.stringify(corridorState || {})}

User Question: "${query}"

Guidelines:
1. Provide concise, technically accurate railway operational advice.
2. Refer directly to Indian Railways concepts (e.g. block windows, traction power cutoff, caution orders, freight corridor slots, team mobilization).
3. If asked "Why was this block chosen?", emphasize safety compatibility, zero passenger peak conflict, and multi-department synergy.
4. Keep the response crisp, professional, and well-structured with bullet points.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });

      return res.json({
        answer: response.text,
        source: "Gemini 3.8 Flash (Server-Side)",
      });
    } catch (error: any) {
      console.warn("Gemini API error, falling back to local railway domain reasoning:", error?.message);
    }
  }

  // Fallback domain-specific reasoning engine if API key not supplied or call failed
  const q = query.toLowerCase();
  let answer = "";

  if (q.includes("sec018") || q.includes("eng-0187") || q.includes("bundle") || q.includes("synergy")) {
    answer = `**Section SEC018 (Tiruvallur → Egattur) Coordinated Bundle Analysis:**
- **Selected Block:** BLK-0187 (Wednesday 13:00 - 16:00, 3 Hours duration).
- **Bundled Activities:**
  1. *ENG-0187* (Track Alignment, 2.0 hrs, Team E07, Track Tamping Machine).
  2. *SNT-0098* (Signal Inspection & Point testing, 1.5 hrs, Team S04).
  3. *TRC-0076* (OHE Inspection & Catenary adjustment, 2.0 hrs, Team T05, Tower Wagon).
- **Why this was chosen:** Synergy Score is **91/100**. All three tasks share the same geographic section, fit simultaneously within the 3-hour power & traffic block, share traction isolation, and avoid the morning/evening suburban passenger peaks.`;
  } else if (q.includes("critical") || q.includes("highest risk") || q.includes("vulnerab")) {
    answer = `**Top Critical Assets & Sections Identified:**
- **Most Critical Section:** SEC018 (Tiruvallur - Egattur) and SEC025 (Arakkonam Junction) due to high passenger density combined with 8+ daily freight paths.
- **Top Urgent Tasks:**
  1. *ENG-0187* (Criticality 86, 4 days overdue, track alignment defect).
  2. *SNT-0098* (Criticality 92, 2 days overdue, signal controller malfunction).
  3. *SIG-SEC012-001* (Criticality 96, emergency failure on SEC012).
- **Action:** Prioritized for immediate coordinated block windows during non-peak hours.`;
  } else if (q.includes("freight") || q.includes("+20%") || q.includes("what-if")) {
    answer = `**Freight Demand +20% Impact Assessment:**
- When freight demand rises by 20%, 6 additional goods paths enter the Arakkonam–Renigunta corridor.
- **Conflict Detected:** Afternoon block BLK-0194 collides with scheduled container freight path CON-402.
- **Dynamic Re-plan:** The optimization engine shifts secondary maintenance to nocturnal slots (01:00 - 04:00) and bundles SEC025 tasks to preserve daylight freight throughput without compromising safety.`;
  } else if (q.includes("why blk-0187") || q.includes("blk-0214") || q.includes("rejected")) {
    answer = `**Block Selection vs Rejection Decision Log:**
- **BLK-0187 Selected (Score 94.2):** Zero passenger peak conflict, 180 min duration matches longest task, traction power isolation granted, all 3 specialized crews available.
- **BLK-0214 Rejected:** Collocated with Chennai–Bangalore Express EXP-101 and heavy rakes heading to Arakkonam yard. Imposed an estimated 42-minute passenger delay, violating the zero-disruption hard constraint.`;
  } else if (q.includes("emergency") || q.includes("signal failure") || q.includes("sec012")) {
    answer = `**Emergency Protocol for SEC012 Signal Failure:**
- **Impact:** Automatic signalling fail-safe drop between Veppampattu and Sevvapet Road; caution order limit 15 km/h.
- **Emergency Action:**
  1. Emergency 90-min traffic block authorized on SEC012.
  2. Rapid dispatch of S&T Emergency Team S02 with portable test unit.
  3. Non-essential track ballast profiling on adjacent section deferred by 24 hours to prevent corridor congestion.`;
  } else {
    answer = `**RAILOPT-X Corridor Operations Intelligence:**
- **Active Network:** 36 Stations (Chennai Central to Chittoor), 35 Sections, 140+ Assets.
- **Current Optimization Status:** Feasible CP-SAT schedule generated with **92.4% Asset Availability** and **84.6% Block Utilization**.
- **Cross-Department Coordination:** 24 high-value bundles formed, reducing separate line closures from 58 blocks to 27 coordinated blocks.`;
  }

  res.json({
    answer,
    source: "RAILOPT-X Railway Domain Knowledge Engine (Local Fallback)",
  });
});

// Setup Vite middleware in dev or static serving in prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RAILOPT-X Server running on http://localhost:${PORT}`);
  });
}

startServer();
