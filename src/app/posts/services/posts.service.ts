import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "../interfaces/post.model";
import { Router } from "@angular/router";

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

  constructor(private http: HttpClient, private router: Router) {}

  // Reaches out to BE to get some JSON.
  getPosts() {
    // Spread is doing the same thing as
    // let posts = this.posts;
    // return posts;
    this.http
      .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    // Tells the system that we will need to be observing for changes
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      "http://localhost:3000/api/posts/" + id
    );
  }

  addPost(title: string, content: string) {
    // Create a local object with the args
    const post: Post = { id: null, title, content };
    this.http
      .post<{ message: string; postId: string }>(
        "http://localhost:3000/api/posts",
        post
      )
      .subscribe((responseData) => {
        console.log(responseData);
        const postId = responseData.postId;
        post.id = postId;
        // Push the Post obj to this service's posts property,
        // which the service instance manages for the app.
        this.posts.push(post);

        // Feeds a new value to the Subject to be
        // multicasted to Observers in the app that are
        // registered to listen to this subject.
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id, title, content };
    this.http
      .put("http://localhost:3000/api/posts/" + id, post)
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
