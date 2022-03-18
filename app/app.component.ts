import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  title = 'ecommerce';

  constructor(private route: ActivatedRoute){};

  ngAfterViewInit(): void {
    console.log(this.route.snapshot.url);
  }
  
}
