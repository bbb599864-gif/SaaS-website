import React, { useState } from 'react';
import { WarehouseAnalytics } from "@/components/WarehouseAnalytics";

export default function AnalyticsDemo() {
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(1);

  // Mock data for standalone demo
  const mockRobots = [
    { id: 'R-101', status: 'employed', battery: 85, warehouseId: 1 },
    { id: 'R-102', status: 'employed', battery: 92, warehouseId: 1 },
    { id: 'R-103', status: 'idle', battery: 45, warehouseId: 1 },
    { id: 'R-201', status: 'employed', battery: 78, warehouseId: 2 },
    { id: 'R-301', status: 'employed', battery: 88, warehouseId: 3 },
    { id: 'R-401', status: 'employed', battery: 95, warehouseId: 4 },
  ];

  const mockInventory = [
    { id: 'SKU-001', name: 'Hydraulic Pump', stock: 15, warehouseId: 1 },
    { id: 'SKU-002', name: 'Control Unit', stock: 45, warehouseId: 1 },
    { id: 'SKU-003', name: 'Sensor Array', stock: 8, warehouseId: 1 },
    { id: 'SKU-004', name: 'Power Module', stock: 120, warehouseId: 1 },
  ];

  const mockTasks = [
    { id: 'T-1', type: 'Picking', status: 'In Progress', warehouseId: 1 },
    { id: 'T-2', type: 'Sorting', status: 'Pending', warehouseId: 1 },
    { id: 'T-3', type: 'Dispatch', status: 'In Progress', warehouseId: 1 },
  ];

  return (
    <div className="h-screen bg-[#e8ecf0]">
      <WarehouseAnalytics 
        selectedWarehouse={selectedWarehouse}
        onWarehouseSelect={setSelectedWarehouse}
        robots={mockRobots}
        inventory={mockInventory}
        tasks={mockTasks}
        isStandalone={true}
      />
    </div>
  );
}
