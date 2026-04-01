export interface InventoryItem {
  sku: string;
  tenantId: string;
  name: string;
  category: "A" | "B" | "C";
  physicalStock: number; // Total stock physically present in the warehouse
  availableStock: number; // Physical stock minus reserved stock
  netStock: number; // Physical stock plus incoming stock minus outgoing stock
  optimalStock: number; // Target stock level
  safetyStock: number; // Buffer for demand/lead time variability
  cycleStock: number; // Stock to meet demand between replenishments
  seasonalStock: number; // Stock built up for anticipated peak demand
  recoveryStock: number; // Stock for unexpected supply chain disruptions
  deadStock: number; // Stock with no demand for a long period
  speculativeStock: number; // Stock bought in anticipation of price increases
  unitCost: number;
  purchasingCost: number;
  holdingCost: number;
  orderingCost: number;
  stockoutCost: number;
  healthScore: number;
  forecastDemand: number;
  leadTimeDays: number;
  demandVariability: number; // Standard deviation of demand
  lastUpdated: string;
}

export interface Batch {
  id: string;
  tenantId: string;
  sku: string;
  quantity: number;
  receivedAt: string;
  expiryDate?: string;
  cost: number;
  lastMovementAt?: string;
}

export class InventoryService {
  /**
   * Calculate ABC classification based on product value and demand frequency.
   * A: 70-80% of value (top items)
   * B: 15-25% of value
   * C: 5-10% of value
   */
  static calculateABC(items: InventoryItem[]): InventoryItem[] {
    const sortedByValue = [...items].sort((a, b) => (b.unitCost * b.forecastDemand) - (a.unitCost * a.forecastDemand));
    const totalValue = sortedByValue.reduce((acc, item) => acc + (item.unitCost * item.forecastDemand), 0);
    
    if (totalValue === 0) return items;

    let cumulativeValue = 0;
    return sortedByValue.map(item => {
      cumulativeValue += (item.unitCost * item.forecastDemand);
      const percentage = (cumulativeValue / totalValue) * 100;
      
      let category: "A" | "B" | "C" = "C";
      if (percentage <= 70) category = "A";
      else if (percentage <= 90) category = "B";
      
      return { ...item, category };
    });
  }

  /**
   * Calculate Economic Order Quantity (EOQ) using the Wilson model.
   * EOQ = sqrt((2 * Demand * OrderingCost) / HoldingCost)
   */
  static calculateEOQ(demand: number, orderingCost: number, holdingCost: number): number {
    if (holdingCost === 0) return 0;
    return Math.sqrt((2 * demand * orderingCost) / holdingCost);
  }

  /**
   * Calculate optimal stock levels.
   */
  static calculateOptimalStock(item: InventoryItem): number {
    // Basic formula: Safety Stock + (Cycle Stock / 2)
    return item.safetyStock + (item.cycleStock / 2);
  }

  /**
   * Calculate Net Stock.
   * Net Stock = Physical Stock + Incoming - Outgoing
   */
  static calculateNetStock(physical: number, incoming: number, outgoing: number): number {
    return physical + incoming - outgoing;
  }

  /**
   * FIFO (First In First Out) logic for retrieving batches.
   */
  static getFIFOBatches(batches: Batch[], quantityNeeded: number): { batchId: string, quantity: number }[] {
    const sortedBatches = [...batches].sort((a, b) => new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime());
    return this.allocateFromBatches(sortedBatches, quantityNeeded);
  }

  /**
   * LIFO (Last In First Out) logic for retrieving batches.
   */
  static getLIFOBatches(batches: Batch[], quantityNeeded: number): { batchId: string, quantity: number }[] {
    const sortedBatches = [...batches].sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime());
    return this.allocateFromBatches(sortedBatches, quantityNeeded);
  }

  private static allocateFromBatches(sortedBatches: Batch[], quantityNeeded: number): { batchId: string, quantity: number }[] {
    const allocation: { batchId: string, quantity: number }[] = [];
    let remaining = quantityNeeded;

    for (const batch of sortedBatches) {
      if (remaining <= 0) break;
      const take = Math.min(batch.quantity, remaining);
      allocation.push({ batchId: batch.id, quantity: take });
      remaining -= take;
    }

    return allocation;
  }

  /**
   * Calculate Safety Stock based on service level and lead time variability.
   * Safety Stock = Z * sqrt(LeadTime * VarDemand + Demand^2 * VarLeadTime)
   */
  static calculateSafetyStock(avgDemand: number, leadTime: number, demandVariability: number, serviceLevel: number = 1.65): number {
    // 1.65 corresponds to a 95% service level
    // Simplified formula assuming lead time variability is negligible for this prototype
    return Math.ceil(serviceLevel * Math.sqrt(leadTime) * demandVariability);
  }

  /**
   * Calculate Reorder Point (ROP).
   * ROP = (Demand per day * Lead time in days) + Safety Stock
   */
  static calculateReorderPoint(dailyDemand: number, leadTimeDays: number, safetyStock: number): number {
    return (dailyDemand * leadTimeDays) + safetyStock;
  }

  /**
   * Just-In-Time (JIT) Analysis.
   * Determines if an item is suitable for JIT based on demand stability and lead time.
   */
  static analyzeJIT(item: InventoryItem): { suitable: boolean, reason: string } {
    const demandStability = item.demandVariability / (item.forecastDemand / 30) < 0.2; // CV < 20%
    const lowLeadTime = item.leadTimeDays <= 3;

    if (demandStability && lowLeadTime) {
      return { suitable: true, reason: "High demand stability and short lead times make this SKU ideal for JIT." };
    }
    if (!demandStability) {
      return { suitable: false, reason: "Demand variability is too high for reliable JIT operations." };
    }
    return { suitable: false, reason: "Lead times are too long to support a JIT replenishment model." };
  }

  /**
   * Calculate Dead Stock.
   * Items with no movement for more than 90 days.
   */
  static identifyDeadStock(batches: Batch[]): number {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    
    return batches
      .filter(b => b.lastMovementAt && new Date(b.lastMovementAt) < ninetyDaysAgo)
      .reduce((acc, b) => acc + b.quantity, 0);
  }
}
