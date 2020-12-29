import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Post } from "../interfaces/post.model";

// This is saying that this class will be injectable into any class
// component underneath the root through their constructor.
// Alternatively I could have decalred this in app.module.
@Injectable({
  providedIn: "root",
})
export class PostsService {
  private posts: Post[] = [];
  // postsUpdated is a Subject that will multicast its value to anyone who is
  // subscribed to it, like the postsSub in PostListComponent which passes
  // the data to PostListComponent.posts.
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  // Reaches out to BE to get some JSON.
  getPosts() {
    // Spread is doing the same thing as
    // let posts = this.posts;
    // return posts;
    this.http
      .get<{ message: string; posts: Post[] }>(
        "http://localhost:3000/api/posts"
      )
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    // Tells the system that we will need to be observing for changes
    return this.postsUpdated.asObservable();
  }

  addPost(id: number, title: string, content: string) {
    // Create a local object with the args
    const post: Post = { id, title, content };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe((responseData) => {
        console.log(responseData.message);

        // Push the Post obj to this service's posts property,
        // which the service instance manages for the app.
        this.posts.push(post);

        // Feeds a new value to the Subject to be
        // multicasted to Observers in the app that are
        // registered to listen to this subject.
        this.postsUpdated.next([...this.posts]);
      });
  }
}
