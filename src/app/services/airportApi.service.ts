import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { AirportDto } from "../DTO/airportDto.dto";

@Injectable({
    providedIn: 'root'
})
export class AirportApiService {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'airport/findAll'));
    }

    async findById(id: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'airport/find/' + id));
    }

    async create(formData: FormData) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'airport/create', formData));
    }

    async update(formData: FormData) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'airport/update', formData));
    }

    async delete(id: string) {
        return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'airport/delete/' + id));
    }

    async findAllDeleted() {
        return lastValueFrom(this.httpClient.get<AirportDto[]>(this.baseUrlService.BaseUrl + 'airport/findAllDeleted'));
    }

    async recover(id: string) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'airport/recover/' + id, {}));
    }
}
