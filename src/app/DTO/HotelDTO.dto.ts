import { facilitiesDTO } from "./facilitiesDTO.dto"

export interface HotelDTO {
    hotelId : number;
    hotelName : string;
    hotelDescription : string;
    hotelPriceRange : string;
    hotelLocation : string;
    locationId : string;
    isHide : string;
    facilities : facilitiesDTO[];
    photoUrl : string;
}