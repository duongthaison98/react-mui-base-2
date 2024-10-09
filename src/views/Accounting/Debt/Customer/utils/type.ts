export interface Debt {
    id : number ;
    customer : string;
    debtReminderDate : string;
    lastestCollectionDate : string;
    staff : string;
    collectOpeningBalance : number;
    giveOpeningBalance : number;
    collectArising : number;
    giveArising : number;
    collectEndingBalance : number;
    giveEndingBalance : number;
    limit : number
    store : string | null;
}

export interface PaymentTerm {
    createDate : string | null;
    creator : string;
    paymentTerm : string | null;
    customer : string;
    bill : number;
    money : number ;
    discount : number;
    totalPaid : number;
    paid : number;
    stillOwed : number;
    store : string;
    phoneNumber : string;
    seller : string;
}