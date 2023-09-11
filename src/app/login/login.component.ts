import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // property
  email:string=""
  password:string=""

  constructor(private api:ApiService, private loginRouter:Router){}
  login()
  {
    if(this.email && this.password)
    {
      // cmpre them with admin details....
      // for that we should get admin details from server localhost 3000/users/1
      // hence api calling is required
     this.api.adminDetails().subscribe({
      next:(result:any)=>{
        console.log(result);
             // cmpre them with admin details....

             if(this.email===result.email&&this.password===result.password)
             {
              // save details in local storage
              localStorage.setItem("admin-name",result.name)
              localStorage.setItem("admin-pswd",result.password)

              alert(`Authorisation Successfull`)
              // navigate to homepage - router class
              this.loginRouter.navigateByUrl('home')
             }
             else{
              alert`Invalid Credentials!!`
             }
        
      },
      error:(result:any)=>{
        console.log(result);
        alert(`Error while fetching data! Try again after sometimes`)
      }
     })
    }
    else{
      alert(`Please fill the form`)
    }
  }
}
