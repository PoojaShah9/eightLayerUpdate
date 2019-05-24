import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {


  finalData:any
  enterpriseCount:any;
  showSpinner:boolean = false;
  userName:any;

  constructor(private httpClient: HttpClient,private router: Router) { }

  sessionStorage():any{

      localStorage.removeItem("accessToken");
      localStorage.removeItem("loginUser");
      this.router.navigateByUrl('/');
     }


  ngOnInit() {

    console.log("child component is calling");
    this.showSpinner = true;
    this.httpClient.get('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/',
    {
      headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
    })
    .subscribe(data => {
   console.log("data = ",data);
     this.finalData = data
     this.enterpriseCount = this.finalData.data.length
     this.userName =  localStorage.getItem("loginUser");//this.finalData.data[0].entname
    
    console.log(this.userName);
      this.showSpinner = false;
    }, 
    (error: any) => {
    // this.router.navigateByUrl('/');
     console.log("error = " + error);
   
   })

  }

}
