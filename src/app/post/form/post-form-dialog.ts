import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PostService } from '../../_services/post.service';

@Component({
  selector: 'post-form-dialog',
  templateUrl: 'post-form-dialog.html',
})
export class PostFormDialog {
	    postForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private postService: PostService
    ) { 
        // redirect to home if already logged in
    }

    ngOnInit() {
        this.postForm = this.formBuilder.group({
            title: ['', Validators.required],
            content: ['', Validators.required]
        });

    }

    // convenience getter for easy access to form fields
    get f() { return this.postForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.postForm.invalid) {
            return;
        }

        this.loading = true;
         this.postService.save({title: this.f.title.value, content:this.f.content.value})
            .pipe(first())
            .subscribe(
                data => {
                    //this.router.navigate([this.returnUrl]);
                    console.log(data);
                    this.loading = false;
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    

    }

}
