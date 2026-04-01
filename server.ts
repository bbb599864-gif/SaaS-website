import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { AIService } from "./src/services/backend/AIService";
import { InventoryService } from "./src/services/backend/InventoryService";
import { ERPService } from "./src/services/backend/ERPService";
import { AuditService } from "./src/services/backend/AuditService";
import { TaskService } from "./src/services/backend/TaskService";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const wss = new WebSocketServer({ server: httpServer });
  const PORT = 3000;

  app.use(express.json());

  // --- MIDDLEWARE: Multi-tenant Context ---
  app.use((req, res, next) => {
    // In a real SaaS, this would come from the JWT or a subdomain
    req.headers["x-tenant-id"] = req.headers["x-tenant-id"] || "TENANT-001";
    req.headers["x-user-id"] = req.headers["x-user-id"] || "USER-001";
    next();
  });

  // --- ERP INTEGRATION SERVICE ---
  app.post("/api/erp/inbound/orders", async (req, res) => {
    const tenantId = req.headers["x-tenant-id"] as string;
    const userId = req.headers["x-user-id"] as string;
    const { erpId, items, erpType } = req.body; // erpType: "SAP", "NetSuite", "D365", "Odoo"
    
    try {
      console.log(`[${tenantId}] Receiving inbound order from ${erpType || "ERP"}: ${erpId}`);
      const order = await ERPService.receiveOrder(erpId, items);
      
      // 1. Log the action
      await AuditService.logAction(tenantId, userId, "ERP_ORDER_RECEIVED", { erpId, orderId: order.id, erpType });
      
      // 2. Orchestrate robot tasks
      const tasks = await TaskService.orchestrateOrderTasks(tenantId, order.id, items);
      
      // 3. Notify clients via WebSocket
      broadcast({
        type: "order.received",
        tenantId,
        data: { order, tasks }
      });

      res.json({ status: "success", order, tasks });
    } catch (error) {
      console.error("ERP Inbound Error:", error);
      res.status(500).json({ error: "ERP Integration Error" });
    }
  });

  app.get("/api/erp/sync/inventory/:sku", async (req, res) => {
    const tenantId = req.headers["x-tenant-id"] as string;
    const userId = req.headers["x-user-id"] as string;
    const { sku } = req.params;
    const { quantity } = req.query;
    
    const success = await ERPService.syncInventory(sku, Number(quantity));
    if (success) {
      await AuditService.logAction(tenantId, userId, "ERP_INVENTORY_SYNC", { sku, quantity });
    }
    res.json({ success });
  });

  // --- INVENTORY INTELLIGENCE SERVICE ---
  app.post("/api/inventory/calculate-abc", async (req, res) => {
    const tenantId = req.headers["x-tenant-id"] as string;
    const userId = req.headers["x-user-id"] as string;
    const { items } = req.body;
    
    const categorized = InventoryService.calculateABC(items);
    await AuditService.logAction(tenantId, userId, "ABC_CALCULATION", { itemCount: items.length });
    res.json(categorized);
  });

  app.get("/api/inventory/jit-analysis/:sku", async (req, res) => {
    const { sku } = req.params;
    const item = req.body.item; // In real app, fetch from DB
    if (!item) return res.status(404).json({ error: "Item not provided" });
    const analysis = InventoryService.analyzeJIT(item);
    res.json(analysis);
  });

  app.get("/api/inventory/safety-stock", (req, res) => {
    const { avgDemand, leadTime, demandVariability, serviceLevel } = req.query;
    const safetyStock = InventoryService.calculateSafetyStock(
      Number(avgDemand),
      Number(leadTime),
      Number(demandVariability),
      Number(serviceLevel || 1.65)
    );
    res.json({ safetyStock });
  });

  // --- AI INTELLIGENCE LAYER ---
  app.post("/api/ai/analyze-sku", async (req, res) => {
    const tenantId = req.headers["x-tenant-id"] as string;
    const userId = req.headers["x-user-id"] as string;
    const { sku, history } = req.body;
    
    const insights = await AIService.getForecast(sku, history);
    await AuditService.logAction(tenantId, userId, "AI_SKU_ANALYSIS", { sku });
    res.json(insights);
  });

  // --- WEBSOCKET FOR REAL-TIME TELEMETRY ---
  const clients = new Set<WebSocket>();
  wss.on("connection", (ws) => {
    clients.add(ws);
    ws.on("close", () => clients.delete(ws));
  });

  const broadcast = (message: any) => {
    const payload = JSON.stringify(message);
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  };

  // Simulate real-time robot telemetry with multi-tenant awareness
  setInterval(() => {
    broadcast({
      type: "robot.updated",
      tenantId: "TENANT-001",
      data: {
        id: "Haulix – №52561",
        battery: Math.max(0, Math.min(100, 72 + (Math.random() * 2 - 1))),
        position: { x: 100 + Math.random() * 10, y: 150 + Math.random() * 10 }
      }
    });
  }, 2000);

  // --- VITE MIDDLEWARE ---
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

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
