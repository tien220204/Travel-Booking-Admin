import { HotelDTO } from "./HotelDTO.dto";


export interface listHotelDto {
    result : HotelDTO[];
    totalPages : number;
    pageSize : number;
    totalItem : number;
}