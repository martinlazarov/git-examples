import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import { ConfirmationMessageComponent } from '../components/confirmation-message/confirmation-message.component';
import { MatSnackBar } from '@angular/material';

describe('SnackBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      ConfirmationMessageComponent,
    ],
    providers: [
        { provide: MatSnackBar }
    ]
  }));

  it('should be created', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);
    expect(service).toBeTruthy();
  });

  it('should be updated', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);
    expect(service).toBeTruthy();
  });
});
