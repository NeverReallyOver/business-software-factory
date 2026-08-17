/**
 * Database types for the master starter.
 *
 * Hand-written to match `supabase/migrations/`. In a customer project, replace
 * this with generated types (`supabase gen types typescript`) once the schema
 * grows (see docs/DATABASE.md).
 */

export type UserRole = "owner" | "admin" | "staff" | "employee" | "customer";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      app_settings: {
        Row: {
          id: number;
          app_name: string;
          support_email: string | null;
          updated_at: string;
        };
        Insert: {
          id?: number;
          app_name?: string;
          support_email?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: number;
          app_name?: string;
          support_email?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_invites: {
        Row: {
          email: string;
          role: UserRole;
          invited_by: string | null;
          created_at: string;
        };
        Insert: {
          email: string;
          role?: UserRole;
          invited_by?: string | null;
          created_at?: string;
        };
        Update: {
          email?: string;
          role?: UserRole;
          invited_by?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      audit_logs: {
        Row: {
          id: string;
          actor_id: string | null;
          actor_email: string | null;
          action: string;
          target_type: string | null;
          target_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_id?: string | null;
          actor_email?: string | null;
          action: string;
          target_type?: string | null;
          target_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          actor_id?: string | null;
          actor_email?: string | null;
          action?: string;
          target_type?: string | null;
          target_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: {
      current_user_role: {
        Args: Record<never, never>;
        Returns: UserRole;
      };
      log_event: {
        Args: {
          p_action: string;
          p_target_type?: string | null;
          p_target_id?: string | null;
          p_metadata?: Json;
        };
        Returns: undefined;
      };
    };
    Enums: {
      user_role: UserRole;
    };
    CompositeTypes: Record<never, never>;
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type AppSettings = Database["public"]["Tables"]["app_settings"]["Row"];
export type AuditLog = Database["public"]["Tables"]["audit_logs"]["Row"];
