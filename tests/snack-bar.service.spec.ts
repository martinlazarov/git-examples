import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';

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

describe('fitlerProceduresByCodeAndDescription', () => {
    it('returns empty array []', () => {

        const found = utils.fitlerProceduresByCodeAndDescription([], 'test');
        expect(found.length).toEqual(0);
    });
    it('returns empty array []', () => {

        const found = utils.fitlerProceduresByCodeAndDescription(null, 'test');
        expect(found.length).toEqual(0);
    });
    it('returns 1 result', () => {

        const found = utils.fitlerProceduresByCodeAndDescription(mockProceduresList, 'D0120');
        expect(found.length).toEqual(1);
    });
});

describe('fitlerProceduresByCodeAndDescription', () => {
    it('returns empty array []', () => {

        const found = utils.fitlerProceduresByCodeAndDescription([], 'test');
        expect(found.length).toEqual(0);
    });
    it('returns empty array []', () => {

        const found = utils.fitlerProceduresByCodeAndDescription(null, 'test');
        expect(found.length).toEqual(0);
    });
    it('returns 1 result', () => {

        const found = utils.fitlerProceduresByCodeAndDescription(mockProceduresList, 'D0120');
        expect(found.length).toEqual(1);
    });
});

