import { TestBed } from '@angular/core/testing';

import { HttpNetworkService } from './http-network.service';

describe('HttpNetworkService', () => {
  let service: HttpNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
