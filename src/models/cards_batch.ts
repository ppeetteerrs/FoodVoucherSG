export interface CardsBatchOut {
    charityID: string;
    creatorID: string;
    createdAt: Date;
    amount: number;
    quotaPerMonth: number;
    quotaPerDay: number;
}

export interface CardsBatchIn {
    charityName: string;
    charityEmail: string;
    creatorName: string;
    charityID: string;
    creatorID: string;
    createdAt: Date;
    amount: number;
    quotaPerMonth: number;
    quotaPerDay: number;
    id: string
}