import { TestBed } from '@angular/core/testing';

import { ReceipesreolverService } from './receipesreolver.service';

describe('ReceipesreolverService', () => {
  let service: ReceipesreolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceipesreolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
