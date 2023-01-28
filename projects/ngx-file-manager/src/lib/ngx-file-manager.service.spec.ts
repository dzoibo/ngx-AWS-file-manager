import { TestBed } from '@angular/core/testing';

import { NgxFileManagerService } from './ngx-file-manager.service';

describe('NgxFileManagerService', () => {
  let service: NgxFileManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFileManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
