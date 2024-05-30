//Angular Tools
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

//Pages
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { AboutComponent } from './about/about.component'
import { ChecklistComponent } from './checklist/checklist.component'

//Dialogs
import { ExpenseFormComponent } from './dialogs/expense-form/expense-form.component'
import { ConfirmComponent } from './dialogs/confirm/confirm.component'

//Services/Guards
import { environment } from 'src/environments/environment'
import { AuthUserGuard } from './auth.user.guard'
import { AuthNonuserGuard } from './auth.nonuser.guard'

//Firebase
import { provideFirebaseApp } from '@angular/fire/app'
import { initializeApp } from 'firebase/app'
import { provideAuth } from '@angular/fire/auth'
import { getAuth } from 'firebase/auth'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { FIREBASE_OPTIONS } from '@angular/fire/compat'

//Angular Material
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatMenuModule } from '@angular/material/menu'
import { MatDialogModule } from '@angular/material/dialog'

//Pipes
import { NumbersOnlyPipe } from './numbers-only.pipe'
import { TwoDecimalPipe } from './two-decimal.pipe'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthNonuserGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [AuthNonuserGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthUserGuard] },
  { path: 'checklist', component: ChecklistComponent, canActivate: [AuthUserGuard] },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AboutComponent,
    ExpenseFormComponent,
    NumbersOnlyPipe,
    ConfirmComponent,
    TwoDecimalPipe,
    ChecklistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
