export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      app_user_profile: {
        Row: {
          created_at: string
          default_functloc_id: string | null
          employee_id: string | null
          full_name: string | null
          is_active: boolean
          position_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          default_functloc_id?: string | null
          employee_id?: string | null
          full_name?: string | null
          is_active?: boolean
          position_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          default_functloc_id?: string | null
          employee_id?: string | null
          full_name?: string | null
          is_active?: boolean
          position_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      map_functloc_channel: {
        Row: {
          channel_id: string
          created_at: string
          functloc_id: string
          is_active: boolean
          mapping_id: string
          updated_at: string
        }
        Insert: {
          channel_id: string
          created_at?: string
          functloc_id: string
          is_active?: boolean
          mapping_id?: string
          updated_at?: string
        }
        Update: {
          channel_id?: string
          created_at?: string
          functloc_id?: string
          is_active?: boolean
          mapping_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_map_functloc_channel_channel"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "mst_unit_channel"
            referencedColumns: ["channel_id"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "mst_functloc"
            referencedColumns: ["functloc_id"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_ultg"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_master_lokasi"
            referencedColumns: ["IdFunctloc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_map_functloc_channel_functloc"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["ultg_flc"]
          },
        ]
      }
      map_transformer_feeder_bay: {
        Row: {
          created_at: string
          feeder_bay_functloc_id: string
          is_active: boolean
          notes: string | null
          source_batch_id: string | null
          source_system: string
          transformer_bay_map_id: string
          transformer_id: string
          updated_at: string
          valid_from: string
          valid_to: string | null
        }
        Insert: {
          created_at?: string
          feeder_bay_functloc_id: string
          is_active?: boolean
          notes?: string | null
          source_batch_id?: string | null
          source_system?: string
          transformer_bay_map_id?: string
          transformer_id: string
          updated_at?: string
          valid_from?: string
          valid_to?: string | null
        }
        Update: {
          created_at?: string
          feeder_bay_functloc_id?: string
          is_active?: boolean
          notes?: string | null
          source_batch_id?: string | null
          source_system?: string
          transformer_bay_map_id?: string
          transformer_id?: string
          updated_at?: string
          valid_from?: string
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "mst_functloc"
            referencedColumns: ["functloc_id"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_ultg"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_master_lokasi"
            referencedColumns: ["IdFunctloc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_transformer_id_fkey"
            columns: ["transformer_id"]
            isOneToOne: false
            referencedRelation: "mst_transformer"
            referencedColumns: ["transformer_id"]
          },
        ]
      }
      map_user_telegram_account: {
        Row: {
          is_active: boolean
          linked_at: string
          telegram_display_name: string | null
          telegram_user_id: number
          telegram_username: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          is_active?: boolean
          linked_at?: string
          telegram_display_name?: string | null
          telegram_user_id: number
          telegram_username?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          is_active?: boolean
          linked_at?: string
          telegram_display_name?: string | null
          telegram_user_id?: number
          telegram_username?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "map_user_telegram_account_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "app_user_profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
      mst_functloc: {
        Row: {
          address: string | null
          altitude: number | null
          baygroup_code: string | null
          bc_flc: string | null
          city: string | null
          created_at: string
          description: string | null
          function_code: string | null
          functloc_id: string
          gi_flc: string | null
          grouplokasi_code: string | null
          latitude: number | null
          location_name: string
          longitude: number | null
          nlevel: number | null
          non_operational_date: string | null
          operational_date: string | null
          ownership: string | null
          plant_id: string | null
          plant_section: string | null
          postal_code: string | null
          region_code: string | null
          short_name: string | null
          slo_date: string | null
          slo_number: string | null
          status_code: string | null
          sup_functloc_id: string | null
          unit_code: string | null
          updated_at: string
          voltage_code: string | null
          workcenter: string | null
        }
        Insert: {
          address?: string | null
          altitude?: number | null
          baygroup_code?: string | null
          bc_flc?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          function_code?: string | null
          functloc_id: string
          gi_flc?: string | null
          grouplokasi_code?: string | null
          latitude?: number | null
          location_name: string
          longitude?: number | null
          nlevel?: number | null
          non_operational_date?: string | null
          operational_date?: string | null
          ownership?: string | null
          plant_id?: string | null
          plant_section?: string | null
          postal_code?: string | null
          region_code?: string | null
          short_name?: string | null
          slo_date?: string | null
          slo_number?: string | null
          status_code?: string | null
          sup_functloc_id?: string | null
          unit_code?: string | null
          updated_at?: string
          voltage_code?: string | null
          workcenter?: string | null
        }
        Update: {
          address?: string | null
          altitude?: number | null
          baygroup_code?: string | null
          bc_flc?: string | null
          city?: string | null
          created_at?: string
          description?: string | null
          function_code?: string | null
          functloc_id?: string
          gi_flc?: string | null
          grouplokasi_code?: string | null
          latitude?: number | null
          location_name?: string
          longitude?: number | null
          nlevel?: number | null
          non_operational_date?: string | null
          operational_date?: string | null
          ownership?: string | null
          plant_id?: string | null
          plant_section?: string | null
          postal_code?: string | null
          region_code?: string | null
          short_name?: string | null
          slo_date?: string | null
          slo_number?: string | null
          status_code?: string | null
          sup_functloc_id?: string | null
          unit_code?: string | null
          updated_at?: string
          voltage_code?: string | null
          workcenter?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_functloc_baygroup"
            columns: ["baygroup_code"]
            isOneToOne: false
            referencedRelation: "ref_baygroup"
            referencedColumns: ["baygroup_code"]
          },
          {
            foreignKeyName: "fk_functloc_bc_flc"
            columns: ["bc_flc"]
            isOneToOne: false
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["functloc_id"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_function"
            columns: ["function_code"]
            isOneToOne: false
            referencedRelation: "ref_function"
            referencedColumns: ["function_code"]
          },
          {
            foreignKeyName: "fk_functloc_grouplokasi"
            columns: ["grouplokasi_code"]
            isOneToOne: false
            referencedRelation: "ref_grouplokasi"
            referencedColumns: ["grouplokasi_code"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "mst_functloc"
            referencedColumns: ["functloc_id"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_ultg"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_master_lokasi"
            referencedColumns: ["IdFunctloc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_functloc_parent"
            columns: ["sup_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_functloc_region"
            columns: ["region_code"]
            isOneToOne: false
            referencedRelation: "ref_region"
            referencedColumns: ["region_code"]
          },
          {
            foreignKeyName: "fk_functloc_status"
            columns: ["status_code"]
            isOneToOne: false
            referencedRelation: "ref_gi_status"
            referencedColumns: ["gi_status_code"]
          },
          {
            foreignKeyName: "fk_functloc_voltage"
            columns: ["voltage_code"]
            isOneToOne: false
            referencedRelation: "ref_voltage"
            referencedColumns: ["voltage_code"]
          },
        ]
      }
      mst_penyulang: {
        Row: {
          alias: string | null
          bay_functloc_id: string
          created_at: string
          description: string | null
          is_active: boolean
          is_manuverable: boolean
          notes: string | null
          owner_unit_type_code: string | null
          penyulang_code: string
          penyulang_id: string
          penyulang_name: string
          short_name: string | null
          status_code: string | null
          ulp_code: string | null
          up3_code: string | null
          updated_at: string
          wilayah_penyaluran: string | null
        }
        Insert: {
          alias?: string | null
          bay_functloc_id: string
          created_at?: string
          description?: string | null
          is_active?: boolean
          is_manuverable?: boolean
          notes?: string | null
          owner_unit_type_code?: string | null
          penyulang_code: string
          penyulang_id?: string
          penyulang_name: string
          short_name?: string | null
          status_code?: string | null
          ulp_code?: string | null
          up3_code?: string | null
          updated_at?: string
          wilayah_penyaluran?: string | null
        }
        Update: {
          alias?: string | null
          bay_functloc_id?: string
          created_at?: string
          description?: string | null
          is_active?: boolean
          is_manuverable?: boolean
          notes?: string | null
          owner_unit_type_code?: string | null
          penyulang_code?: string
          penyulang_id?: string
          penyulang_name?: string
          short_name?: string | null
          status_code?: string | null
          ulp_code?: string | null
          up3_code?: string | null
          updated_at?: string
          wilayah_penyaluran?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "mst_functloc"
            referencedColumns: ["functloc_id"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_ultg"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_master_lokasi"
            referencedColumns: ["IdFunctloc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_bay"
            columns: ["bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "fk_penyulang_owner_unit_type"
            columns: ["owner_unit_type_code"]
            isOneToOne: false
            referencedRelation: "ref_unit_type"
            referencedColumns: ["unit_type_code"]
          },
          {
            foreignKeyName: "fk_penyulang_status"
            columns: ["status_code"]
            isOneToOne: false
            referencedRelation: "ref_equipment_status"
            referencedColumns: ["status_code"]
          },
        ]
      }
      mst_transformer: {
        Row: {
          axle_distance_cm: number | null
          bil_primary_kv: number | null
          bil_secondary_kv: number | null
          bil_tertiary_kv: number | null
          contract_number: string | null
          cooler_count: number | null
          cooling_pump_count: number | null
          cooling_type: string | null
          core_coil_weight_kg: number | null
          country: string | null
          created_at: string
          eq_number: string | null
          equipment_number: string | null
          equipment_type_code: string | null
          fan_group_count: number | null
          functloc_id: string
          height_cm: number | null
          impedance_percent: number | null
          initial_operational_date: string | null
          insulation_class: string | null
          insulation_paper_type: string | null
          is_active: boolean
          last_synced_at: string | null
          length_cm: number | null
          main_fitting_weight_kg: number | null
          manufacture_year: number | null
          manufacturer: string | null
          manufacturer_serial_number: string | null
          max_primary_kv: number | null
          max_secondary_kv: number | null
          max_tertiary_kv: number | null
          non_operational_date: string | null
          notes: string | null
          oil_temperature_rise_c: number | null
          oil_type: string | null
          oil_type_detail: string | null
          oil_weight_kg: number | null
          operating_voltage_kv: number | null
          operating_voltage_text: string | null
          operational_date: string | null
          phase_code: string | null
          placement: string | null
          power_frequency_withstand_primary_kv: number | null
          power_frequency_withstand_secondary_kv: number | null
          power_frequency_withstand_tertiary_kv: number | null
          rated_power_2_mva: number | null
          rated_power_3_mva: number | null
          rated_power_4_mva: number | null
          rated_power_mva: number | null
          rated_primary_current_a: number | null
          rated_primary_kv: number | null
          rated_secondary_current_a: number | null
          rated_secondary_kv: number | null
          rated_tertiary_current_a: number | null
          rated_tertiary_kv: number | null
          serial_id: string | null
          short_circuit_time_s: number | null
          sil_value: string | null
          source_asset_id: number | null
          source_batch_id: string | null
          source_bay_id: string | null
          source_cons_type: string | null
          source_created_at: string | null
          source_description: string | null
          source_modified_at: string | null
          source_raw: Json | null
          source_system: string
          standard_code: string | null
          status_code: string | null
          tap_count: number | null
          tap_voltage_delta: number | null
          tap_voltage_high_kv: number | null
          tap_voltage_low_kv: number | null
          tap_voltage_normal_kv: number | null
          techidentno: string
          temperature_limit_c: number | null
          total_weight_kg: number | null
          transformer_id: string
          transformer_kind: string | null
          transformer_type: string | null
          updated_at: string
          vector_group: string | null
          wheel_distance_cm: number | null
          width_cm: number | null
          winding_temperature_rise_c: number | null
        }
        Insert: {
          axle_distance_cm?: number | null
          bil_primary_kv?: number | null
          bil_secondary_kv?: number | null
          bil_tertiary_kv?: number | null
          contract_number?: string | null
          cooler_count?: number | null
          cooling_pump_count?: number | null
          cooling_type?: string | null
          core_coil_weight_kg?: number | null
          country?: string | null
          created_at?: string
          eq_number?: string | null
          equipment_number?: string | null
          equipment_type_code?: string | null
          fan_group_count?: number | null
          functloc_id: string
          height_cm?: number | null
          impedance_percent?: number | null
          initial_operational_date?: string | null
          insulation_class?: string | null
          insulation_paper_type?: string | null
          is_active?: boolean
          last_synced_at?: string | null
          length_cm?: number | null
          main_fitting_weight_kg?: number | null
          manufacture_year?: number | null
          manufacturer?: string | null
          manufacturer_serial_number?: string | null
          max_primary_kv?: number | null
          max_secondary_kv?: number | null
          max_tertiary_kv?: number | null
          non_operational_date?: string | null
          notes?: string | null
          oil_temperature_rise_c?: number | null
          oil_type?: string | null
          oil_type_detail?: string | null
          oil_weight_kg?: number | null
          operating_voltage_kv?: number | null
          operating_voltage_text?: string | null
          operational_date?: string | null
          phase_code?: string | null
          placement?: string | null
          power_frequency_withstand_primary_kv?: number | null
          power_frequency_withstand_secondary_kv?: number | null
          power_frequency_withstand_tertiary_kv?: number | null
          rated_power_2_mva?: number | null
          rated_power_3_mva?: number | null
          rated_power_4_mva?: number | null
          rated_power_mva?: number | null
          rated_primary_current_a?: number | null
          rated_primary_kv?: number | null
          rated_secondary_current_a?: number | null
          rated_secondary_kv?: number | null
          rated_tertiary_current_a?: number | null
          rated_tertiary_kv?: number | null
          serial_id?: string | null
          short_circuit_time_s?: number | null
          sil_value?: string | null
          source_asset_id?: number | null
          source_batch_id?: string | null
          source_bay_id?: string | null
          source_cons_type?: string | null
          source_created_at?: string | null
          source_description?: string | null
          source_modified_at?: string | null
          source_raw?: Json | null
          source_system?: string
          standard_code?: string | null
          status_code?: string | null
          tap_count?: number | null
          tap_voltage_delta?: number | null
          tap_voltage_high_kv?: number | null
          tap_voltage_low_kv?: number | null
          tap_voltage_normal_kv?: number | null
          techidentno: string
          temperature_limit_c?: number | null
          total_weight_kg?: number | null
          transformer_id?: string
          transformer_kind?: string | null
          transformer_type?: string | null
          updated_at?: string
          vector_group?: string | null
          wheel_distance_cm?: number | null
          width_cm?: number | null
          winding_temperature_rise_c?: number | null
        }
        Update: {
          axle_distance_cm?: number | null
          bil_primary_kv?: number | null
          bil_secondary_kv?: number | null
          bil_tertiary_kv?: number | null
          contract_number?: string | null
          cooler_count?: number | null
          cooling_pump_count?: number | null
          cooling_type?: string | null
          core_coil_weight_kg?: number | null
          country?: string | null
          created_at?: string
          eq_number?: string | null
          equipment_number?: string | null
          equipment_type_code?: string | null
          fan_group_count?: number | null
          functloc_id?: string
          height_cm?: number | null
          impedance_percent?: number | null
          initial_operational_date?: string | null
          insulation_class?: string | null
          insulation_paper_type?: string | null
          is_active?: boolean
          last_synced_at?: string | null
          length_cm?: number | null
          main_fitting_weight_kg?: number | null
          manufacture_year?: number | null
          manufacturer?: string | null
          manufacturer_serial_number?: string | null
          max_primary_kv?: number | null
          max_secondary_kv?: number | null
          max_tertiary_kv?: number | null
          non_operational_date?: string | null
          notes?: string | null
          oil_temperature_rise_c?: number | null
          oil_type?: string | null
          oil_type_detail?: string | null
          oil_weight_kg?: number | null
          operating_voltage_kv?: number | null
          operating_voltage_text?: string | null
          operational_date?: string | null
          phase_code?: string | null
          placement?: string | null
          power_frequency_withstand_primary_kv?: number | null
          power_frequency_withstand_secondary_kv?: number | null
          power_frequency_withstand_tertiary_kv?: number | null
          rated_power_2_mva?: number | null
          rated_power_3_mva?: number | null
          rated_power_4_mva?: number | null
          rated_power_mva?: number | null
          rated_primary_current_a?: number | null
          rated_primary_kv?: number | null
          rated_secondary_current_a?: number | null
          rated_secondary_kv?: number | null
          rated_tertiary_current_a?: number | null
          rated_tertiary_kv?: number | null
          serial_id?: string | null
          short_circuit_time_s?: number | null
          sil_value?: string | null
          source_asset_id?: number | null
          source_batch_id?: string | null
          source_bay_id?: string | null
          source_cons_type?: string | null
          source_created_at?: string | null
          source_description?: string | null
          source_modified_at?: string | null
          source_raw?: Json | null
          source_system?: string
          standard_code?: string | null
          status_code?: string | null
          tap_count?: number | null
          tap_voltage_delta?: number | null
          tap_voltage_high_kv?: number | null
          tap_voltage_low_kv?: number | null
          tap_voltage_normal_kv?: number | null
          techidentno?: string
          temperature_limit_c?: number | null
          total_weight_kg?: number | null
          transformer_id?: string
          transformer_kind?: string | null
          transformer_type?: string | null
          updated_at?: string
          vector_group?: string | null
          wheel_distance_cm?: number | null
          width_cm?: number | null
          winding_temperature_rise_c?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mst_transformer_equipment_type_code_fkey"
            columns: ["equipment_type_code"]
            isOneToOne: false
            referencedRelation: "ref_equipment_type"
            referencedColumns: ["equipment_type_code"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "mst_functloc"
            referencedColumns: ["functloc_id"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_ultg"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_master_lokasi"
            referencedColumns: ["IdFunctloc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_status_code_fkey"
            columns: ["status_code"]
            isOneToOne: false
            referencedRelation: "ref_equipment_status"
            referencedColumns: ["status_code"]
          },
        ]
      }
      mst_unit_channel: {
        Row: {
          channel_id: string
          channel_type: string
          channel_value: string
          created_at: string
          external_id: string | null
          is_active: boolean
          is_primary: boolean
          notes: string | null
          updated_at: string
        }
        Insert: {
          channel_id?: string
          channel_type: string
          channel_value: string
          created_at?: string
          external_id?: string | null
          is_active?: boolean
          is_primary?: boolean
          notes?: string | null
          updated_at?: string
        }
        Update: {
          channel_id?: string
          channel_type?: string
          channel_value?: string
          created_at?: string
          external_id?: string | null
          is_active?: boolean
          is_primary?: boolean
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      opg_access_role: {
        Row: {
          can_be_primary: boolean
          created_at: string
          created_by: string | null
          description: string | null
          is_active: boolean
          is_business_role: boolean
          is_system_role: boolean
          role_code: string
          role_id: string
          role_level: number
          role_name: string
          scope_level: string | null
          sort_order: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          can_be_primary?: boolean
          created_at?: string
          created_by?: string | null
          description?: string | null
          is_active?: boolean
          is_business_role?: boolean
          is_system_role?: boolean
          role_code: string
          role_id?: string
          role_level?: number
          role_name: string
          scope_level?: string | null
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          can_be_primary?: boolean
          created_at?: string
          created_by?: string | null
          description?: string | null
          is_active?: boolean
          is_business_role?: boolean
          is_system_role?: boolean
          role_code?: string
          role_id?: string
          role_level?: number
          role_name?: string
          scope_level?: string | null
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      opg_app_module: {
        Row: {
          allowed_scope_levels: string[]
          created_at: string
          created_by: string | null
          description: string | null
          icon_key: string | null
          is_active: boolean
          is_navigation: boolean
          is_system_module: boolean
          module_code: string
          module_group: string
          module_id: string
          module_name: string
          parent_module_id: string | null
          requires_scope: boolean
          route_path: string | null
          sort_order: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          allowed_scope_levels?: string[]
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon_key?: string | null
          is_active?: boolean
          is_navigation?: boolean
          is_system_module?: boolean
          module_code: string
          module_group: string
          module_id?: string
          module_name: string
          parent_module_id?: string | null
          requires_scope?: boolean
          route_path?: string | null
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          allowed_scope_levels?: string[]
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon_key?: string | null
          is_active?: boolean
          is_navigation?: boolean
          is_system_module?: boolean
          module_code?: string
          module_group?: string
          module_id?: string
          module_name?: string
          parent_module_id?: string | null
          requires_scope?: boolean
          route_path?: string | null
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opg_app_module_parent_module_id_fkey"
            columns: ["parent_module_id"]
            isOneToOne: false
            referencedRelation: "opg_app_module"
            referencedColumns: ["module_id"]
          },
        ]
      }
      opg_approval_rule: {
        Row: {
          action_code: string
          approval_rule_id: string
          approver_role_id: string
          approver_scope_level: string
          created_at: string
          created_by: string | null
          description: string | null
          explicit_scope_functloc_id: string | null
          is_active: boolean
          module_code: string
          priority: number
          scope_relation: string
          source_scope_level: string
          updated_at: string
          updated_by: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          action_code?: string
          approval_rule_id?: string
          approver_role_id: string
          approver_scope_level: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          explicit_scope_functloc_id?: string | null
          is_active?: boolean
          module_code: string
          priority?: number
          scope_relation: string
          source_scope_level: string
          updated_at?: string
          updated_by?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          action_code?: string
          approval_rule_id?: string
          approver_role_id?: string
          approver_scope_level?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          explicit_scope_functloc_id?: string | null
          is_active?: boolean
          module_code?: string
          priority?: number
          scope_relation?: string
          source_scope_level?: string
          updated_at?: string
          updated_by?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_opg_approval_rule_module"
            columns: ["module_code"]
            isOneToOne: false
            referencedRelation: "opg_app_module"
            referencedColumns: ["module_code"]
          },
          {
            foreignKeyName: "opg_approval_rule_approver_role_id_fkey"
            columns: ["approver_role_id"]
            isOneToOne: false
            referencedRelation: "opg_access_role"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "mst_functloc"
            referencedColumns: ["functloc_id"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_ultg"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_master_lokasi"
            referencedColumns: ["IdFunctloc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_approval_rule_explicit_scope_functloc_id_fkey"
            columns: ["explicit_scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["ultg_flc"]
          },
        ]
      }
      opg_job: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          is_active: boolean
          job_code: string
          job_id: string
          job_level: number | null
          job_name: string
          short_name: string | null
          sort_order: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          is_active?: boolean
          job_code: string
          job_id?: string
          job_level?: number | null
          job_name: string
          short_name?: string | null
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          is_active?: boolean
          job_code?: string
          job_id?: string
          job_level?: number | null
          job_name?: string
          short_name?: string | null
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      opg_organization: {
        Row: {
          created_at: string
          created_by: string | null
          is_active: boolean
          organization_code: string
          organization_id: string
          organization_name: string
          organization_type: string
          parent_organization_id: string | null
          short_name: string | null
          sort_order: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          is_active?: boolean
          organization_code: string
          organization_id?: string
          organization_name: string
          organization_type: string
          parent_organization_id?: string | null
          short_name?: string | null
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          is_active?: boolean
          organization_code?: string
          organization_id?: string
          organization_name?: string
          organization_type?: string
          parent_organization_id?: string | null
          short_name?: string | null
          sort_order?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opg_organization_parent_organization_id_fkey"
            columns: ["parent_organization_id"]
            isOneToOne: false
            referencedRelation: "opg_organization"
            referencedColumns: ["organization_id"]
          },
        ]
      }
      opg_role_module_access: {
        Row: {
          can_approve: boolean
          can_create: boolean
          can_export: boolean
          can_manage: boolean
          can_submit: boolean
          can_update: boolean
          can_verify: boolean
          can_view: boolean
          created_at: string
          created_by: string | null
          is_active: boolean
          module_id: string
          notes: string | null
          role_id: string
          role_module_access_id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          can_approve?: boolean
          can_create?: boolean
          can_export?: boolean
          can_manage?: boolean
          can_submit?: boolean
          can_update?: boolean
          can_verify?: boolean
          can_view?: boolean
          created_at?: string
          created_by?: string | null
          is_active?: boolean
          module_id: string
          notes?: string | null
          role_id: string
          role_module_access_id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          can_approve?: boolean
          can_create?: boolean
          can_export?: boolean
          can_manage?: boolean
          can_submit?: boolean
          can_update?: boolean
          can_verify?: boolean
          can_view?: boolean
          created_at?: string
          created_by?: string | null
          is_active?: boolean
          module_id?: string
          notes?: string | null
          role_id?: string
          role_module_access_id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opg_role_module_access_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "opg_app_module"
            referencedColumns: ["module_id"]
          },
          {
            foreignKeyName: "opg_role_module_access_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "opg_access_role"
            referencedColumns: ["role_id"]
          },
        ]
      }
      opg_user_preference: {
        Row: {
          created_at: string
          default_page_size: number
          locale: string
          preferences: Json
          sidebar_collapsed: boolean
          theme: string
          timezone: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          default_page_size?: number
          locale?: string
          preferences?: Json
          sidebar_collapsed?: boolean
          theme?: string
          timezone?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          default_page_size?: number
          locale?: string
          preferences?: Json
          sidebar_collapsed?: boolean
          theme?: string
          timezone?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      opg_user_profile: {
        Row: {
          avatar_path: string | null
          created_at: string
          created_by: string | null
          default_functloc_id: string | null
          display_name: string | null
          employee_id: string | null
          full_name: string
          job_id: string | null
          organization_id: string | null
          phone_number: string | null
          status_code: string
          telegram_user_id: number | null
          telegram_username: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          user_type_code: string
        }
        Insert: {
          avatar_path?: string | null
          created_at?: string
          created_by?: string | null
          default_functloc_id?: string | null
          display_name?: string | null
          employee_id?: string | null
          full_name: string
          job_id?: string | null
          organization_id?: string | null
          phone_number?: string | null
          status_code?: string
          telegram_user_id?: number | null
          telegram_username?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id: string
          user_type_code?: string
        }
        Update: {
          avatar_path?: string | null
          created_at?: string
          created_by?: string | null
          default_functloc_id?: string | null
          display_name?: string | null
          employee_id?: string | null
          full_name?: string
          job_id?: string | null
          organization_id?: string | null
          phone_number?: string | null
          status_code?: string
          telegram_user_id?: number | null
          telegram_username?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          user_type_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "mst_functloc"
            referencedColumns: ["functloc_id"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_ultg"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_master_lokasi"
            referencedColumns: ["IdFunctloc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_default_functloc_id_fkey"
            columns: ["default_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_profile_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "opg_job"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "opg_user_profile_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "opg_organization"
            referencedColumns: ["organization_id"]
          },
        ]
      }
      opg_user_role_assignment: {
        Row: {
          assignment_id: string
          created_at: string
          created_by: string | null
          include_children: boolean
          is_active: boolean
          is_primary: boolean
          notes: string | null
          role_id: string
          scope_functloc_id: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          assignment_id?: string
          created_at?: string
          created_by?: string | null
          include_children?: boolean
          is_active?: boolean
          is_primary?: boolean
          notes?: string | null
          role_id: string
          scope_functloc_id?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          assignment_id?: string
          created_at?: string
          created_by?: string | null
          include_children?: boolean
          is_active?: boolean
          is_primary?: boolean
          notes?: string | null
          role_id?: string
          scope_functloc_id?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opg_user_role_assignment_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "opg_access_role"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "mst_functloc"
            referencedColumns: ["functloc_id"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_ultg"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_master_lokasi"
            referencedColumns: ["IdFunctloc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "opg_user_role_assignment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "opg_user_profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
      ref_access_role: {
        Row: {
          created_at: string
          description: string | null
          is_active: boolean
          role_code: string
          role_level: number
          role_name: string
          role_type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          is_active?: boolean
          role_code: string
          role_level?: number
          role_name: string
          role_type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          is_active?: boolean
          role_code?: string
          role_level?: number
          role_name?: string
          role_type?: string
        }
        Relationships: []
      }
      ref_baygroup: {
        Row: {
          baygroup_code: string
          created_at: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          baygroup_code: string
          created_at?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          baygroup_code?: string
          created_at?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      ref_company: {
        Row: {
          alias: string | null
          company_code: string
          created_at: string
          is_active: boolean
          name: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          alias?: string | null
          company_code: string
          created_at?: string
          is_active?: boolean
          name: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          alias?: string | null
          company_code?: string
          created_at?: string
          is_active?: boolean
          name?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      ref_equipment_status: {
        Row: {
          asset_condition: string | null
          asset_status: string | null
          asset_type: string | null
          created_at: string
          description: string
          is_active: boolean
          status_code: string
          updated_at: string
        }
        Insert: {
          asset_condition?: string | null
          asset_status?: string | null
          asset_type?: string | null
          created_at?: string
          description: string
          is_active?: boolean
          status_code: string
          updated_at?: string
        }
        Update: {
          asset_condition?: string | null
          asset_status?: string | null
          asset_type?: string | null
          created_at?: string
          description?: string
          is_active?: boolean
          status_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      ref_equipment_type: {
        Row: {
          alias: string | null
          asset_class: string | null
          asset_type: string | null
          asset_type1: string | null
          asset_type2: string | null
          class_name: string | null
          created_at: string
          desk_constype: string | null
          desk_equ_pola: string | null
          desk_material: string | null
          equipment_type_code: string
          flag: string | null
          is_active: boolean
          mobile: string | null
          name: string
          object_type: string | null
          short_name: string | null
          updated_at: string
          wc: string | null
        }
        Insert: {
          alias?: string | null
          asset_class?: string | null
          asset_type?: string | null
          asset_type1?: string | null
          asset_type2?: string | null
          class_name?: string | null
          created_at?: string
          desk_constype?: string | null
          desk_equ_pola?: string | null
          desk_material?: string | null
          equipment_type_code: string
          flag?: string | null
          is_active?: boolean
          mobile?: string | null
          name: string
          object_type?: string | null
          short_name?: string | null
          updated_at?: string
          wc?: string | null
        }
        Update: {
          alias?: string | null
          asset_class?: string | null
          asset_type?: string | null
          asset_type1?: string | null
          asset_type2?: string | null
          class_name?: string | null
          created_at?: string
          desk_constype?: string | null
          desk_equ_pola?: string | null
          desk_material?: string | null
          equipment_type_code?: string
          flag?: string | null
          is_active?: boolean
          mobile?: string | null
          name?: string
          object_type?: string | null
          short_name?: string | null
          updated_at?: string
          wc?: string | null
        }
        Relationships: []
      }
      ref_event_record_status: {
        Row: {
          created_at: string
          description: string
          is_active: boolean
          is_final: boolean
          record_status_code: string
          sequence_no: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          is_active?: boolean
          is_final?: boolean
          record_status_code: string
          sequence_no?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          is_active?: boolean
          is_final?: boolean
          record_status_code?: string
          sequence_no?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      ref_event_type: {
        Row: {
          created_at: string
          description: string
          event_type_code: string
          is_active: boolean
          sequence_no: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          event_type_code: string
          is_active?: boolean
          sequence_no?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          event_type_code?: string
          is_active?: boolean
          sequence_no?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      ref_flc: {
        Row: {
          created_at: string
          flc_id: string
          function_code: string | null
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          flc_id: string
          function_code?: string | null
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          flc_id?: string
          function_code?: string | null
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_ref_flc_function"
            columns: ["function_code"]
            isOneToOne: false
            referencedRelation: "ref_function"
            referencedColumns: ["function_code"]
          },
        ]
      }
      ref_function: {
        Row: {
          asset_code: string | null
          created_at: string
          description: string
          function: string | null
          function_code: string
          initial: string | null
          is_active: boolean
          nlevel: number | null
          sublevel: number | null
          unit: number | null
          updated_at: string
        }
        Insert: {
          asset_code?: string | null
          created_at?: string
          description: string
          function?: string | null
          function_code: string
          initial?: string | null
          is_active?: boolean
          nlevel?: number | null
          sublevel?: number | null
          unit?: number | null
          updated_at?: string
        }
        Update: {
          asset_code?: string | null
          created_at?: string
          description?: string
          function?: string | null
          function_code?: string
          initial?: string | null
          is_active?: boolean
          nlevel?: number | null
          sublevel?: number | null
          unit?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      ref_gangguan_annunciator: {
        Row: {
          annunciator_code: string
          created_at: string
          description: string
          is_active: boolean
          sequence_no: number | null
          updated_at: string
        }
        Insert: {
          annunciator_code: string
          created_at?: string
          description: string
          is_active?: boolean
          sequence_no?: number | null
          updated_at?: string
        }
        Update: {
          annunciator_code?: string
          created_at?: string
          description?: string
          is_active?: boolean
          sequence_no?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      ref_gangguan_cause: {
        Row: {
          cause_code: string
          created_at: string
          description: string
          is_active: boolean
          sequence_no: number | null
          updated_at: string
        }
        Insert: {
          cause_code: string
          created_at?: string
          description: string
          is_active?: boolean
          sequence_no?: number | null
          updated_at?: string
        }
        Update: {
          cause_code?: string
          created_at?: string
          description?: string
          is_active?: boolean
          sequence_no?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      ref_gangguan_cause_rule: {
        Row: {
          cause_code: string
          is_active: boolean
          pic_code: string | null
          rule_id: string
          sequence_no: number | null
          status_code: string
        }
        Insert: {
          cause_code: string
          is_active?: boolean
          pic_code?: string | null
          rule_id?: string
          sequence_no?: number | null
          status_code: string
        }
        Update: {
          cause_code?: string
          is_active?: boolean
          pic_code?: string | null
          rule_id?: string
          sequence_no?: number | null
          status_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_cause_rule_cause"
            columns: ["cause_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_cause"
            referencedColumns: ["cause_code"]
          },
          {
            foreignKeyName: "fk_cause_rule_pic"
            columns: ["pic_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_pic"
            referencedColumns: ["pic_code"]
          },
          {
            foreignKeyName: "fk_cause_rule_status"
            columns: ["status_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_pmt_status"
            referencedColumns: ["status_code"]
          },
        ]
      }
      ref_gangguan_indikasi: {
        Row: {
          created_at: string
          description: string
          indikasi_code: string
          is_active: boolean
          sequence_no: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          indikasi_code: string
          is_active?: boolean
          sequence_no?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          indikasi_code?: string
          is_active?: boolean
          sequence_no?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      ref_gangguan_pic: {
        Row: {
          created_at: string
          description: string
          is_active: boolean
          pic_code: string
          sequence_no: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          is_active?: boolean
          pic_code: string
          sequence_no?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          is_active?: boolean
          pic_code?: string
          sequence_no?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      ref_gangguan_pmt_status: {
        Row: {
          created_at: string
          description: string
          is_active: boolean
          requires_pic: boolean
          requires_relay: boolean
          sequence_no: number | null
          status_code: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          is_active?: boolean
          requires_pic?: boolean
          requires_relay?: boolean
          sequence_no?: number | null
          status_code: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          is_active?: boolean
          requires_pic?: boolean
          requires_relay?: boolean
          sequence_no?: number | null
          status_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      ref_gi_status: {
        Row: {
          created_at: string
          description: string
          gi_status_code: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          gi_status_code: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          gi_status_code?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      ref_grouplokasi: {
        Row: {
          created_at: string
          grouplokasi_code: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          grouplokasi_code: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          grouplokasi_code?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      ref_location_type: {
        Row: {
          created_at: string
          description: string
          is_active: boolean
          location_type_code: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          is_active?: boolean
          location_type_code: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          is_active?: boolean
          location_type_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      ref_manuver_action: {
        Row: {
          action_code: string
          created_at: string
          description: string
          is_active: boolean
          sequence_no: number | null
          updated_at: string
        }
        Insert: {
          action_code: string
          created_at?: string
          description: string
          is_active?: boolean
          sequence_no?: number | null
          updated_at?: string
        }
        Update: {
          action_code?: string
          created_at?: string
          description?: string
          is_active?: boolean
          sequence_no?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      ref_pmt_recovery_status: {
        Row: {
          created_at: string
          description: string
          is_active: boolean
          is_success: boolean
          recovery_status_code: string
          sequence_no: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          is_active?: boolean
          is_success?: boolean
          recovery_status_code: string
          sequence_no?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          is_active?: boolean
          is_success?: boolean
          recovery_status_code?: string
          sequence_no?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      ref_region: {
        Row: {
          created_at: string
          description: string
          is_active: boolean
          plant_id: string | null
          region_code: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          is_active?: boolean
          plant_id?: string | null
          region_code: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          is_active?: boolean
          plant_id?: string | null
          region_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      ref_supply_restoration_status: {
        Row: {
          created_at: string
          description: string
          is_active: boolean
          sequence_no: number
          supply_status_code: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          is_active?: boolean
          sequence_no?: number
          supply_status_code: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          is_active?: boolean
          sequence_no?: number
          supply_status_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      ref_thermovisi_point: {
        Row: {
          component_type: string
          created_at: string | null
          equipment_type_code: string
          eval_method: string
          gradient_group_code: string | null
          id: number
          input_model: string
          pair_point_id: number | null
          point_name: string
          point_number: number
          position_type: string | null
          template_code: string
        }
        Insert: {
          component_type: string
          created_at?: string | null
          equipment_type_code: string
          eval_method: string
          gradient_group_code?: string | null
          id?: number
          input_model: string
          pair_point_id?: number | null
          point_name: string
          point_number: number
          position_type?: string | null
          template_code: string
        }
        Update: {
          component_type?: string
          created_at?: string | null
          equipment_type_code?: string
          eval_method?: string
          gradient_group_code?: string | null
          id?: number
          input_model?: string
          pair_point_id?: number | null
          point_name?: string
          point_number?: number
          position_type?: string | null
          template_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "ref_thermovisi_point_equipment_type_code_fkey"
            columns: ["equipment_type_code"]
            isOneToOne: false
            referencedRelation: "ref_equipment_type"
            referencedColumns: ["equipment_type_code"]
          },
          {
            foreignKeyName: "ref_thermovisi_point_pair_point_id_fkey"
            columns: ["pair_point_id"]
            isOneToOne: false
            referencedRelation: "ref_thermovisi_point"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ref_thermovisi_point_template_code_fkey"
            columns: ["template_code"]
            isOneToOne: false
            referencedRelation: "ref_thermovisi_template"
            referencedColumns: ["template_code"]
          },
        ]
      }
      ref_thermovisi_template: {
        Row: {
          bay_function_code: string
          created_at: string | null
          id: number
          template_code: string
          template_name: string
          voltage_code: string
        }
        Insert: {
          bay_function_code: string
          created_at?: string | null
          id?: number
          template_code: string
          template_name: string
          voltage_code: string
        }
        Update: {
          bay_function_code?: string
          created_at?: string | null
          id?: number
          template_code?: string
          template_name?: string
          voltage_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "ref_thermovisi_template_bay_function_code_fkey"
            columns: ["bay_function_code"]
            isOneToOne: false
            referencedRelation: "ref_function"
            referencedColumns: ["function_code"]
          },
          {
            foreignKeyName: "ref_thermovisi_template_voltage_code_fkey"
            columns: ["voltage_code"]
            isOneToOne: false
            referencedRelation: "ref_voltage"
            referencedColumns: ["voltage_code"]
          },
        ]
      }
      ref_unit_type: {
        Row: {
          created_at: string
          is_active: boolean
          name: string
          unit_type_code: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          is_active?: boolean
          name: string
          unit_type_code: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          is_active?: boolean
          name?: string
          unit_type_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      ref_voltage: {
        Row: {
          category: string | null
          created_at: string
          is_active: boolean
          ntegangan: number | null
          updated_at: string
          voltage_code: string
          voltage_kv: number | null
          voltage_label: string
          voltage_v: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          is_active?: boolean
          ntegangan?: number | null
          updated_at?: string
          voltage_code: string
          voltage_kv?: number | null
          voltage_label: string
          voltage_v?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          is_active?: boolean
          ntegangan?: number | null
          updated_at?: string
          voltage_code?: string
          voltage_kv?: number | null
          voltage_label?: string
          voltage_v?: number | null
        }
        Relationships: []
      }
      telegram_registration_session: {
        Row: {
          created_at: string
          expires_at: string
          page_no: number
          selected_functloc_ids: string[]
          telegram_user_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          page_no?: number
          selected_functloc_ids?: string[]
          telegram_user_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          page_no?: number
          selected_functloc_ids?: string[]
          telegram_user_id?: number
          updated_at?: string
        }
        Relationships: []
      }
      trx_kejadian_attachment: {
        Row: {
          attachment_id: string
          attachment_type: string | null
          created_at: string
          description: string | null
          event_id: string
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string | null
        }
        Insert: {
          attachment_id?: string
          attachment_type?: string | null
          created_at?: string
          description?: string | null
          event_id: string
          file_name: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
        }
        Update: {
          attachment_id?: string
          attachment_type?: string | null
          created_at?: string
          description?: string | null
          event_id?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_kejadian_attachment_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "trx_kejadian_penyulang"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "fk_kejadian_attachment_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "fk_kejadian_attachment_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["event_id"]
          },
        ]
      }
      trx_kejadian_indikasi: {
        Row: {
          created_at: string
          event_id: string
          event_indication_id: string
          indikasi_code: string
        }
        Insert: {
          created_at?: string
          event_id: string
          event_indication_id?: string
          indikasi_code: string
        }
        Update: {
          created_at?: string
          event_id?: string
          event_indication_id?: string
          indikasi_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_kejadian_indikasi_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "trx_kejadian_penyulang"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "fk_kejadian_indikasi_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "fk_kejadian_indikasi_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "fk_kejadian_indikasi_ref"
            columns: ["indikasi_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_indikasi"
            referencedColumns: ["indikasi_code"]
          },
        ]
      }
      trx_kejadian_manuver: {
        Row: {
          action_code: string
          action_date: string | null
          action_time: string | null
          created_at: string
          description: string | null
          event_id: string
          event_manuver_id: string
          sequence_no: number | null
          target_penyulang_id: string
          updated_at: string
        }
        Insert: {
          action_code: string
          action_date?: string | null
          action_time?: string | null
          created_at?: string
          description?: string | null
          event_id: string
          event_manuver_id?: string
          sequence_no?: number | null
          target_penyulang_id: string
          updated_at?: string
        }
        Update: {
          action_code?: string
          action_date?: string | null
          action_time?: string | null
          created_at?: string
          description?: string | null
          event_id?: string
          event_manuver_id?: string
          sequence_no?: number | null
          target_penyulang_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_kejadian_manuver_action"
            columns: ["action_code"]
            isOneToOne: false
            referencedRelation: "ref_manuver_action"
            referencedColumns: ["action_code"]
          },
          {
            foreignKeyName: "fk_kejadian_manuver_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "trx_kejadian_penyulang"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "fk_kejadian_manuver_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "fk_kejadian_manuver_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "fk_kejadian_manuver_penyulang"
            columns: ["target_penyulang_id"]
            isOneToOne: false
            referencedRelation: "mst_penyulang"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_manuver_penyulang"
            columns: ["target_penyulang_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_manuver_penyulang"
            columns: ["target_penyulang_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_manuver_penyulang"
            columns: ["target_penyulang_id"]
            isOneToOne: false
            referencedRelation: "vw_transformer_feeder_mapping"
            referencedColumns: ["penyulang_id"]
          },
        ]
      }
      trx_kejadian_pemulihan: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          event_id: string
          is_final: boolean
          load_current_after_a: number | null
          recovery_date: string
          recovery_id: string
          recovery_status_code: string
          recovery_time: string
          sequence_no: number
          updated_at: string
          updated_by: string | null
          voltage_after_kv: number | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_id: string
          is_final?: boolean
          load_current_after_a?: number | null
          recovery_date: string
          recovery_id?: string
          recovery_status_code: string
          recovery_time: string
          sequence_no: number
          updated_at?: string
          updated_by?: string | null
          voltage_after_kv?: number | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_id?: string
          is_final?: boolean
          load_current_after_a?: number | null
          recovery_date?: string
          recovery_id?: string
          recovery_status_code?: string
          recovery_time?: string
          sequence_no?: number
          updated_at?: string
          updated_by?: string | null
          voltage_after_kv?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_kejadian_pemulihan_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "trx_kejadian_penyulang"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "fk_kejadian_pemulihan_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "fk_kejadian_pemulihan_event"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "fk_kejadian_pemulihan_status"
            columns: ["recovery_status_code"]
            isOneToOne: false
            referencedRelation: "ref_pmt_recovery_status"
            referencedColumns: ["recovery_status_code"]
          },
        ]
      }
      trx_kejadian_penyulang: {
        Row: {
          annunciator_code: string | null
          cause_code: string | null
          created_at: string
          created_by: string | null
          customer_outage_duration_min: number | null
          delete_reason: string | null
          deleted_at: string | null
          deleted_by: string | null
          dispatcher_up2d_name: string | null
          ens_kwh: number | null
          event_date: string
          event_description: string | null
          event_id: string
          event_no: string | null
          event_time: string
          event_type_code: string
          fault_current_n_a: number | null
          fault_current_r_a: number | null
          fault_current_s_a: number | null
          fault_current_t_a: number | null
          final_supply_normalization_date: string | null
          final_supply_normalization_time: string | null
          final_supply_normalized: boolean
          is_deleted: boolean
          load_current_after_a: number | null
          load_current_after_r_a: number | null
          load_current_after_s_a: number | null
          load_current_after_t_a: number | null
          load_current_before_a: number | null
          load_current_before_r_a: number | null
          load_current_before_s_a: number | null
          load_current_before_t_a: number | null
          maneuvered_current_a: number | null
          maneuvered_current_r_a: number | null
          maneuvered_current_s_a: number | null
          maneuvered_current_t_a: number | null
          notes: string | null
          operator_name: string | null
          outage_duration_min: number | null
          penyulang_id: string
          phase_n: boolean
          phase_r: boolean
          phase_s: boolean
          phase_t: boolean
          pic_code: string | null
          pmt_condition_duration_min: number | null
          pmt_counter_after: number | null
          pmt_status_code: string
          power_factor_before: number | null
          record_status: string
          recovery_date: string | null
          recovery_description: string | null
          recovery_status_code: string | null
          recovery_time: string | null
          remaining_current_a: number | null
          remaining_current_r_a: number | null
          remaining_current_s_a: number | null
          remaining_current_t_a: number | null
          supply_restored_date: string | null
          supply_restored_time: string | null
          supply_status_code: string
          updated_at: string
          updated_by: string | null
          voltage_after_kv: number | null
          voltage_before_kv: number | null
        }
        Insert: {
          annunciator_code?: string | null
          cause_code?: string | null
          created_at?: string
          created_by?: string | null
          customer_outage_duration_min?: number | null
          delete_reason?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          dispatcher_up2d_name?: string | null
          ens_kwh?: number | null
          event_date: string
          event_description?: string | null
          event_id?: string
          event_no?: string | null
          event_time: string
          event_type_code: string
          fault_current_n_a?: number | null
          fault_current_r_a?: number | null
          fault_current_s_a?: number | null
          fault_current_t_a?: number | null
          final_supply_normalization_date?: string | null
          final_supply_normalization_time?: string | null
          final_supply_normalized?: boolean
          is_deleted?: boolean
          load_current_after_a?: number | null
          load_current_after_r_a?: number | null
          load_current_after_s_a?: number | null
          load_current_after_t_a?: number | null
          load_current_before_a?: number | null
          load_current_before_r_a?: number | null
          load_current_before_s_a?: number | null
          load_current_before_t_a?: number | null
          maneuvered_current_a?: number | null
          maneuvered_current_r_a?: number | null
          maneuvered_current_s_a?: number | null
          maneuvered_current_t_a?: number | null
          notes?: string | null
          operator_name?: string | null
          outage_duration_min?: number | null
          penyulang_id: string
          phase_n?: boolean
          phase_r?: boolean
          phase_s?: boolean
          phase_t?: boolean
          pic_code?: string | null
          pmt_condition_duration_min?: number | null
          pmt_counter_after?: number | null
          pmt_status_code: string
          power_factor_before?: number | null
          record_status?: string
          recovery_date?: string | null
          recovery_description?: string | null
          recovery_status_code?: string | null
          recovery_time?: string | null
          remaining_current_a?: number | null
          remaining_current_r_a?: number | null
          remaining_current_s_a?: number | null
          remaining_current_t_a?: number | null
          supply_restored_date?: string | null
          supply_restored_time?: string | null
          supply_status_code?: string
          updated_at?: string
          updated_by?: string | null
          voltage_after_kv?: number | null
          voltage_before_kv?: number | null
        }
        Update: {
          annunciator_code?: string | null
          cause_code?: string | null
          created_at?: string
          created_by?: string | null
          customer_outage_duration_min?: number | null
          delete_reason?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          dispatcher_up2d_name?: string | null
          ens_kwh?: number | null
          event_date?: string
          event_description?: string | null
          event_id?: string
          event_no?: string | null
          event_time?: string
          event_type_code?: string
          fault_current_n_a?: number | null
          fault_current_r_a?: number | null
          fault_current_s_a?: number | null
          fault_current_t_a?: number | null
          final_supply_normalization_date?: string | null
          final_supply_normalization_time?: string | null
          final_supply_normalized?: boolean
          is_deleted?: boolean
          load_current_after_a?: number | null
          load_current_after_r_a?: number | null
          load_current_after_s_a?: number | null
          load_current_after_t_a?: number | null
          load_current_before_a?: number | null
          load_current_before_r_a?: number | null
          load_current_before_s_a?: number | null
          load_current_before_t_a?: number | null
          maneuvered_current_a?: number | null
          maneuvered_current_r_a?: number | null
          maneuvered_current_s_a?: number | null
          maneuvered_current_t_a?: number | null
          notes?: string | null
          operator_name?: string | null
          outage_duration_min?: number | null
          penyulang_id?: string
          phase_n?: boolean
          phase_r?: boolean
          phase_s?: boolean
          phase_t?: boolean
          pic_code?: string | null
          pmt_condition_duration_min?: number | null
          pmt_counter_after?: number | null
          pmt_status_code?: string
          power_factor_before?: number | null
          record_status?: string
          recovery_date?: string | null
          recovery_description?: string | null
          recovery_status_code?: string | null
          recovery_time?: string | null
          remaining_current_a?: number | null
          remaining_current_r_a?: number | null
          remaining_current_s_a?: number | null
          remaining_current_t_a?: number | null
          supply_restored_date?: string | null
          supply_restored_time?: string | null
          supply_status_code?: string
          updated_at?: string
          updated_by?: string | null
          voltage_after_kv?: number | null
          voltage_before_kv?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_kejadian_annunciator"
            columns: ["annunciator_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_annunciator"
            referencedColumns: ["annunciator_code"]
          },
          {
            foreignKeyName: "fk_kejadian_cause"
            columns: ["cause_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_cause"
            referencedColumns: ["cause_code"]
          },
          {
            foreignKeyName: "fk_kejadian_event_type"
            columns: ["event_type_code"]
            isOneToOne: false
            referencedRelation: "ref_event_type"
            referencedColumns: ["event_type_code"]
          },
          {
            foreignKeyName: "fk_kejadian_penyulang"
            columns: ["penyulang_id"]
            isOneToOne: false
            referencedRelation: "mst_penyulang"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_penyulang"
            columns: ["penyulang_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_penyulang"
            columns: ["penyulang_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_penyulang"
            columns: ["penyulang_id"]
            isOneToOne: false
            referencedRelation: "vw_transformer_feeder_mapping"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_pic"
            columns: ["pic_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_pic"
            referencedColumns: ["pic_code"]
          },
          {
            foreignKeyName: "fk_kejadian_pmt_status"
            columns: ["pmt_status_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_pmt_status"
            referencedColumns: ["status_code"]
          },
          {
            foreignKeyName: "fk_kejadian_record_status"
            columns: ["record_status"]
            isOneToOne: false
            referencedRelation: "ref_event_record_status"
            referencedColumns: ["record_status_code"]
          },
          {
            foreignKeyName: "fk_kejadian_recovery_status"
            columns: ["recovery_status_code"]
            isOneToOne: false
            referencedRelation: "ref_pmt_recovery_status"
            referencedColumns: ["recovery_status_code"]
          },
          {
            foreignKeyName: "fk_kejadian_supply_status"
            columns: ["supply_status_code"]
            isOneToOne: false
            referencedRelation: "ref_supply_restoration_status"
            referencedColumns: ["supply_status_code"]
          },
        ]
      }
      trx_monthly_report: {
        Row: {
          created_at: string
          created_by: string
          monthly_report_id: string
          report_month: number
          report_year: number
          scope_functloc_id: string
          signature_token: string | null
          signer_name: string | null
          signer_position: string | null
          status: string
          submitted_at: string | null
          submitted_by: string | null
          updated_at: string
          updated_by: string | null
          verification_notes: string | null
          verified_at: string | null
          verified_by: string | null
          verified_role: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string
          monthly_report_id?: string
          report_month: number
          report_year: number
          scope_functloc_id: string
          signature_token?: string | null
          signer_name?: string | null
          signer_position?: string | null
          status?: string
          submitted_at?: string | null
          submitted_by?: string | null
          updated_at?: string
          updated_by?: string | null
          verification_notes?: string | null
          verified_at?: string | null
          verified_by?: string | null
          verified_role?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          monthly_report_id?: string
          report_month?: number
          report_year?: number
          scope_functloc_id?: string
          signature_token?: string | null
          signer_name?: string | null
          signer_position?: string | null
          status?: string
          submitted_at?: string | null
          submitted_by?: string | null
          updated_at?: string
          updated_by?: string | null
          verification_notes?: string | null
          verified_at?: string | null
          verified_by?: string | null
          verified_role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "mst_functloc"
            referencedColumns: ["functloc_id"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_ultg"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_master_lokasi"
            referencedColumns: ["IdFunctloc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "trx_monthly_report_scope_functloc_id_fkey"
            columns: ["scope_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["ultg_flc"]
          },
        ]
      }
      trx_monthly_report_approval: {
        Row: {
          acted_at: string
          action: string
          actor_role: string | null
          actor_user_id: string
          approval_id: string
          monthly_report_id: string
          notes: string | null
          signature_token: string | null
          signer_name: string | null
          signer_position: string | null
        }
        Insert: {
          acted_at?: string
          action: string
          actor_role?: string | null
          actor_user_id: string
          approval_id?: string
          monthly_report_id: string
          notes?: string | null
          signature_token?: string | null
          signer_name?: string | null
          signer_position?: string | null
        }
        Update: {
          acted_at?: string
          action?: string
          actor_role?: string | null
          actor_user_id?: string
          approval_id?: string
          monthly_report_id?: string
          notes?: string | null
          signature_token?: string | null
          signer_name?: string | null
          signer_position?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trx_monthly_report_approval_monthly_report_id_fkey"
            columns: ["monthly_report_id"]
            isOneToOne: false
            referencedRelation: "trx_monthly_report"
            referencedColumns: ["monthly_report_id"]
          },
        ]
      }
      trx_monthly_report_file: {
        Row: {
          drive_file_id: string | null
          drive_file_url: string
          file_format: string
          file_name: string
          file_size: number | null
          generated_at: string
          generated_by: string
          is_current: boolean
          mime_type: string | null
          monthly_report_id: string
          report_file_id: string
          signature_token: string
          version_no: number
        }
        Insert: {
          drive_file_id?: string | null
          drive_file_url: string
          file_format: string
          file_name: string
          file_size?: number | null
          generated_at?: string
          generated_by?: string
          is_current?: boolean
          mime_type?: string | null
          monthly_report_id: string
          report_file_id?: string
          signature_token: string
          version_no?: number
        }
        Update: {
          drive_file_id?: string | null
          drive_file_url?: string
          file_format?: string
          file_name?: string
          file_size?: number | null
          generated_at?: string
          generated_by?: string
          is_current?: boolean
          mime_type?: string | null
          monthly_report_id?: string
          report_file_id?: string
          signature_token?: string
          version_no?: number
        }
        Relationships: [
          {
            foreignKeyName: "trx_monthly_report_file_monthly_report_id_fkey"
            columns: ["monthly_report_id"]
            isOneToOne: false
            referencedRelation: "trx_monthly_report"
            referencedColumns: ["monthly_report_id"]
          },
        ]
      }
      user_access_assignment: {
        Row: {
          assignment_id: string
          created_at: string
          created_by: string | null
          functloc_id: string | null
          include_children: boolean
          is_active: boolean
          is_primary: boolean
          role_code: string
          user_id: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          assignment_id?: string
          created_at?: string
          created_by?: string | null
          functloc_id?: string | null
          include_children?: boolean
          is_active?: boolean
          is_primary?: boolean
          role_code: string
          user_id: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          assignment_id?: string
          created_at?: string
          created_by?: string | null
          functloc_id?: string | null
          include_children?: boolean
          is_active?: boolean
          is_primary?: boolean
          role_code?: string
          user_id?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_access_assignment_role_code_fkey"
            columns: ["role_code"]
            isOneToOne: false
            referencedRelation: "ref_access_role"
            referencedColumns: ["role_code"]
          },
        ]
      }
    }
    Views: {
      v_dropdown_bay: {
        Row: {
          bay_flc: string | null
          bay_function_code: string | null
          bay_name: string | null
          bay_short_name: string | null
          baygroup_code: string | null
          gi_flc: string | null
          gi_name: string | null
          status_code: string | null
          ultg_flc: string | null
          ultg_name: string | null
          voltage_code: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_functloc_baygroup"
            columns: ["baygroup_code"]
            isOneToOne: false
            referencedRelation: "ref_baygroup"
            referencedColumns: ["baygroup_code"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["gi_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["ultg_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["bay_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_function"
            columns: ["bay_function_code"]
            isOneToOne: false
            referencedRelation: "ref_function"
            referencedColumns: ["function_code"]
          },
          {
            foreignKeyName: "fk_functloc_status"
            columns: ["status_code"]
            isOneToOne: false
            referencedRelation: "ref_gi_status"
            referencedColumns: ["gi_status_code"]
          },
          {
            foreignKeyName: "fk_functloc_voltage"
            columns: ["voltage_code"]
            isOneToOne: false
            referencedRelation: "ref_voltage"
            referencedColumns: ["voltage_code"]
          },
        ]
      }
      v_dropdown_gi: {
        Row: {
          city: string | null
          gi_flc: string | null
          gi_name: string | null
          gi_short_name: string | null
          latitude: number | null
          longitude: number | null
          region_code: string | null
          status_code: string | null
          ultg_flc: string | null
          ultg_name: string | null
          voltage_code: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["gi_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["ultg_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_region"
            columns: ["region_code"]
            isOneToOne: false
            referencedRelation: "ref_region"
            referencedColumns: ["region_code"]
          },
          {
            foreignKeyName: "fk_functloc_status"
            columns: ["status_code"]
            isOneToOne: false
            referencedRelation: "ref_gi_status"
            referencedColumns: ["gi_status_code"]
          },
          {
            foreignKeyName: "fk_functloc_voltage"
            columns: ["voltage_code"]
            isOneToOne: false
            referencedRelation: "ref_voltage"
            referencedColumns: ["voltage_code"]
          },
        ]
      }
      v_dropdown_ultg: {
        Row: {
          plant_id: string | null
          region_code: string | null
          status_code: string | null
          ultg_flc: string | null
          ultg_name: string | null
          ultg_short_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["ultg_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_region"
            columns: ["region_code"]
            isOneToOne: false
            referencedRelation: "ref_region"
            referencedColumns: ["region_code"]
          },
          {
            foreignKeyName: "fk_functloc_status"
            columns: ["status_code"]
            isOneToOne: false
            referencedRelation: "ref_gi_status"
            referencedColumns: ["gi_status_code"]
          },
        ]
      }
      v_master_lokasi: {
        Row: {
          "#IdPlan": string | null
          "#Lokasi Aset (Induk)": string | null
          "#PlantSection": string | null
          "#Workcenter": string | null
          Alamat: string | null
          Altitude: number | null
          "Bay Group": string | null
          created_at: string | null
          Deskripsi: string | null
          Fungsi: string | null
          "Gardu Induk/Koridor": string | null
          "Group Lokasi": string | null
          IdFunctloc: string | null
          is_active: boolean | null
          "Kode Pos": string | null
          "Kota/Propinsi": string | null
          Latitude: number | null
          Level: number | null
          Longitude: number | null
          Milik: string | null
          "Nama Lokasi": string | null
          "Nama Singkat": string | null
          "No. SLO": string | null
          Status: string | null
          Tegangan: string | null
          "Tgl. Oprs": string | null
          "Tgl. Tdk. Oprs": string | null
          "Tgl. Terbit SLO": string | null
          updated_at: string | null
          "Wil Kerja": string | null
          "Wilayah/APB/UPB": string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["IdFunctloc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
        ]
      }
      v_thermovisi_eligible_bay: {
        Row: {
          bay_flc: string | null
          bay_function_code: string | null
          bay_function_name: string | null
          bay_name: string | null
          bay_short_name: string | null
          baygroup_code: string | null
          gi_flc: string | null
          gi_name: string | null
          is_routine_required: boolean | null
          monitoring_category: string | null
          status_code: string | null
          ultg_flc: string | null
          ultg_name: string | null
          voltage_code: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_functloc_baygroup"
            columns: ["baygroup_code"]
            isOneToOne: false
            referencedRelation: "ref_baygroup"
            referencedColumns: ["baygroup_code"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["ultg_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["bay_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["gi_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_function"
            columns: ["bay_function_code"]
            isOneToOne: false
            referencedRelation: "ref_function"
            referencedColumns: ["function_code"]
          },
          {
            foreignKeyName: "fk_functloc_status"
            columns: ["status_code"]
            isOneToOne: false
            referencedRelation: "ref_gi_status"
            referencedColumns: ["gi_status_code"]
          },
          {
            foreignKeyName: "fk_functloc_voltage"
            columns: ["voltage_code"]
            isOneToOne: false
            referencedRelation: "ref_voltage"
            referencedColumns: ["voltage_code"]
          },
        ]
      }
      vw_kejadian_penyulang: {
        Row: {
          annunciator_code: string | null
          annunciator_name: string | null
          bay_flc: string | null
          bay_name: string | null
          cause_code: string | null
          cause_name: string | null
          created_at: string | null
          created_by: string | null
          created_by_name: string | null
          customer_outage_duration_min: number | null
          dispatcher_up2d_name: string | null
          ens_kwh: number | null
          event_date: string | null
          event_description: string | null
          event_id: string | null
          event_no: string | null
          event_time: string | null
          event_type_code: string | null
          event_type_name: string | null
          fault_current_n_a: number | null
          fault_current_r_a: number | null
          fault_current_s_a: number | null
          fault_current_t_a: number | null
          final_supply_normalization_date: string | null
          final_supply_normalization_time: string | null
          final_supply_normalized: boolean | null
          gi_flc: string | null
          gi_name: string | null
          load_current_after_a: number | null
          load_current_after_r_a: number | null
          load_current_after_s_a: number | null
          load_current_after_t_a: number | null
          load_current_before_a: number | null
          load_current_before_r_a: number | null
          load_current_before_s_a: number | null
          load_current_before_t_a: number | null
          maneuvered_current_a: number | null
          maneuvered_current_r_a: number | null
          maneuvered_current_s_a: number | null
          maneuvered_current_t_a: number | null
          notes: string | null
          operator_name: string | null
          outage_duration_min: number | null
          penyulang_alias: string | null
          penyulang_code: string | null
          penyulang_id: string | null
          penyulang_name: string | null
          penyulang_short_name: string | null
          phase_n: boolean | null
          phase_r: boolean | null
          phase_s: boolean | null
          phase_t: boolean | null
          pic_code: string | null
          pic_name: string | null
          pmt_condition_duration_min: number | null
          pmt_counter_after: number | null
          pmt_status_code: string | null
          pmt_status_name: string | null
          power_factor_before: number | null
          record_status: string | null
          record_status_name: string | null
          recovery_date: string | null
          recovery_description: string | null
          recovery_status_code: string | null
          recovery_status_name: string | null
          recovery_time: string | null
          remaining_current_a: number | null
          remaining_current_r_a: number | null
          remaining_current_s_a: number | null
          remaining_current_t_a: number | null
          supply_restored_date: string | null
          supply_restored_time: string | null
          supply_status_code: string | null
          supply_status_name: string | null
          ultg_flc: string | null
          ultg_name: string | null
          updated_at: string | null
          updated_by: string | null
          voltage_after_kv: number | null
          voltage_before_kv: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["gi_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["ultg_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["bay_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_kejadian_annunciator"
            columns: ["annunciator_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_annunciator"
            referencedColumns: ["annunciator_code"]
          },
          {
            foreignKeyName: "fk_kejadian_cause"
            columns: ["cause_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_cause"
            referencedColumns: ["cause_code"]
          },
          {
            foreignKeyName: "fk_kejadian_event_type"
            columns: ["event_type_code"]
            isOneToOne: false
            referencedRelation: "ref_event_type"
            referencedColumns: ["event_type_code"]
          },
          {
            foreignKeyName: "fk_kejadian_penyulang"
            columns: ["penyulang_id"]
            isOneToOne: false
            referencedRelation: "mst_penyulang"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_penyulang"
            columns: ["penyulang_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_penyulang"
            columns: ["penyulang_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_penyulang"
            columns: ["penyulang_id"]
            isOneToOne: false
            referencedRelation: "vw_transformer_feeder_mapping"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_pic"
            columns: ["pic_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_pic"
            referencedColumns: ["pic_code"]
          },
          {
            foreignKeyName: "fk_kejadian_pmt_status"
            columns: ["pmt_status_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_pmt_status"
            referencedColumns: ["status_code"]
          },
          {
            foreignKeyName: "fk_kejadian_record_status"
            columns: ["record_status"]
            isOneToOne: false
            referencedRelation: "ref_event_record_status"
            referencedColumns: ["record_status_code"]
          },
          {
            foreignKeyName: "fk_kejadian_recovery_status"
            columns: ["recovery_status_code"]
            isOneToOne: false
            referencedRelation: "ref_pmt_recovery_status"
            referencedColumns: ["recovery_status_code"]
          },
          {
            foreignKeyName: "fk_kejadian_supply_status"
            columns: ["supply_status_code"]
            isOneToOne: false
            referencedRelation: "ref_supply_restoration_status"
            referencedColumns: ["supply_status_code"]
          },
        ]
      }
      vw_kejadian_penyulang_detail: {
        Row: {
          annunciator_code: string | null
          annunciator_name: string | null
          bay_flc: string | null
          bay_name: string | null
          cause_code: string | null
          cause_name: string | null
          created_at: string | null
          created_by: string | null
          created_by_name: string | null
          customer_outage_duration_min: number | null
          dispatcher_up2d_name: string | null
          ens_kwh: number | null
          event_date: string | null
          event_description: string | null
          event_id: string | null
          event_no: string | null
          event_time: string | null
          event_type_code: string | null
          event_type_name: string | null
          fault_current_n_a: number | null
          fault_current_r_a: number | null
          fault_current_s_a: number | null
          fault_current_t_a: number | null
          final_supply_normalization_date: string | null
          final_supply_normalization_time: string | null
          final_supply_normalized: boolean | null
          gi_flc: string | null
          gi_name: string | null
          indikasi_codes: string[] | null
          indikasi_names: string[] | null
          load_current_after_a: number | null
          load_current_after_r_a: number | null
          load_current_after_s_a: number | null
          load_current_after_t_a: number | null
          load_current_before_a: number | null
          load_current_before_r_a: number | null
          load_current_before_s_a: number | null
          load_current_before_t_a: number | null
          maneuvered_current_a: number | null
          maneuvered_current_r_a: number | null
          maneuvered_current_s_a: number | null
          maneuvered_current_t_a: number | null
          notes: string | null
          operator_name: string | null
          outage_duration_min: number | null
          penyulang_alias: string | null
          penyulang_code: string | null
          penyulang_id: string | null
          penyulang_name: string | null
          penyulang_short_name: string | null
          phase_n: boolean | null
          phase_r: boolean | null
          phase_s: boolean | null
          phase_t: boolean | null
          pic_code: string | null
          pic_name: string | null
          pmt_condition_duration_min: number | null
          pmt_counter_after: number | null
          pmt_status_code: string | null
          pmt_status_name: string | null
          power_factor_before: number | null
          record_status: string | null
          record_status_name: string | null
          recovery_date: string | null
          recovery_description: string | null
          recovery_status_code: string | null
          recovery_status_name: string | null
          recovery_time: string | null
          remaining_current_a: number | null
          remaining_current_r_a: number | null
          remaining_current_s_a: number | null
          remaining_current_t_a: number | null
          supply_restored_date: string | null
          supply_restored_time: string | null
          supply_status_code: string | null
          supply_status_name: string | null
          ultg_flc: string | null
          ultg_name: string | null
          updated_at: string | null
          updated_by: string | null
          voltage_after_kv: number | null
          voltage_before_kv: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["gi_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["bay_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["ultg_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_kejadian_annunciator"
            columns: ["annunciator_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_annunciator"
            referencedColumns: ["annunciator_code"]
          },
          {
            foreignKeyName: "fk_kejadian_cause"
            columns: ["cause_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_cause"
            referencedColumns: ["cause_code"]
          },
          {
            foreignKeyName: "fk_kejadian_event_type"
            columns: ["event_type_code"]
            isOneToOne: false
            referencedRelation: "ref_event_type"
            referencedColumns: ["event_type_code"]
          },
          {
            foreignKeyName: "fk_kejadian_penyulang"
            columns: ["penyulang_id"]
            isOneToOne: false
            referencedRelation: "mst_penyulang"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_penyulang"
            columns: ["penyulang_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_penyulang"
            columns: ["penyulang_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_penyulang"
            columns: ["penyulang_id"]
            isOneToOne: false
            referencedRelation: "vw_transformer_feeder_mapping"
            referencedColumns: ["penyulang_id"]
          },
          {
            foreignKeyName: "fk_kejadian_pic"
            columns: ["pic_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_pic"
            referencedColumns: ["pic_code"]
          },
          {
            foreignKeyName: "fk_kejadian_pmt_status"
            columns: ["pmt_status_code"]
            isOneToOne: false
            referencedRelation: "ref_gangguan_pmt_status"
            referencedColumns: ["status_code"]
          },
          {
            foreignKeyName: "fk_kejadian_record_status"
            columns: ["record_status"]
            isOneToOne: false
            referencedRelation: "ref_event_record_status"
            referencedColumns: ["record_status_code"]
          },
          {
            foreignKeyName: "fk_kejadian_recovery_status"
            columns: ["recovery_status_code"]
            isOneToOne: false
            referencedRelation: "ref_pmt_recovery_status"
            referencedColumns: ["recovery_status_code"]
          },
          {
            foreignKeyName: "fk_kejadian_supply_status"
            columns: ["supply_status_code"]
            isOneToOne: false
            referencedRelation: "ref_supply_restoration_status"
            referencedColumns: ["supply_status_code"]
          },
        ]
      }
      vw_penyulang_hierarchy: {
        Row: {
          bay_flc: string | null
          bay_function_code: string | null
          bay_name: string | null
          bay_short_name: string | null
          bay_status_code: string | null
          baygroup_code: string | null
          gi_flc: string | null
          gi_name: string | null
          is_manuverable: boolean | null
          owner_unit_type_code: string | null
          penyulang_alias: string | null
          penyulang_code: string | null
          penyulang_description: string | null
          penyulang_id: string | null
          penyulang_is_active: boolean | null
          penyulang_name: string | null
          penyulang_notes: string | null
          penyulang_short_name: string | null
          penyulang_status_code: string | null
          ulp_code: string | null
          ultg_flc: string | null
          ultg_name: string | null
          up3_code: string | null
          voltage_code: string | null
          wilayah_penyaluran: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_functloc_baygroup"
            columns: ["baygroup_code"]
            isOneToOne: false
            referencedRelation: "ref_baygroup"
            referencedColumns: ["baygroup_code"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["bay_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["ultg_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["gi_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_function"
            columns: ["bay_function_code"]
            isOneToOne: false
            referencedRelation: "ref_function"
            referencedColumns: ["function_code"]
          },
          {
            foreignKeyName: "fk_functloc_status"
            columns: ["bay_status_code"]
            isOneToOne: false
            referencedRelation: "ref_gi_status"
            referencedColumns: ["gi_status_code"]
          },
          {
            foreignKeyName: "fk_functloc_voltage"
            columns: ["voltage_code"]
            isOneToOne: false
            referencedRelation: "ref_voltage"
            referencedColumns: ["voltage_code"]
          },
          {
            foreignKeyName: "fk_penyulang_owner_unit_type"
            columns: ["owner_unit_type_code"]
            isOneToOne: false
            referencedRelation: "ref_unit_type"
            referencedColumns: ["unit_type_code"]
          },
          {
            foreignKeyName: "fk_penyulang_status"
            columns: ["penyulang_status_code"]
            isOneToOne: false
            referencedRelation: "ref_equipment_status"
            referencedColumns: ["status_code"]
          },
        ]
      }
      vw_penyulang_hierarchy_accessible: {
        Row: {
          bay_flc: string | null
          bay_function_code: string | null
          bay_name: string | null
          bay_short_name: string | null
          bay_status_code: string | null
          baygroup_code: string | null
          gi_flc: string | null
          gi_name: string | null
          is_manuverable: boolean | null
          owner_unit_type_code: string | null
          penyulang_alias: string | null
          penyulang_code: string | null
          penyulang_description: string | null
          penyulang_id: string | null
          penyulang_is_active: boolean | null
          penyulang_name: string | null
          penyulang_notes: string | null
          penyulang_short_name: string | null
          penyulang_status_code: string | null
          ulp_code: string | null
          ultg_flc: string | null
          ultg_name: string | null
          up3_code: string | null
          voltage_code: string | null
          wilayah_penyaluran: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_functloc_baygroup"
            columns: ["baygroup_code"]
            isOneToOne: false
            referencedRelation: "ref_baygroup"
            referencedColumns: ["baygroup_code"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["bay_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["gi_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_flc_ref"
            columns: ["ultg_flc"]
            isOneToOne: true
            referencedRelation: "ref_flc"
            referencedColumns: ["flc_id"]
          },
          {
            foreignKeyName: "fk_functloc_function"
            columns: ["bay_function_code"]
            isOneToOne: false
            referencedRelation: "ref_function"
            referencedColumns: ["function_code"]
          },
          {
            foreignKeyName: "fk_functloc_status"
            columns: ["bay_status_code"]
            isOneToOne: false
            referencedRelation: "ref_gi_status"
            referencedColumns: ["gi_status_code"]
          },
          {
            foreignKeyName: "fk_functloc_voltage"
            columns: ["voltage_code"]
            isOneToOne: false
            referencedRelation: "ref_voltage"
            referencedColumns: ["voltage_code"]
          },
          {
            foreignKeyName: "fk_penyulang_owner_unit_type"
            columns: ["owner_unit_type_code"]
            isOneToOne: false
            referencedRelation: "ref_unit_type"
            referencedColumns: ["unit_type_code"]
          },
          {
            foreignKeyName: "fk_penyulang_status"
            columns: ["penyulang_status_code"]
            isOneToOne: false
            referencedRelation: "ref_equipment_status"
            referencedColumns: ["status_code"]
          },
        ]
      }
      vw_transformer_feeder_mapping: {
        Row: {
          feeder_bay_functloc_id: string | null
          feeder_bay_name: string | null
          is_active: boolean | null
          notes: string | null
          penyulang_code: string | null
          penyulang_id: string | null
          penyulang_name: string | null
          penyulang_short_name: string | null
          penyulang_status_code: string | null
          rated_power_mva: number | null
          rated_secondary_current_a: number | null
          source_batch_id: string | null
          source_system: string | null
          techidentno: string | null
          transformer_bay_map_id: string | null
          transformer_description: string | null
          transformer_functloc_id: string | null
          transformer_id: string | null
          valid_from: string | null
          valid_to: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_penyulang_status"
            columns: ["penyulang_status_code"]
            isOneToOne: false
            referencedRelation: "ref_equipment_status"
            referencedColumns: ["status_code"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "mst_functloc"
            referencedColumns: ["functloc_id"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_ultg"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_master_lokasi"
            referencedColumns: ["IdFunctloc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_feeder_bay_functloc_id_fkey"
            columns: ["feeder_bay_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "map_transformer_feeder_bay_transformer_id_fkey"
            columns: ["transformer_id"]
            isOneToOne: false
            referencedRelation: "mst_transformer"
            referencedColumns: ["transformer_id"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "mst_functloc"
            referencedColumns: ["functloc_id"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_gi"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_dropdown_ultg"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_master_lokasi"
            referencedColumns: ["IdFunctloc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "v_thermovisi_eligible_bay"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_kejadian_penyulang_detail"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy"
            referencedColumns: ["ultg_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["bay_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["gi_flc"]
          },
          {
            foreignKeyName: "mst_transformer_functloc_id_fkey"
            columns: ["transformer_functloc_id"]
            isOneToOne: false
            referencedRelation: "vw_penyulang_hierarchy_accessible"
            referencedColumns: ["ultg_flc"]
          },
        ]
      }
    }
    Functions: {
      fn_claim_telegram_user_link: {
        Args: {
          p_link_code: string
          p_telegram_display_name: string
          p_telegram_user_id: number
          p_telegram_username: string
        }
        Returns: Json
      }
      fn_clear_my_telegram_operator_pin: { Args: never; Returns: Json }
      fn_create_my_telegram_link_code: { Args: never; Returns: Json }
      fn_current_user_can_access_functloc: {
        Args: { p_target_functloc_id: string }
        Returns: boolean
      }
      fn_current_user_can_manage_functloc: {
        Args: { p_target_functloc_id: string }
        Returns: boolean
      }
      fn_current_user_can_manage_target_user: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      fn_current_user_can_manage_users: { Args: never; Returns: boolean }
      fn_current_user_has_role_at_functloc: {
        Args: { p_role_code: string; p_target_functloc_id: string }
        Returns: boolean
      }
      fn_current_user_is_admin: { Args: never; Returns: boolean }
      fn_current_user_is_super_admin: { Args: never; Returns: boolean }
      fn_dashboard_filter_options: {
        Args: never
        Returns: {
          bay_flc: string
          bay_name: string
          gi_flc: string
          gi_name: string
          penyulang_id: string
          penyulang_name: string
          ultg_flc: string
          ultg_name: string
        }[]
      }
      fn_dashboard_governance: {
        Args: {
          p_bay_flc?: string
          p_end_date?: string
          p_gi_flc?: string
          p_penyulang_id?: string
          p_start_date?: string
          p_ultg_flc?: string
        }
        Returns: Json
      }
      fn_dashboard_operations_events: {
        Args: {
          p_bay_flc?: string
          p_end_date?: string
          p_gi_flc?: string
          p_penyulang_id?: string
          p_start_date?: string
          p_ultg_flc?: string
        }
        Returns: {
          aging_minutes: number
          bay_name: string
          customer_outage_duration_min: number
          dispatcher_up2d_name: string
          event_date: string
          event_id: string
          event_no: string
          event_time: string
          event_type_code: string
          event_type_name: string
          final_supply_normalization_date: string
          final_supply_normalization_time: string
          final_supply_normalized: boolean
          gi_name: string
          maneuvered_current_a: number
          maneuvered_current_r_a: number
          maneuvered_current_s_a: number
          maneuvered_current_t_a: number
          operator_name: string
          penyulang_id: string
          penyulang_name: string
          pmt_condition_duration_min: number
          pmt_status_name: string
          record_status: string
          record_status_name: string
          recovery_date: string
          recovery_time: string
          remaining_current_a: number
          remaining_current_r_a: number
          remaining_current_s_a: number
          remaining_current_t_a: number
          supply_restored_date: string
          supply_restored_time: string
          supply_status_code: string
          supply_status_name: string
          ultg_name: string
        }[]
      }
      fn_dashboard_reliability_events: {
        Args: { p_end_date?: string; p_start_date?: string }
        Returns: {
          cause_code: string
          cause_name: string
          customer_outage_duration_min: number
          ens_kwh: number
          event_date: string
          event_id: string
          event_no: string
          event_time: string
          gi_name: string
          outage_duration_min: number
          penyulang_id: string
          penyulang_name: string
          record_status: string
          recovery_date: string
          recovery_time: string
          ultg_name: string
        }[]
      }
      fn_dashboard_reliability_events_v2: {
        Args: {
          p_bay_flc?: string
          p_end_date?: string
          p_gi_flc?: string
          p_penyulang_id?: string
          p_start_date?: string
          p_ultg_flc?: string
        }
        Returns: {
          bay_flc: string
          bay_name: string
          cause_code: string
          cause_name: string
          customer_outage_duration_min: number
          ens_kwh: number
          event_date: string
          event_id: string
          event_no: string
          event_time: string
          gi_flc: string
          gi_name: string
          outage_duration_min: number
          penyulang_id: string
          penyulang_name: string
          record_status: string
          recovery_date: string
          recovery_time: string
          ultg_flc: string
          ultg_name: string
        }[]
      }
      fn_end_telegram_operator_session: {
        Args: { p_chat_id: number; p_telegram_user_id: number }
        Returns: Json
      }
      fn_end_telegram_supabase_auth_session: {
        Args: { p_telegram_user_id: number }
        Returns: undefined
      }
      fn_event_is_locked_by_approved_monthly_report: {
        Args: { p_event_id: string }
        Returns: boolean
      }
      fn_event_period_is_approved: {
        Args: { p_event_date: string; p_penyulang_id: string }
        Returns: boolean
      }
      fn_functloc_is_in_scope: {
        Args: {
          p_include_children?: boolean
          p_root_functloc_id: string
          p_target_functloc_id: string
        }
        Returns: boolean
      }
      fn_get_gi_telegram_mentions: {
        Args: { p_functloc_id: string }
        Returns: {
          channel_id: string
          channel_value: string
          external_id: string
          is_primary: boolean
        }[]
      }
      fn_get_my_telegram_link: { Args: never; Returns: Json }
      fn_get_my_telegram_operator_pin_status: { Args: never; Returns: Json }
      fn_get_telegram_operator_session: {
        Args: { p_chat_id: number; p_telegram_user_id: number }
        Returns: Json
      }
      fn_get_telegram_supabase_auth_session: {
        Args: { p_telegram_user_id: number }
        Returns: Json
      }
      fn_import_transformers: {
        Args: { p_rows: Json; p_source_batch_id?: string }
        Returns: Json
      }
      fn_is_active_user: { Args: { p_user_id: string }; Returns: boolean }
      fn_list_transformer_feeder_bay_mappings: {
        Args: never
        Returns: {
          feeder_bay_functloc_id: string
          feeder_bay_name: string
          feeder_count: number
          feeder_names: string
          gi_name: string
          is_active: boolean
          notes: string
          rated_power_mva: number
          techidentno: string
          transformer_bay_map_id: string
          transformer_bay_name: string
          valid_from: string
          valid_to: string
        }[]
      }
      fn_list_transformer_mapping_options: {
        Args: never
        Returns: {
          current_transformer_bay_name: string
          current_transformer_id: string
          current_transformer_techidentno: string
          feeder_bay_functloc_id: string
          feeder_bay_name: string
          feeder_count: number
          feeder_names: string
          gi_functloc_id: string
          gi_name: string
          rated_power_mva: number
          techidentno: string
          transformer_bay_functloc_id: string
          transformer_bay_name: string
          transformer_id: string
        }[]
      }
      fn_list_transformers: {
        Args: { p_limit?: number; p_search?: string }
        Returns: {
          equipment_type_code: string
          functloc_id: string
          gi_name: string
          impedance_percent: number
          is_active: boolean
          last_synced_at: string
          manufacture_year: number
          manufacturer: string
          operational_date: string
          rated_power_mva: number
          rated_primary_kv: number
          rated_secondary_current_a: number
          rated_secondary_kv: number
          rated_tertiary_kv: number
          source_batch_id: string
          source_system: string
          status_code: string
          status_name: string
          techidentno: string
          transformer_id: string
          transformer_name: string
          transformer_type: string
        }[]
      }
      fn_manage_add_assignment: {
        Args: {
          p_functloc_id?: string
          p_include_children?: boolean
          p_is_primary?: boolean
          p_role_code: string
          p_user_id: string
        }
        Returns: string
      }
      fn_manage_assignable_roles: {
        Args: never
        Returns: {
          description: string
          role_code: string
          role_level: number
          role_name: string
          role_type: string
        }[]
      }
      fn_manage_functlocs: {
        Args: never
        Returns: {
          functloc_id: string
          location_name: string
          nlevel: number
          short_name: string
          sup_functloc_id: string
        }[]
      }
      fn_manage_set_assignment_active: {
        Args: { p_assignment_id: string; p_is_active: boolean }
        Returns: boolean
      }
      fn_manage_set_assignments_active: {
        Args: { p_assignment_ids: string[]; p_is_active: boolean }
        Returns: number
      }
      fn_manage_set_user_active: {
        Args: { p_is_active: boolean; p_user_id: string }
        Returns: boolean
      }
      fn_manage_sync_user_access: {
        Args: {
          p_functloc_ids: string[]
          p_include_children?: boolean
          p_role_codes: string[]
          p_user_id: string
        }
        Returns: Json
      }
      fn_manage_update_user_profile: {
        Args: {
          p_default_functloc_id?: string
          p_employee_id?: string
          p_full_name?: string
          p_position_name?: string
          p_user_id: string
        }
        Returns: boolean
      }
      fn_manage_user_assignments: {
        Args: { p_user_id: string }
        Returns: {
          assignment_id: string
          created_at: string
          functloc_id: string
          include_children: boolean
          is_active: boolean
          is_primary: boolean
          nlevel: number
          role_code: string
          role_level: number
          role_name: string
          unit_name: string
          user_id: string
          valid_from: string
          valid_until: string
        }[]
      }
      fn_manage_users_list: {
        Args: never
        Returns: {
          default_functloc_id: string
          default_unit_name: string
          email: string
          employee_id: string
          full_name: string
          is_active: boolean
          position_name: string
          role_count: number
          user_id: string
        }[]
      }
      fn_monthly_report_get_or_create: {
        Args: {
          p_report_month: number
          p_report_year: number
          p_scope_functloc_id: string
        }
        Returns: {
          created_at: string
          created_by: string
          monthly_report_id: string
          report_month: number
          report_year: number
          scope_functloc_id: string
          signature_token: string | null
          signer_name: string | null
          signer_position: string | null
          status: string
          submitted_at: string | null
          submitted_by: string | null
          updated_at: string
          updated_by: string | null
          verification_notes: string | null
          verified_at: string | null
          verified_by: string | null
          verified_role: string | null
        }
        SetofOptions: {
          from: "*"
          to: "trx_monthly_report"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      fn_monthly_report_register_file: {
        Args: {
          p_drive_file_id?: string
          p_drive_file_url: string
          p_file_format: string
          p_file_name: string
          p_file_size?: number
          p_mime_type?: string
          p_monthly_report_id: string
        }
        Returns: {
          drive_file_id: string | null
          drive_file_url: string
          file_format: string
          file_name: string
          file_size: number | null
          generated_at: string
          generated_by: string
          is_current: boolean
          mime_type: string | null
          monthly_report_id: string
          report_file_id: string
          signature_token: string
          version_no: number
        }
        SetofOptions: {
          from: "*"
          to: "trx_monthly_report_file"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      fn_monthly_report_return_to_draft: {
        Args: { p_monthly_report_id: string; p_notes: string }
        Returns: {
          created_at: string
          created_by: string
          monthly_report_id: string
          report_month: number
          report_year: number
          scope_functloc_id: string
          signature_token: string | null
          signer_name: string | null
          signer_position: string | null
          status: string
          submitted_at: string | null
          submitted_by: string | null
          updated_at: string
          updated_by: string | null
          verification_notes: string | null
          verified_at: string | null
          verified_by: string | null
          verified_role: string | null
        }
        SetofOptions: {
          from: "*"
          to: "trx_monthly_report"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      fn_monthly_report_review: {
        Args: {
          p_action: string
          p_monthly_report_id: string
          p_notes?: string
        }
        Returns: {
          created_at: string
          created_by: string
          monthly_report_id: string
          report_month: number
          report_year: number
          scope_functloc_id: string
          signature_token: string | null
          signer_name: string | null
          signer_position: string | null
          status: string
          submitted_at: string | null
          submitted_by: string | null
          updated_at: string
          updated_by: string | null
          verification_notes: string | null
          verified_at: string | null
          verified_by: string | null
          verified_role: string | null
        }
        SetofOptions: {
          from: "*"
          to: "trx_monthly_report"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      fn_monthly_report_submit: {
        Args: { p_monthly_report_id: string }
        Returns: {
          created_at: string
          created_by: string
          monthly_report_id: string
          report_month: number
          report_year: number
          scope_functloc_id: string
          signature_token: string | null
          signer_name: string | null
          signer_position: string | null
          status: string
          submitted_at: string | null
          submitted_by: string | null
          updated_at: string
          updated_by: string | null
          verification_notes: string | null
          verified_at: string | null
          verified_by: string | null
          verified_role: string | null
        }
        SetofOptions: {
          from: "*"
          to: "trx_monthly_report"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      fn_my_assignments: {
        Args: never
        Returns: {
          assignment_id: string
          functloc_id: string
          include_children: boolean
          is_primary: boolean
          nlevel: number
          role_code: string
          role_name: string
          unit_name: string
          valid_from: string
          valid_until: string
        }[]
      }
      fn_my_profile: {
        Args: never
        Returns: {
          default_functloc_id: string
          default_unit_name: string
          email: string
          employee_id: string
          full_name: string
          is_active: boolean
          position_name: string
          user_id: string
        }[]
      }
      fn_my_unit_users: {
        Args: never
        Returns: {
          default_functloc_id: string
          default_unit_name: string
          email: string
          employee_id: string
          full_name: string
          is_active: boolean
          position_name: string
          roles: string
          user_id: string
        }[]
      }
      fn_omc_recent_gangguan: {
        Args: { p_end_date?: string; p_limit?: number; p_start_date?: string }
        Returns: {
          aging_minutes: number
          annunciator_name: string
          bay_name: string
          customer_outage_duration_min: number
          ens_kwh: number
          event_date: string
          event_id: string
          event_no: string
          event_time: string
          fault_current_n_a: number
          fault_current_r_a: number
          fault_current_s_a: number
          fault_current_t_a: number
          final_supply_normalized: boolean
          gi_name: string
          outage_duration_min: number
          penyulang_id: string
          penyulang_name: string
          phase_label: string
          pmt_condition_duration_min: number
          pmt_counter_after: number
          pmt_status_name: string
          record_status: string
          record_status_name: string
          recovery_date: string
          recovery_time: string
          relay_indication: string
          supply_status_code: string
          supply_status_name: string
          ulp_code: string
          ultg_name: string
          up3_code: string
          wilayah_penyaluran: string
        }[]
      }
      fn_register_telegram_gi_channel: {
        Args: {
          p_channel_value: string
          p_external_id: string
          p_functloc_id: string
        }
        Returns: Json
      }
      fn_register_telegram_group_gi_channel: {
        Args: { p_chat_id: number; p_chat_title: string; p_functloc_id: string }
        Returns: Json
      }
      fn_save_transformer_feeder_bay_mapping: {
        Args: {
          p_feeder_bay_functloc_id: string
          p_notes?: string
          p_transformer_id: string
          p_valid_from?: string
        }
        Returns: Json
      }
      fn_set_my_telegram_operator_pin: {
        Args: { p_pin: string }
        Returns: Json
      }
      fn_start_telegram_group_operator_session: {
        Args: {
          p_chat_id: number
          p_telegram_user_id: number
          p_user_id: string
        }
        Returns: Json
      }
      fn_start_telegram_operator_session: {
        Args: {
          p_chat_id: number
          p_pin: string
          p_telegram_user_id: number
          p_user_id: string
        }
        Returns: Json
      }
      fn_start_telegram_operator_session_auth: {
        Args: {
          p_chat_id: number
          p_telegram_user_id: number
          p_user_id: string
        }
        Returns: Json
      }
      fn_start_telegram_supabase_auth_session: {
        Args: { p_telegram_user_id: number; p_user_id: string }
        Returns: Json
      }
      fn_telegram_end_operator_session: {
        Args: { p_chat_id: number; p_telegram_user_id: number }
        Returns: Json
      }
      fn_telegram_get_operator_session: {
        Args: { p_chat_id: number; p_telegram_user_id: number }
        Returns: Json
      }
      fn_telegram_gi_operator_candidates: {
        Args: { p_telegram_user_id: number }
        Returns: {
          employee_id: string
          full_name: string
          position_name: string
          role_codes: string
          user_id: string
        }[]
      }
      fn_telegram_group_gi_list: {
        Args: { p_chat_id: number }
        Returns: {
          functloc_id: string
          location_name: string
          short_name: string
        }[]
      }
      fn_telegram_group_user_allowed: {
        Args: { p_chat_id: number; p_user_id: string }
        Returns: Json
      }
      fn_telegram_start_operator_session: {
        Args: {
          p_chat_id: number
          p_pin: string
          p_telegram_user_id: number
          p_user_id: string
        }
        Returns: Json
      }
      fn_telegram_user_can_operate: {
        Args: { p_user_id: string }
        Returns: Json
      }
      fn_telegram_user_hierarchy: {
        Args: { p_user_id: string }
        Returns: {
          bay_flc: string
          bay_name: string
          gi_flc: string
          gi_name: string
          penyulang_code: string
          penyulang_id: string
          penyulang_name: string
          ultg_flc: string
          ultg_name: string
        }[]
      }
      fn_transformer_fault_exposure: {
        Args: { p_end_date?: string; p_start_date?: string }
        Returns: {
          event_count: number
          feeder_count: number
          gi_name: string
          max_fault_current_a: number
          max_fault_current_n_a: number
          max_fault_current_r_a: number
          max_fault_current_s_a: number
          max_fault_current_t_a: number
          max_fault_multiple: number
          rated_power_mva: number
          rated_secondary_current_a: number
          techidentno: string
          top_feeder_event_count: number
          top_feeder_name: string
          total_ens_kwh: number
          transformer_bay_name: string
          transformer_id: string
        }[]
      }
      fn_transformer_fault_exposure_coverage: {
        Args: { p_end_date?: string; p_start_date?: string }
        Returns: {
          coverage_percent: number
          mapped_gangguan: number
          total_gangguan: number
          unmapped_gangguan: number
        }[]
      }
      fn_transformer_fault_exposure_coverage_v2: {
        Args: {
          p_bay_flc?: string
          p_end_date?: string
          p_gi_flc?: string
          p_penyulang_id?: string
          p_start_date?: string
          p_ultg_flc?: string
        }
        Returns: {
          coverage_percent: number
          mapped_gangguan: number
          total_gangguan: number
          unmapped_gangguan: number
        }[]
      }
      fn_transformer_fault_exposure_v2: {
        Args: {
          p_bay_flc?: string
          p_end_date?: string
          p_gi_flc?: string
          p_penyulang_id?: string
          p_start_date?: string
          p_ultg_flc?: string
        }
        Returns: {
          event_count: number
          feeder_count: number
          gi_name: string
          max_fault_current_a: number
          max_fault_current_n_a: number
          max_fault_current_r_a: number
          max_fault_current_s_a: number
          max_fault_current_t_a: number
          max_fault_multiple: number
          rated_power_mva: number
          rated_secondary_current_a: number
          techidentno: string
          top_feeder_event_count: number
          top_feeder_name: string
          total_ens_kwh: number
          transformer_bay_name: string
          transformer_id: string
        }[]
      }
      fn_unlink_my_telegram_account: { Args: never; Returns: Json }
      fn_user_can_access_functloc: {
        Args: { p_target_functloc_id: string; p_user_id: string }
        Returns: boolean
      }
      fn_user_display_name: { Args: { p_user_id: string }; Returns: string }
      fn_user_has_role_at_functloc: {
        Args: {
          p_role_code: string
          p_target_functloc_id: string
          p_user_id: string
        }
        Returns: boolean
      }
      fn_user_is_super_admin: { Args: { p_user_id: string }; Returns: boolean }
      opg_admin_assign_role: {
        Args: {
          p_include_children?: boolean
          p_is_primary?: boolean
          p_notes?: string
          p_role_code: string
          p_scope_functloc_id?: string
          p_user_id: string
          p_valid_from?: string
          p_valid_until?: string
        }
        Returns: {
          assignment_id: string
          created_at: string
          created_by: string | null
          include_children: boolean
          is_active: boolean
          is_primary: boolean
          notes: string | null
          role_id: string
          scope_functloc_id: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          valid_from: string | null
          valid_until: string | null
        }
        SetofOptions: {
          from: "*"
          to: "opg_user_role_assignment"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      opg_admin_deactivate_assignment: {
        Args: { p_assignment_id: string; p_notes?: string }
        Returns: {
          assignment_id: string
          created_at: string
          created_by: string | null
          include_children: boolean
          is_active: boolean
          is_primary: boolean
          notes: string | null
          role_id: string
          scope_functloc_id: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          valid_from: string | null
          valid_until: string | null
        }
        SetofOptions: {
          from: "*"
          to: "opg_user_role_assignment"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      opg_admin_list_users: {
        Args: {
          p_limit?: number
          p_offset?: number
          p_organization_id?: string
          p_search?: string
          p_status_code?: string
          p_user_type_code?: string
        }
        Returns: {
          assignment_count: number
          auth_created_at: string
          avatar_path: string
          display_name: string
          email: string
          employee_id: string
          full_name: string
          job_code: string
          job_id: string
          job_name: string
          last_sign_in_at: string
          organization_code: string
          organization_id: string
          organization_name: string
          organization_type: string
          phone_number: string
          primary_role_code: string
          primary_role_name: string
          primary_scope_functloc_id: string
          primary_scope_name: string
          status_code: string
          telegram_user_id: number
          telegram_username: string
          user_id: string
          user_type_code: string
        }[]
      }
      opg_admin_set_user_status: {
        Args: { p_status_code: string; p_user_id: string }
        Returns: {
          avatar_path: string | null
          created_at: string
          created_by: string | null
          default_functloc_id: string | null
          display_name: string | null
          employee_id: string | null
          full_name: string
          job_id: string | null
          organization_id: string | null
          phone_number: string | null
          status_code: string
          telegram_user_id: number | null
          telegram_username: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          user_type_code: string
        }
        SetofOptions: {
          from: "*"
          to: "opg_user_profile"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      opg_admin_upsert_user_profile: {
        Args: {
          p_avatar_path?: string
          p_display_name?: string
          p_employee_id: string
          p_full_name: string
          p_job_id?: string
          p_organization_id?: string
          p_phone_number?: string
          p_status_code?: string
          p_telegram_user_id?: number
          p_telegram_username?: string
          p_user_id: string
          p_user_type_code?: string
        }
        Returns: {
          avatar_path: string | null
          created_at: string
          created_by: string | null
          default_functloc_id: string | null
          display_name: string | null
          employee_id: string | null
          full_name: string
          job_id: string | null
          organization_id: string | null
          phone_number: string | null
          status_code: string
          telegram_user_id: number | null
          telegram_username: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          user_type_code: string
        }
        SetofOptions: {
          from: "*"
          to: "opg_user_profile"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      opg_admin_user_assignments: {
        Args: { p_include_inactive?: boolean; p_user_id: string }
        Returns: {
          assignment_id: string
          created_at: string
          include_children: boolean
          is_active: boolean
          is_primary: boolean
          notes: string
          role_code: string
          role_id: string
          role_name: string
          role_scope_level: string
          scope_functloc_id: string
          scope_name: string
          updated_at: string
          valid_from: string
          valid_until: string
        }[]
      }
      opg_assert_admin_user_management: { Args: never; Returns: undefined }
      opg_fn_access_roles: {
        Args: never
        Returns: {
          can_be_primary: boolean
          description: string
          is_business_role: boolean
          is_system_role: boolean
          role_code: string
          role_id: string
          role_level: number
          role_name: string
          scope_level: string
          sort_order: number
        }[]
      }
      opg_fn_app_modules: {
        Args: { p_navigation_only?: boolean }
        Returns: {
          allowed_scope_levels: string[]
          description: string
          icon_key: string
          is_navigation: boolean
          is_system_module: boolean
          module_code: string
          module_group: string
          module_id: string
          module_name: string
          requires_scope: boolean
          route_path: string
          sort_order: number
        }[]
      }
      opg_fn_can_current_user: {
        Args: { p_action_code: string; p_module_code: string }
        Returns: boolean
      }
      opg_fn_can_current_user_approve: {
        Args: {
          p_action_code: string
          p_module_code: string
          p_source_scope_functloc_id: string
          p_source_scope_level: string
        }
        Returns: boolean
      }
      opg_fn_eligible_approvers: {
        Args: {
          p_action_code: string
          p_module_code: string
          p_source_scope_functloc_id: string
          p_source_scope_level: string
        }
        Returns: {
          approval_rule_id: string
          approver_scope_functloc_id: string
          approver_scope_name: string
          assignment_id: string
          display_name: string
          full_name: string
          is_primary: boolean
          role_code: string
          role_name: string
          user_id: string
        }[]
      }
      opg_fn_is_admin: { Args: { p_user_id?: string }; Returns: boolean }
      opg_fn_is_admin_or_super_admin: {
        Args: { p_user_id?: string }
        Returns: boolean
      }
      opg_fn_is_super_admin: { Args: { p_user_id?: string }; Returns: boolean }
      opg_fn_my_assignments: {
        Args: never
        Returns: {
          assignment_id: string
          include_children: boolean
          is_active: boolean
          is_primary: boolean
          role_code: string
          role_id: string
          role_level: number
          role_name: string
          role_scope_level: string
          scope_functloc_id: string
          scope_name: string
          valid_from: string
          valid_until: string
        }[]
      }
      opg_fn_my_module_access: {
        Args: never
        Returns: {
          can_approve: boolean
          can_create: boolean
          can_export: boolean
          can_manage: boolean
          can_submit: boolean
          can_update: boolean
          can_verify: boolean
          can_view: boolean
          icon_key: string
          module_code: string
          module_group: string
          module_id: string
          module_name: string
          route_path: string
          sort_order: number
        }[]
      }
      opg_fn_my_preference: {
        Args: never
        Returns: {
          default_page_size: number
          locale: string
          preferences: Json
          sidebar_collapsed: boolean
          theme: string
          timezone: string
          updated_at: string
          user_id: string
        }[]
      }
      opg_fn_my_profile: {
        Args: never
        Returns: {
          avatar_path: string
          created_at: string
          display_name: string
          email: string
          employee_id: string
          full_name: string
          job_code: string
          job_id: string
          job_name: string
          job_short_name: string
          organization_code: string
          organization_id: string
          organization_name: string
          organization_short_name: string
          organization_type: string
          phone_number: string
          status_code: string
          telegram_user_id: number
          telegram_username: string
          updated_at: string
          user_id: string
          user_type_code: string
        }[]
      }
      opg_fn_resolve_approver_scope: {
        Args: {
          p_explicit_scope_functloc_id?: string
          p_scope_relation: string
          p_source_scope_functloc_id: string
        }
        Returns: string
      }
      opg_fn_scope_descendants: {
        Args: { p_scope_functloc_id: string }
        Returns: {
          depth: number
          functloc_id: string
          location_name: string
          parent_scope_functloc_id: string
          scope_level: string
        }[]
      }
      opg_fn_scope_hierarchy: {
        Args: never
        Returns: {
          functloc_id: string
          gi_functloc_id: string
          location_name: string
          parent_scope_functloc_id: string
          scope_level: string
          sort_key: string
          ultg_functloc_id: string
          upt_functloc_id: string
        }[]
      }
      opg_fn_set_my_theme: {
        Args: { p_theme: string }
        Returns: {
          theme: string
          updated_at: string
          user_id: string
        }[]
      }
      opg_fn_user_detail_assignments: {
        Args: { p_include_inactive?: boolean; p_user_id: string }
        Returns: {
          assignment_id: string
          created_at: string
          include_children: boolean
          is_active: boolean
          is_primary: boolean
          notes: string
          role_code: string
          role_id: string
          role_name: string
          role_scope_level: string
          scope_functloc_id: string
          scope_name: string
          updated_at: string
          valid_from: string
          valid_until: string
        }[]
      }
      opg_fn_user_detail_capabilities: {
        Args: { p_target_user_id: string }
        Returns: {
          can_add_role: boolean
          can_change_status: boolean
          can_deactivate_assignment: boolean
          can_delete_assignment: boolean
          can_edit_contact: boolean
          can_edit_organization: boolean
          can_edit_personal: boolean
          can_password_recovery: boolean
          is_admin: boolean
          is_self: boolean
          is_super_admin: boolean
          target_user_id: string
          viewer_user_id: string
        }[]
      }
      opg_fn_user_effective_scopes: {
        Args: { p_user_id: string }
        Returns: {
          assigned_scope_functloc_id: string
          assigned_scope_level: string
          assigned_scope_name: string
          assignment_id: string
          depth: number
          effective_scope_functloc_id: string
          effective_scope_level: string
          effective_scope_name: string
          include_children: boolean
          is_primary: boolean
          role_code: string
          role_id: string
          role_name: string
        }[]
      }
      opg_superadmin_force_delete_v2_user: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      opg_user_detail_assign_role: {
        Args: {
          p_include_children?: boolean
          p_is_primary?: boolean
          p_notes?: string
          p_role_code: string
          p_scope_functloc_id?: string
          p_user_id: string
          p_valid_from?: string
          p_valid_until?: string
        }
        Returns: {
          assignment_id: string
          created_at: string
          created_by: string | null
          include_children: boolean
          is_active: boolean
          is_primary: boolean
          notes: string | null
          role_id: string
          scope_functloc_id: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          valid_from: string | null
          valid_until: string | null
        }
        SetofOptions: {
          from: "*"
          to: "opg_user_role_assignment"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      opg_user_detail_deactivate_assignment: {
        Args: { p_assignment_id: string; p_notes?: string }
        Returns: {
          assignment_id: string
          created_at: string
          created_by: string | null
          include_children: boolean
          is_active: boolean
          is_primary: boolean
          notes: string | null
          role_id: string
          scope_functloc_id: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          valid_from: string | null
          valid_until: string | null
        }
        SetofOptions: {
          from: "*"
          to: "opg_user_role_assignment"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      opg_user_detail_delete_assignment: {
        Args: { p_assignment_id: string }
        Returns: string
      }
      opg_user_detail_set_status: {
        Args: { p_status_code: string; p_user_id: string }
        Returns: {
          avatar_path: string | null
          created_at: string
          created_by: string | null
          default_functloc_id: string | null
          display_name: string | null
          employee_id: string | null
          full_name: string
          job_id: string | null
          organization_id: string | null
          phone_number: string | null
          status_code: string
          telegram_user_id: number | null
          telegram_username: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          user_type_code: string
        }
        SetofOptions: {
          from: "*"
          to: "opg_user_profile"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      opg_user_detail_update_contact: {
        Args: {
          p_phone_number?: string
          p_telegram_user_id?: number
          p_telegram_username?: string
          p_user_id: string
        }
        Returns: {
          avatar_path: string | null
          created_at: string
          created_by: string | null
          default_functloc_id: string | null
          display_name: string | null
          employee_id: string | null
          full_name: string
          job_id: string | null
          organization_id: string | null
          phone_number: string | null
          status_code: string
          telegram_user_id: number | null
          telegram_username: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          user_type_code: string
        }
        SetofOptions: {
          from: "*"
          to: "opg_user_profile"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      opg_user_detail_update_organization: {
        Args: {
          p_organization_id?: string
          p_user_id: string
          p_user_type_code?: string
        }
        Returns: {
          avatar_path: string | null
          created_at: string
          created_by: string | null
          default_functloc_id: string | null
          display_name: string | null
          employee_id: string | null
          full_name: string
          job_id: string | null
          organization_id: string | null
          phone_number: string | null
          status_code: string
          telegram_user_id: number | null
          telegram_username: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          user_type_code: string
        }
        SetofOptions: {
          from: "*"
          to: "opg_user_profile"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      opg_user_detail_update_personal: {
        Args: {
          p_display_name?: string
          p_employee_id: string
          p_full_name: string
          p_job_id?: string
          p_user_id: string
        }
        Returns: {
          avatar_path: string | null
          created_at: string
          created_by: string | null
          default_functloc_id: string | null
          display_name: string | null
          employee_id: string | null
          full_name: string
          job_id: string | null
          organization_id: string | null
          phone_number: string | null
          status_code: string
          telegram_user_id: number | null
          telegram_username: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          user_type_code: string
        }
        SetofOptions: {
          from: "*"
          to: "opg_user_profile"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      opg_user_import_add_only_assignment: {
        Args: {
          p_include_children?: boolean
          p_is_primary?: boolean
          p_notes?: string
          p_role_code: string
          p_scope_functloc_id?: string
          p_user_id: string
          p_valid_from?: string
          p_valid_until?: string
        }
        Returns: {
          assignment_id: string
          created_at: string
          created_by: string | null
          include_children: boolean
          is_active: boolean
          is_primary: boolean
          notes: string | null
          role_id: string
          scope_functloc_id: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          valid_from: string | null
          valid_until: string | null
        }
        SetofOptions: {
          from: "*"
          to: "opg_user_role_assignment"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      opg_user_management_provision_profile: {
        Args: {
          p_display_name?: string
          p_employee_id: string
          p_full_name: string
          p_job_id?: string
          p_organization_id?: string
          p_phone_number?: string
          p_status_code?: string
          p_telegram_user_id?: number
          p_telegram_username?: string
          p_user_id: string
          p_user_type_code?: string
        }
        Returns: {
          avatar_path: string | null
          created_at: string
          created_by: string | null
          default_functloc_id: string | null
          display_name: string | null
          employee_id: string | null
          full_name: string
          job_id: string | null
          organization_id: string | null
          phone_number: string | null
          status_code: string
          telegram_user_id: number | null
          telegram_username: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          user_type_code: string
        }
        SetofOptions: {
          from: "*"
          to: "opg_user_profile"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
