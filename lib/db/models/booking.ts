export type Booking = {
    id: number,
    check_in_date: Date,
    check_out_date: Date,
    total_price: number,
    property: {
        id: number,
        title: string,
        price: number
    }
}