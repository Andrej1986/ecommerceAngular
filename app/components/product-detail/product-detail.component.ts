import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const hasId: boolean = this.route.snapshot.paramMap.has('id');
      if (hasId) {
        this.productService.getProductById(+this.route.snapshot.paramMap.get('id')!).subscribe(
          data => {
            this.product = data;
          }
        )
      }
    })
  }

}
