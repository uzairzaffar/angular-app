import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Router } from '@angular/router';
import { Post } from '../_models/post';
import { User } from '../_models/user';
import { PostService } from '../_services/post.service';
import { PostFormDialog } from './form/post-form-dialog';
import { AuthenticationService } from '../_services/authentication.service';
import { MatDialog } from '@angular/material/dialog';

@Component({ templateUrl: 'post.component.html' })
export class PostComponent {
    loading = false;
    posts: Post[];
    currentUser: User;
    
    constructor(private postService: PostService,
        private router: Router,
        private authenticationService: AuthenticationService,
        public dialog: MatDialog) { 
			this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
		}

    ngOnInit() {
        this.loading = true;
        this.postService.getAll().pipe(first()).subscribe(content => {
            this.loading = false;
            this.posts = content.data;
        });
    }
    
     logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    
    createPost() {
        this.dialog.open(PostFormDialog, {
      width: '1000px',
    })
	}
}