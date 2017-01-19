import { Injectable } from '@angular/core';

@Injectable()
export class D2Util {

    /* takes two elements and determines their relative width and height */
    static getWidthHeight(a: number[], b: number[]): number[] {
        return [Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1])]; //0 -> width 1 -> height
    }

    static rectInRect(r1: any, r2: any): boolean {
        let inRect = !(r2.left > r1.right || 
                 r2.right < r1.left || 
                 r2.top > r1.bottom ||
                 r2.bottom < r1.top);
        return inRect;
    }

    static hasPoint(point: number[], line: number[][], slope?: number): boolean {

        if( typeof slope === 'undefined') {
            slope = this.getSlope(line);
        }

        /* vertical line */
        if (this.isInfinity(slope)) {
            /* arrange points of line to go from small to large */
            line = line[0][1] > line[1][1] ? [line[1], line[0]] : line;
            return point[1] >= line[0][1] && point[1] <= line[1][1];
            /* horizontal line */
        } else if (slope === 0) {
            /* arrange points of line to go from small to large */
            line = line[0][0] > line[1][0] ? [line[1], line[0]] : line;
            return point[0] >= line[0][0] && point[0] <= line[1][0];
            /* diagonal line */
        } else {
            /* @todo: finish logic */
        }
        return true;
    }

    /* takes lines dimensions and determines if one intersects the other */
    static pointOfIntersection(
        lineA: number[][], 
        lineB: number[][],
        slopeA?: number,
        slopeB?: number
    ): number[] {

        let point: number[];
        if( typeof slopeA === 'undefined') {
            slopeA = this.getSlope(lineA);
        }
        if( typeof slopeB === 'undefined') {
            slopeB = this.getSlope(lineB);
        }

        // vertical vs horizontal
        if (this.isInfinity(slopeA) && slopeB === 0) {
            point = [lineA[0][0], lineB[0][1]];

            // horizontal vs vertical
        } else if (this.isInfinity(slopeB) && slopeA === 0){
            point =  [lineB[0][0], lineA[0][1]];
        } else {
            throw "points do not intersect";
        }
        return point;
    }

    static isInfinity(x: number) {
        return ( x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY);
    }

    /*
     * Returns the slope of a line (m)
     */
    static getSlope(l: number[][]) {
        let m = (l[1][1] - l[0][1])/(l[1][0] - l[0][0]);
        return m;
    }

    /*
     * Returns the intercept (b) where a line crosses the y-axis
     */
    static getIntercept(m: number, p: number[]) {
        let b = p[1] - m*p[0];
        return b;
    }
}
