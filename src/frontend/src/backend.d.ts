import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Finding {
    title: string;
    clauseExcerpt: string;
    explanation: string;
    category: FindingCategory;
}
export interface Audit {
    id: bigint;
    status: AuditStatus;
    timestamp: Time;
    leaseName: string;
}
export interface UserProfile {
    displayName: string;
    plan: string;
}
export enum AuditStatus {
    pending = "pending",
    scanning = "scanning",
    complete = "complete"
}
export enum FindingCategory {
    hidden_cost = "hidden_cost",
    tenant_responsibility = "tenant_responsibility",
    illegal_clause = "illegal_clause"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAudit(leaseName: string): Promise<bigint>;
    getAuditFindings(auditId: bigint): Promise<Array<Finding>>;
    getAuditHistory(): Promise<Array<Audit>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    init(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateUserPlan(plan: string): Promise<void>;
}
