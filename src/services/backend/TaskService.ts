export interface RobotTask {
  id: string;
  tenantId: string;
  robotId: string;
  type: "pick" | "pack" | "move" | "charge";
  status: "pending" | "in-progress" | "completed" | "failed";
  sku?: string;
  quantity?: number;
  fromLocation?: string;
  toLocation?: string;
  createdAt: string;
}

export class TaskService {
  /**
   * Assign a task to a robot.
   */
  static async assignTask(tenantId: string, robotId: string, type: "pick" | "pack" | "move" | "charge", details: Partial<RobotTask>): Promise<RobotTask> {
    const task: RobotTask = {
      id: `TSK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      tenantId,
      robotId,
      type,
      status: "pending",
      ...details,
      createdAt: new Date().toISOString(),
    };
    
    console.log(`[TASK] [${tenantId}] Assigned ${type} task to robot ${robotId}:`, task.id);
    return task;
  }

  /**
   * Orchestrate tasks for an inbound order.
   */
  static async orchestrateOrderTasks(tenantId: string, orderId: string, items: { sku: string; quantity: number }[]): Promise<RobotTask[]> {
    const tasks: RobotTask[] = [];
    
    for (const item of items) {
      // In a real system, we would find the nearest available robot
      const robotId = `Robot-${Math.floor(Math.random() * 5) + 1}`;
      const task = await this.assignTask(tenantId, robotId, "pick", {
        sku: item.sku,
        quantity: item.quantity,
        fromLocation: `Zone-${Math.floor(Math.random() * 10) + 1}`,
        toLocation: "Packing-Station-1"
      });
      tasks.push(task);
    }
    
    return tasks;
  }
}
