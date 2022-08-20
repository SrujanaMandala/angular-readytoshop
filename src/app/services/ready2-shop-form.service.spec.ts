import { TestBed } from '@angular/core/testing';

import { Ready2ShopFormService } from './ready2-shop-form.service';

describe('Ready2ShopFormService', () => {
  let service: Ready2ShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ready2ShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
