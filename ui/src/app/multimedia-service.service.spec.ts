import { TestBed, inject } from '@angular/core/testing';

import { MultimediaServiceService } from './multimedia-service.service';

describe('MultimediaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultimediaServiceService]
    });
  });

  it('should ...', inject([MultimediaServiceService], (service: MultimediaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
