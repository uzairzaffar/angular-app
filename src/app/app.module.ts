import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// used to create fake backend
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

import { PostComponent } from './post/post.component';
import { PostFormDialog } from './post/form/post-form-dialog';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    declarations: [
        AppComponent,
        PostComponent,
        LoginComponent,
        PostFormDialog
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
