import { NgModule } from '@angular/core';

import {
  MatFormFieldModule,
      MatButtonModule,
      MatMenuModule,
      MatToolbarModule,
      MatIconModule,
      MatCardModule,
      MatCheckboxModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule
    } from '@angular/material';

@NgModule({
      imports: [
        MatFormFieldModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule
      ],
      exports: [
        MatFormFieldModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule
      ]
    })
    export class MaterialModule {}
