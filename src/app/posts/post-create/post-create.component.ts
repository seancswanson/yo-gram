import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "../interfaces/post.model";
import { PostsService } from "../services/posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
})
export class PostCreateComponent {
  index = 1;
  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    let index = 1;
    // Is the form valid? If not, return and cancel operation.
    if (!form.valid) {
      return;
    }

    // Send the title and content to the service to create a post.
    this.postsService.addPost(this.index, form.value.title, form.value.content);
    this.index++;
    form.resetForm();
  }
}
