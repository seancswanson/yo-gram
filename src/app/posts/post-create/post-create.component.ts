import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
})
export class PostCreateComponent {
  newPost: string = '';
  onAddPost(postInput: HTMLTextAreaElement) {
    this.newPost = postInput.value;
  }
}
