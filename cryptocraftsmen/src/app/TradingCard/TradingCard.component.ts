/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TradingCardService } from './TradingCard.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-tradingcard',
  templateUrl: './TradingCard.component.html',
  styleUrls: ['./TradingCard.component.css'],
  providers: [TradingCardService]
})
export class TradingCardComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  sportsCardId = new FormControl('', Validators.required);
  sportsCardName = new FormControl('', Validators.required);
  sportsCardDescription = new FormControl('', Validators.required);
  cardType = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  forTrade = new FormControl('', Validators.required);
  cardOwner = new FormControl('', Validators.required);

  constructor(public serviceTradingCard: TradingCardService, fb: FormBuilder) {
    this.myForm = fb.group({
      sportsCardId: this.sportsCardId,
      sportsCardName: this.sportsCardName,
      sportsCardDescription: this.sportsCardDescription,
      cardType: this.cardType,
      quantity: this.quantity,
      price: this.price,
      forTrade: this.forTrade,
      cardOwner: this.cardOwner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceTradingCard.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.cryptocraftsmen.biznet.TradingCard',
      'sportsCardId': this.sportsCardId.value,
      'sportsCardName': this.sportsCardName.value,
      'sportsCardDescription': this.sportsCardDescription.value,
      'cardType': this.cardType.value,
      'quantity': this.quantity.value,
      'price': this.price.value,
      'forTrade': this.forTrade.value,
      'cardOwner': this.cardOwner.value
    };

    this.myForm.setValue({
      'sportsCardId': null,
      'sportsCardName': null,
      'sportsCardDescription': null,
      'cardType': null,
      'quantity': null,
      'price': null,
      'forTrade': null,
      'cardOwner': null
    });

    return this.serviceTradingCard.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'sportsCardId': null,
        'sportsCardName': null,
        'sportsCardDescription': null,
        'cardType': null,
        'quantity': null,
        'price': null,
        'forTrade': null,
        'cardOwner': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.cryptocraftsmen.biznet.TradingCard',
      'sportsCardName': this.sportsCardName.value,
      'sportsCardDescription': this.sportsCardDescription.value,
      'cardType': this.cardType.value,
      'quantity': this.quantity.value,
      'price': this.price.value,
      'forTrade': this.forTrade.value,
      'cardOwner': this.cardOwner.value
    };

    return this.serviceTradingCard.updateAsset(form.get('sportsCardId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceTradingCard.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceTradingCard.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'sportsCardId': null,
        'sportsCardName': null,
        'sportsCardDescription': null,
        'cardType': null,
        'quantity': null,
        'price': null,
        'forTrade': null,
        'cardOwner': null
      };

      if (result.sportsCardId) {
        formObject.sportsCardId = result.sportsCardId;
      } else {
        formObject.sportsCardId = null;
      }

      if (result.sportsCardName) {
        formObject.sportsCardName = result.sportsCardName;
      } else {
        formObject.sportsCardName = null;
      }

      if (result.sportsCardDescription) {
        formObject.sportsCardDescription = result.sportsCardDescription;
      } else {
        formObject.sportsCardDescription = null;
      }

      if (result.cardType) {
        formObject.cardType = result.cardType;
      } else {
        formObject.cardType = null;
      }

      if (result.quantity) {
        formObject.quantity = result.quantity;
      } else {
        formObject.quantity = null;
      }

      if (result.price) {
        formObject.price = result.price;
      } else {
        formObject.price = null;
      }

      if (result.forTrade) {
        formObject.forTrade = result.forTrade;
      } else {
        formObject.forTrade = null;
      }

      if (result.cardOwner) {
        formObject.cardOwner = result.cardOwner;
      } else {
        formObject.cardOwner = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'sportsCardId': null,
      'sportsCardName': null,
      'sportsCardDescription': null,
      'cardType': null,
      'quantity': null,
      'price': null,
      'forTrade': null,
      'cardOwner': null
      });
  }

}
