
import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {DemoMaterialModule} from '../material-module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import * as convert from 'xml-js';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

declare var require: any;

// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  public tiles: Array<object>;
  public foobar: string;
  public fileToUpload: any;
  public fileToUploadString: string;
  public divMessages: string;
  public currentTitle: string;
  public htmlToAdd: string;

  @ViewChild('one') d1: ElementRef;


  constructor(private elementRef: ElementRef, private renderer: Renderer2,
              @Inject(DOCUMENT) private document) {
    const appendElement = '' ;
    this.divMessages = appendElement;
    this.tiles = [
      {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
      {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
      {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
      {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
      ];
  }

  ngOnInit(): void {
    const matCard = this.renderer.createElement('mat-card');

    this.renderer.addClass(matCard, 'film');
    this.renderer.addClass(matCard, 'mat-card');

    this.renderer.setStyle(matCard, 'margin', '2px');

    this.renderer.appendChild(this.divMessages, matCard);
  }

  public handleFileInput(files: FileList): void {
    this.fileToUpload = files;
    this.readFile(files[0]);
  }

  public readFile(input): void {

    const file = input;

    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.fileToUpload = reader.result;
        this.convertToXML();
      }
    };

    reader.onerror = () => {
      console.log(reader.error);
    };

  }

  convertToXML(): void {
    const options = {compact: true};
    this.fileToUpload = convert.xml2js(this.fileToUpload, options);
    this.fileToUploadString = this.fileToUpload;
    console.log(this.fileToUploadString);
    this.callback();
  }

  callback(): void {
    this.createElementsFromJSON(this.fileToUploadString);
  }

  createElementsFromJSON(json): void {
    // @ts-ignore
    // tslint:disable-next-line:forin align no-unused-expression
    // this.divMessages = this.divMessages.concat('<div fxLayout="row" fxLayoutAlign="space-around center"  fxLayoutGap="25px" >');
    for (const i in json)
    {
      const object = json[i];

      this.currentTitle = i;
      this.tiles.push({text: '', cols: 1, rows: 1, color: '#dd1'});
      this.tiles.push({text:  + i, cols: 2, rows: 1, color: 'lightblue'});
      this.tiles.push({text: '', cols: 1, rows: 1, color: '#dd1'});
/*      this.divMessages = this.divMessages.concat('<mat-card>');
      this.divMessages = this.divMessages.concat('<div class="mat-card-header"><b>' + this.currentTitle + '</b></div>');*/

      if (typeof(object) !== 'object') {/*
         this.divMessages = this.divMessages.concat('<div class="mat-title">' + object + '</div>');*/
        this.tiles.push({text: '', cols: 1, rows: 1, color: '#dd1'});
        this.tiles.push({text: object, cols: 2, rows: 1, color: 'lightblue'});
        this.tiles.push({text: '', cols: 1, rows: 1, color: '#dd1'});
      }
      else {
        this.createElementsFromJSON(object);
      }/*
      this.divMessages = this.divMessages.concat('</mat-card>');*/
    }/*
    this.divMessages = this.divMessages.concat('</div>');*/

  }
}
