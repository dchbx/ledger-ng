/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmployersService } from './employers.service';

describe('EmployersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployersService]
    });
  });

  it('should ...', inject([EmployersService], (service: EmployersService) => {
    expect(service).toBeTruthy();
  }));
});
