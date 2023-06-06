import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Post } from '../_models/post';

@Injectable({ providedIn: 'root' })
export class PostService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(`${environment.APIUrl}/api/posts`);
    }

    save(post : Post) {
       return this.http
      .post<any>(`${environment.APIUrl}/api/posts`, post);
    }
}