import { AfterViewChecked, AfterViewInit, Component, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit, AfterViewChecked {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  productCategoryName: string;
  searchMode: boolean = false;
  modalRef: BsModalRef;
  product: Product;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
    private route: ActivatedRoute, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    this.productCategoryName = this.route.snapshot.paramMap.get('name')!;
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
      this.previousCategoryId = this.currentCategoryId;
      console.log(`curentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
    }
    this.productService.getProductListPaginate(this.currentCategoryId, this.thePageNumber - 1, this.thePageSize).subscribe(
      data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      }
    )
  }

  handleSearchProducts() {
    const theKeyword = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  ngAfterViewInit(): void {
    console.log(this.route.snapshot.url);
  }

  ngAfterViewChecked(): void {
      window.scroll(0, 0);
  }


  openModalWithClass(template: TemplateRef<any>, product: Product) {
    this.product = product;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  updatePageSize(pageSize: number){
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }
}
