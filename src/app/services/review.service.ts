import { Injectable } from "@angular/core";
import { BaseUrlService } from "./base_url.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";




@Injectable({
    providedIn: 'root'
})
export class ReviewAPIService {

    constructor(
        private baseUrlService: BaseUrlService,
        private httpClient: HttpClient
    ) { }

    async findAll() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'Review/findAll'));
    }

    async findById(id: string) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'Review/findById/' + id,{}));
    }

    async create(formData: FormData) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'Review/AddReview', formData));
    }

    async update(formData: FormData) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'Review/UpdateReview', formData));
    }

    async delete(id: string) {
        return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'Review/delete/' + id,{}));
    }

    async findAllDeleted() {
        return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'Review/findAllDeleted'));
    }

    async recover(id: string) {
        return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'Review/recover/' + id, {}));
    }
}
