import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
     adminName:string=""
     totalUserCount:number=0

     constructor(private api:ApiService, private homeRouter:Router){
         
     }
     ngOnInit():void{
      if(localStorage.getItem("admin-name")){
        this.adminName = localStorage.getItem("admin-name") ||  ""
      }
      this.totalEmployee()
     }
     updateAdminName(event:any){
    console.log(event);
    this.adminName = event
     }

     totalEmployee()
     {
      this.api.getallusers().subscribe((res:any)=>{
        console.log(res);
        this.totalUserCount=res.length
      })
     }
     logout(){
      // remove data from local storage
      localStorage.removeItem("admin_name");
      localStorage.removeItem("admin_pswd")

      // redirect to login page
      this.homeRouter.navigateByUrl('')
     }
}
