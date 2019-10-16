import { Component, Input, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Project } from '../../model/project';
import * as $ from 'jquery';

@Component({
    selector: 'slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit {

    $scrollableWrapper: JQuery | any;
    $leftPaddle: JQuery | any;
    $rightPaddle: JQuery | any;

    public constructor(private el: ElementRef) {
    }

    public ngAfterViewInit(): void {
        const sliderEl = $(this.el.nativeElement).children('.scroller-horizontal-container').children('.slider');
        this.$scrollableWrapper = sliderEl.children('.scrolling-wrapper-flexbox');
        this.$leftPaddle = sliderEl.children('.handlePrev');
        this.$rightPaddle = sliderEl.children('.handleNext');
    }

    public scrollHorizontal(direction: string): void {
        const leftPos = this.$scrollableWrapper.scrollLeft();
        let newPos;
        if (direction === 'l') {
          newPos = leftPos - 500;
        } else if (direction === 'r') {
          newPos = leftPos + 500;
        }
        this.$scrollableWrapper.animate({ scrollLeft: newPos }, { duration: 130 });
    }

}
