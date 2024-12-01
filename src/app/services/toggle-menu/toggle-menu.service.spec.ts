import { TestBed } from '@angular/core/testing';

import { ToggleMenuService } from './toggle-menu.service';

describe('ToggleMenuService', () => {
  let service: ToggleMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
