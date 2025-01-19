import { Property } from "@/app/api/properties/route"

export type PropertiesImage = {
    id: number,
    property_id: number,
    image: string,
    created_at: Date,
}