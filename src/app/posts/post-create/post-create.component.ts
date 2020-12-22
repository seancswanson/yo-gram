import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "../interfaces/post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
})
export class PostCreateComponent {
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(form: NgForm) {
    // Is the form valid? If not, return and cancel operation.
    if (!form.valid) {
      return;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content,
    };

    this.postCreated.emit(post);
  }
}
