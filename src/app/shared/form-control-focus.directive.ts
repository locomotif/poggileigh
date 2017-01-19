import { Directive, Renderer, ElementRef } from '@angular/core';

@Directive({
    selector: 'input',
    host: {'(focus)': 'onFocus($event)'}
})
export class FormControlFocusDirective {

    constructor(
        private elRef: ElementRef, 
        private renderer: Renderer
    ) {}

    onFocus($event) {
        this.renderer.invokeElementMethod(
            this.elRef.nativeElement, 
            'dispatchEvent', 
            [new CustomEvent('input-focus', { bubbles: true })]
        );
    }
}

