import { TestBed } from '@angular/core/testing';

import { CartdataService } from './cartdata.service';

describe('CartdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartdataService = TestBed.get(CartdataService);
    expect(service).toBeTruthy();
  });
});
