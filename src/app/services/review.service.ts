import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { reviewDto } from "../DTO/reviewDto.dto copy";



@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async findAll() {
        return lastValueFrom(this.httpClient.get<reviewDto[]>(this.baseUrlService.BaseUrl + 'review/findAll'));
    }

    async findByKeyword(keyword: string) {
        return lastValueFrom(this.httpClient.get<reviewDto[]>(this.baseUrlService.BaseUrl + 'review/findByKeyword/' + keyword));
    }

    async findById(id: string) {
        return lastValueFrom(this.httpClient.get<reviewDto>(this.baseUrlService.BaseUrl + 'review/find/' + id));
    }
}
