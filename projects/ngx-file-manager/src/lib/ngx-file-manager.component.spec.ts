import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFileManagerComponent } from './ngx-file-manager.component';

describe('NgxFileManagerComponent', () => {
  let component: NgxFileManagerComponent;
  let fixture: ComponentFixture<NgxFileManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxFileManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxFileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
