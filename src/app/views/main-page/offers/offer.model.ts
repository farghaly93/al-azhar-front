export class Offer {
  constructor(
    public id: number,
    public title: string,
    public activity: string,
    public type: string,
    public area: number,
    public price: number,
    public site: string,
    public negotiable: boolean,
    public desc: string,
    // public date: string
    ) {}
}

export interface OfferInterface {
    id: number,
    title: string,
    activity: string,
    type: string,
    area: number,
    price: number,
    site: string,
    negotiable: boolean,
    desc: string,
    updated_at: string,
    lat: number,
    lng: number
}
