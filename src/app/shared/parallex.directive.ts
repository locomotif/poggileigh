import { 
    Directive, 
    ElementRef, 
    HostListener,
    OnInit,
    Renderer,
    Input 
} from '@angular/core';

import { parallexConfig } from './parallex.config'; 
import { D2Util } from './d2.util';

@Directive({
    selector: '[appParallex]',
    exportAs: "parallex",
    providers:[
        {provide: parallexConfig, useValue: parallexConfig}
    ]
})
export class ParallexDirective implements OnInit {

    _imageAspectRatio: number;
    get imageAspectRatio(): number {return this._imageAspectRatio}
    set imageAspectRatio(a) {this._imageAspectRatio = a}

    _aspectRatio: number;
    get aspectRatio(): number {return this._aspectRatio}
    set aspectRatio(a) {this._aspectRatio = a}

    _windowAspecRatio: number;
    get windowAspectRatio(): number {return this._windowAspecRatio}
    set windowAspectRatio(a) {this._windowAspecRatio = a}

    private index: number;
    private origOffsetTop: number;
    private image: any;
    private pNode: any;

    constructor(
        private el: ElementRef, 
        private renderer: Renderer
    ) { 
    } 

    ngOnInit() {
        this.renderer.listen(
            this.el.nativeElement, 
            'load', 
            (event: {}) => {
                this.pNode = D2Util.getParentDim(this.el.nativeElement);

                /* set aspect Rations */
                this.setAspectRatio();
                /* set image height to satisfy parallex ratio */
                this.setImageDims();
                /* Capture original offsetTop */
                this.origOffsetTop = this.el.nativeElement.offsetTop;
                
                /* set local property image with new coordinates */
                this.setImage();
                /* set the location of image based on current scroll-y position */
                this.moveImage();
            });
    }

    @HostListener('window:scroll')
    private onScroll() {
        if(this.image) this.moveImage(); 
    }

    /**
     * move image depending on it current window location
     */
    private moveImage(): void {
        let diff: number;

        /* use original coordinates */
        let elementCoor: any = this.image;

        // get window dimensions
        let screenCoor: any = {
            top: window.scrollY,
            right: (window.innerWidth + window.scrollX),
            bottom: (window.innerHeight + window.scrollY),
            left: window.scrollX 
        };

        let portCoor: any = {
            top: elementCoor.top,
            left: screenCoor.left,
            bottom: elementCoor.top + elementCoor.height,
            right: elementCoor.right
        }

        /* if image is in viewport */
        if(D2Util.rectInRect(screenCoor, portCoor)) {
            diff = ((Math.ceil(elementCoor.lastY - window.scrollY)) * parallexConfig.ratio) * -1;
            this.image.lastY = window.scrollY;
            this.el.nativeElement.style.marginTop = (this.el.nativeElement.offsetTop + diff) + "px" ;

            /* else reset the image to its original coordinates */
        } else {
            this.resetY();
        }
    }

    private resetY(): void {
            /* reset offsetTop */
            this.el.nativeElement.style.marginTop = (this.origOffsetTop) + "px" ;
            this.image.lastY = this.image.top;
    }

    private setAspectRatio() {
        // set the image aspect ratio
        let h = this.el.nativeElement.naturalHeight;
        let w = this.el.nativeElement.naturalWidth;
        this.imageAspectRatio = w/h;
    }

    private setImageDims(): void {
        let per: number; // percentage increase
        let nH = this.el.nativeElement.naturalHeight;
        let nW = this.el.nativeElement.naturalWidth;

        //// Determine the max amount of pixle movement per parallex ratio
        //let movement = Math.ceil(window.innerHeight * parallexConfig.ratio);
        let movement = Math.ceil((this.pNode.height) * parallexConfig.ratio);
        let tH = this.pNode.height + movement; // target height
        let tW = this.imageAspectRatio * tH;  // target width

        // get scale get the viewport height in relation to target height
        let scale = 100 * tH / this.pNode.height;

        //ration of increase or decrease of the actual image size
        let ratio = tH/nH;  

        // final width of image after ratio is applied
        // using width, cause height is fixed, while width will grow with window increase or decrease.
        // I want the image to increase or decrease on window resize
        let width = nW * ratio;

        if(width < this.pNode.width){
            // update ratio
            ratio = (this.pNode.width / nW);
            per = 100 / nW;
            this.renderer.setElementStyle(this.el.nativeElement, "width", "100%");
        } else {
            per = 100 * width / this.pNode.width;
            this.renderer.setElementStyle(this.el.nativeElement, "width", per + "%");
        }
    }

    private setImage() {

        let {top, right, bottom, left, width, height} = this.el.nativeElement.getBoundingClientRect();

        // window could refresh with an auto scroll position, we need
        // we take this into account when determining original
        // coordinates as if the window scroll is [0,0]
        let scrollY = window.scrollY;
        let offsetTop = this.el.nativeElement.offsetTop;

        this.image = {
            top: top + scrollY,
            right: right,
            bottom: bottom,
            left: left,

            width: width,
            height: height,

            lastY: top + scrollY,
            offsetTop: offsetTop
        }
    }

    updateImageDims(): void {
        this.pNode = D2Util.getParentDim(this.el.nativeElement);
        this.setImageDims();
        this.resetY();
        this.setImage();
        this.moveImage();
    }
}
