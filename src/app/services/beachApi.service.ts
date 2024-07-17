import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BeachDto } from "../DTO/beachDto.dto";

@Injectable({
    providedIn: 'root'
})
export class BeachApiService {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'beach/findAll'));
    }

    async findById(id: string) {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'beach/find/' + id));
    }

    async create(formData: FormData) {
        return lastValueFrom(this.httpClient.post<boolean>(this.baseUrlService.BaseUrl + 'beach/create', formData));
    }

    async update(formData: FormData) {
        return lastValueFrom(this.httpClient.put<boolean>(this.baseUrlService.BaseUrl + 'beach/update', formData));
    }

    async delete(id: number) {
        return lastValueFrom(this.httpClient.delete<boolean>(this.baseUrlService.BaseUrl + 'beach/delete/' + id));
    }

    async findAllDeleted() {
        return lastValueFrom(this.httpClient.get<BeachDto[]>(this.baseUrlService.BaseUrl + 'beach/findAllDeleted'));
    }

    async recover(id: number) {
        return lastValueFrom(this.httpClient.put<boolean>(this.baseUrlService.BaseUrl + 'beach/recover/' + id, {}));
    }
}