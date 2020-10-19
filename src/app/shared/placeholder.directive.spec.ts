import { PlaceholderDirective } from './placeholder.directive';
import { ViewContainerRef } from '@angular/core';

describe('PlaceholderDirective', () => {
  it('should create an instance', () => {
     let viewConRef: ViewContainerRef;
    const directive = new PlaceholderDirective(viewConRef);
    expect(directive).toBeTruthy();
  });
});
