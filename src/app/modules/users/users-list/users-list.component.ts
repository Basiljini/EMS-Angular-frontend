import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserSchema } from '../users.model';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  allUsers:UserSchema[]=[]
  searchKey:string=""
  page: number =1;
  count: number = 0;
  tablesize: number = 5;
  constructor(private api:ApiService){}

      // when userlist page is openend call getUserList()

    ngOnInit(): void {
      this.getUserList()
    }
 
  getUserList()
  {
    this.api.getallusers().subscribe({
      next:(result:any)=>{
        console.log(result);
        this.allUsers=result;
        this.count=this.allUsers.length
      },
      error:(result:any)=>{
        console.log(result);
        alert(`Error while fetching data...Try again later`)
        
      }
    })
  }
  deleteuser(id:any){
    this.api.deleteuser(id).subscribe({
      next:(res:any)=>{
        console.log("Succesfully removed");
        this.getUserList()
      },
      error:(err:any)=>{
        console.log(err);
        alert("Can't perform this action now...")
      }
    })
  }

  sortById(){
    this.allUsers.sort((a:any,b:any)=>a.id-b.id)
    console.log(this.allUsers);
    
  }
  sortByName(){
    this.allUsers.sort((a:any,b:any)=>a["name"].localeCompare(b["name"]))
  }
  onTableDataChange(event:any){
    this.page=event;
    // this.getUserList();
  }
  generatePDF(){
    let pdf = new jspdf();
    let head  = [['User Id','Username','Email','Status']]
    let body:any = []
    this.allUsers.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.active])
    })
    pdf.setFontSize(16);
    pdf.text("ALL EMPLOYEE LIST",10,10);
    autoTable(pdf,{head,body});
    pdf.output('dataurlnewwindow');
    pdf.save("allusers.pdf")
  }
}
