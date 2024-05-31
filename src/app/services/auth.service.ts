import { Injectable, inject, signal } from "@angular/core"
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from "@angular/fire/auth"
import { Observable, from } from "rxjs"
import { User } from "../user.interface"

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private firebaseAuth = inject(Auth)
  public user$ = user(this.firebaseAuth)
  public currentUserSignal = signal<User | undefined | null>(undefined)

  register(
    username: string,
    email: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) => 
      updateProfile(response.user, { displayName: username })
    )

    return from(promise)
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {})
    return from(promise)
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth)
    return from(promise)
  }
}