import { TestBed } from '@angular/core/testing';

import { HeaderSetInterceptor } from './header-set.interceptor';

describe('HeaderSetInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HeaderSetInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HeaderSetInterceptor = TestBed.inject(HeaderSetInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
