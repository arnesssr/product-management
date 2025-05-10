export interface StoreConfig {
  businessName: string;
  logoUrl?: string;
  contactEmail: string;
  phoneNumber?: string;
  address?: string;
}

// Default configuration
export const defaultStoreConfig: StoreConfig = {
  businessName: "My Store",
  contactEmail: "contact@example.com",
}

// Helper to get store config
export function getStoreConfig(): StoreConfig {
  const stored = localStorage.getItem('store_config')
  return stored ? JSON.parse(stored) : defaultStoreConfig
}
