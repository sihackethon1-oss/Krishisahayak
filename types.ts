
export enum AppView {
  DASHBOARD = 'dashboard',
  CROP_DOCTOR = 'crop_doctor',
  MARKET_RATES = 'market_rates',
  VOICE_ASSISTANT = 'voice_assistant',
  ADMIN = 'admin'
}

export interface SensorData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  moisture: number;
  temperature: number;
  timestamp: string;
}

export interface MarketRate {
  commodity: string;
  mandi: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  district: string;
}

export interface Diagnosis {
  disease: string;
  confidence: number;
  symptoms: string[];
  treatment: string;
  isPest: boolean;
}
