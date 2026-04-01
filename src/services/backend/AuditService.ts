import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface AuditLog {
  tenantId: string;
  userId: string;
  action: string;
  details: any;
  timestamp: any;
}

export class AuditService {
  /**
   * Log a critical operation to the audit log in Firestore.
   */
  static async logAction(tenantId: string, userId: string, action: string, details: any) {
    try {
      console.log(`[AUDIT] [${tenantId}] User ${userId}: ${action}`, details);
      await addDoc(collection(db, "audit_logs"), {
        tenantId,
        userId,
        action,
        details,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error writing to audit log:", error);
    }
  }
}
