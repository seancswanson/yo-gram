import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../interfaces/post.model";
import { PostsService } from "../services/posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  // Creates a property that will be a Subscription.
  private postsSub: Subscription;
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    // Initialize posts on create.
    this.posts = this.postsService.getPosts();
    // Begin subscription to the posts observable.
    // When the subscription sees a new Post
    // object, it will update our master list of posts.
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    // If this component gets destroyed, make sure to
    // stop subscribing to prevent memory leaks.
    this.postsSub.unsubscribe();
  }
}
