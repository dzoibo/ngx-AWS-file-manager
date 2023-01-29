import { NgModule } from '@angular/core';
import { NgxFileManagerComponent } from './ngx-file-manager.component';
import { NgxFileManagerService } from './ngx-file-manager.service';



@NgModule({
  declarations: [
    NgxFileManagerComponent
  ],
  imports: [
  ],
  exports: [
    NgxFileManagerComponent
  ],
  providers:[NgxFileManagerService],
})
export class NgxFileManagerModule { }
