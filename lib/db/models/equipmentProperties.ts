import { Property } from "@/app/api/properties/route"
import { Equipment } from "./equipment"

export type EquipmentProperties = {
    id: number,
    property_id: number,
    equipment_id: number,
    property: Property[],
    equipment: Equipment[],
}