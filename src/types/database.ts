/**
 * Database types for the master starter.
 *
 * Hand-written to match `supabase/migrations/`. In a customer project, replace
 * this with generated types (`supabase gen types typescript`) once the schema
 * grows (see docs/DATABASE.md).
 */

export type UserRole = "owner" | "admin" | "staff" | "employee" | "customer";

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
    };
    Views: Record<never, never>;
    Functions: {
      current_user_role: {
        Args: Record<never, never>;
        Returns: UserRole;
      };
    };
    Enums: {
      user_role: UserRole;
    };
    CompositeTypes: Record<never, never>;
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
