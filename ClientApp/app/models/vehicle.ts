import { KeyValuePair } from './vehicle';
export interface KeyValuePair {
    id: number;
    name: string;
}

export interface Contact {
    name: string;
    email: string;
    phone: string;    
}

export interface Vehicle {
    id: number;
    make: KeyValuePair;
    model: KeyValuePair;
    features: KeyValuePair[];
    contact: Contact;
    isRegistered: boolean;
    lastUpdate: string;
}

export interface SaveVehicle {
    id: number;
    makeId: number;
    modelId: number;
    features: number[];
    contact: Contact;
    isRegistered: boolean;
}