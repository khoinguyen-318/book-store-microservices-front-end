import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  items!: MenuItem[];
  constructor(private router:Router,
              private route:ActivatedRoute){}
  ngOnInit(): void {
    this.items = [
      {
        label: 'Profile',
        command: ()=> this.showMyProfile(),
      },
      {
        label: 'My Order',
        command: ()=> this.showMyOrder(),
      },
    ];
  }
  showMyProfile() {
    this.router.navigate(['profile'],{relativeTo: this.route});
  }

  showMyOrder() {
    this.router.navigate([{ outlets: { child: 'my-order' } }]);
  }
}
