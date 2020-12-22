import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Post } from "../interfaces/post.model";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    // Spread is doing the same thing as
    // let posts = this.posts;
    // return posts;
    return [...this.posts];
  }

  getPostUpdateListener() {
    // Tells the system that we will need to be watching for changes
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    // Create a local object with the args
    const post: Post = { title, content };
    // Push the Post obj to this service's posts property,
    // which the service instance manages for the app.
    this.posts.push(post);
    // Feeds a new value to the Subject to be
    // multicasted to Observers in the app that are
    // registered to listen to this subject.
    this.postsUpdated.next([...this.posts]);
  }
}
