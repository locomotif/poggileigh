import { Directive, Renderer, ElementRef } from '@angular/core';

@Directive({
    selector: 'input',
    host: {'(blur)': 'onBlur($event)'}
})
export class FormControlBlurDirective {

    constructor(
        private elRef: ElementRef, 
        private renderer: Renderer
    ) {}

    onBlur($event) {
        this.renderer.invokeElementMethod(
            this.elRef.nativeElement, 
            'dispatchEvent', 
            [new CustomEvent('input-blur', { bubbles: true })]
        );
    }
}

