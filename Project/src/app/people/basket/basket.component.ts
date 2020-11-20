import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BasketService } from '../basket.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(private readonly basketService: BasketService) { }

  basketTab = [];

  basketSub: Subscription;
  onInputChange(e, i, id, item): void{
    this.basketTab[i].amount = e.target.value;
    this.basketService.updateItem(item, id)
  }

  ngOnInit(): void {
    this.basketSub = this.basketService.getItems().subscribe( (basket: any) => {
      this.basketTab = basket;
    });
  }

  onDeleteItem(itemId): void{
    this.basketService.removeItem(itemId);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.basketSub.unsubscribe();
  }
}
