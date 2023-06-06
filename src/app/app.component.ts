import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
import { MatDialog } from '@angular/material/dialog';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        public dialog: MatDialog
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
}