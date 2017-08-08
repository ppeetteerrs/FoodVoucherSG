export interface CardOut {
    ownerName: string;
    ownerLocation: string;
    quotaPerMonth: number;
    quotaPerDay: number;
    enabled: boolean;
}

export interface CardIn {
    charityName: string;
    charityID: string;
    creatorName: string;
    creatorID: string;
    ownerName: string;
    ownerLocation: string;
    quotaPerMonth: number;
    quotaPerDay: number;
    redeemedToday: number;
    redeemedThisMonth: number;
    batchUID: string;
    enabled: boolean;
    barcode: number;
    id?: string
}