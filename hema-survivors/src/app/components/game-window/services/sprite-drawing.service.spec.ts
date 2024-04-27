import { TestBed } from '@angular/core/testing';

import { SpriteDrawingService } from './sprite-drawing.service';

describe('SpriteDrawingService', () => {
  let service: SpriteDrawingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpriteDrawingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
