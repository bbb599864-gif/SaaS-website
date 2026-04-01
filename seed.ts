import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import firebaseConfig from "./firebase-applet-config.json";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const seedData = async () => {
  console.log("Seeding initial multi-tenant warehouse data...");

  const tenantId = "TENANT-001";

  // Seed Tenant
  await setDoc(doc(db, "tenants", tenantId), {
    id: tenantId,
    name: "Logistics Pro Inc.",
    plan: "enterprise",
    createdAt: new Date().toISOString()
  });

  // Seed User
  await setDoc(doc(db, "users", "bbb599864@gmail.com"), {
    uid: "bbb599864@gmail.com",
    tenantId: tenantId,
    email: "bbb599864@gmail.com",
    role: "admin",
    displayName: "Senior Warehouse Architect"
  });

  // Seed Robots
  const robots = [
    { id: "Haulix – №52561", tenantId, status: "available", battery: 85, position: { x: 150, y: 100 }, lastUpdated: new Date().toISOString() },
    { id: "Haulix – №52562", tenantId, status: "employed", battery: 42, position: { x: 300, y: 200 }, lastUpdated: new Date().toISOString() },
    { id: "Haulix – №52563", tenantId, status: "maintenance", battery: 12, position: { x: 450, y: 150 }, lastUpdated: new Date().toISOString() },
  ];

  for (const robot of robots) {
    await setDoc(doc(db, "robots", robot.id), robot);
  }

  // Seed Inventory
  const inventory = [
    { 
      sku: "SKU-101", 
      tenantId,
      name: "Robot Arm A", 
      category: "A",
      physicalStock: 150, 
      availableStock: 145,
      netStock: 140,
      optimalStock: 160,
      safetyStock: 40,
      cycleStock: 100,
      seasonalStock: 10,
      deadStock: 0,
      unitCost: 1200,
      holdingCost: 50,
      orderingCost: 200,
      healthScore: 85, 
      forecastDemand: 120,
      lastUpdated: new Date().toISOString()
    },
    { 
      sku: "SKU-102", 
      tenantId,
      name: "Conveyor Belt B", 
      category: "B",
      physicalStock: 45, 
      availableStock: 40,
      netStock: 35,
      optimalStock: 50,
      safetyStock: 15,
      cycleStock: 30,
      seasonalStock: 0,
      deadStock: 0,
      unitCost: 800,
      holdingCost: 30,
      orderingCost: 150,
      healthScore: 62, 
      forecastDemand: 30,
      lastUpdated: new Date().toISOString()
    },
    { 
      sku: "SKU-103", 
      tenantId,
      name: "Sensor Module C", 
      category: "C",
      physicalStock: 12, 
      availableStock: 10,
      netStock: 5,
      optimalStock: 100,
      safetyStock: 25,
      cycleStock: 50,
      seasonalStock: 0,
      deadStock: 5,
      unitCost: 150,
      holdingCost: 5,
      orderingCost: 50,
      healthScore: 32, 
      forecastDemand: 80,
      lastUpdated: new Date().toISOString()
    },
    { 
      sku: "SKU-104", 
      tenantId,
      name: "Battery Pack D", 
      category: "A",
      physicalStock: 80, 
      availableStock: 75,
      netStock: 70,
      optimalStock: 120,
      safetyStock: 30,
      cycleStock: 60,
      seasonalStock: 20,
      deadStock: 0,
      unitCost: 450,
      holdingCost: 15,
      orderingCost: 80,
      healthScore: 92, 
      forecastDemand: 45,
      lastUpdated: new Date().toISOString()
    },
  ];

  for (const item of inventory) {
    await setDoc(doc(db, "inventory", item.sku), item);
  }

  // Seed Batches (FIFO/LIFO)
  const batches = [
    { id: "BATCH-001", tenantId, sku: "SKU-101", quantity: 100, receivedAt: "2026-03-01T10:00:00Z", cost: 1150 },
    { id: "BATCH-002", tenantId, sku: "SKU-101", quantity: 50, receivedAt: "2026-03-15T10:00:00Z", cost: 1250 },
  ];

  for (const batch of batches) {
    await setDoc(doc(db, "batches", batch.id), batch);
  }

  console.log("Seeding complete!");
  process.exit(0);
};

seedData().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
