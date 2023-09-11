import { Component } from '@angular/core';
import { UserSchema } from '../users.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
 user:UserSchema={}

 constructor(private api:ApiService)
 {
 }
 adduser(){
  this.api.addUser(this.user).subscribe({
   next:(res:any)=>{
    console.log(res);
    alert("New User Added Successfully")
   },
   error:(err:any)=>{
    console.log(err);
    alert("Cannot perform the action now!!!")
   }
  })
  }
  cancel(){
    this.user={}
  }
 }
