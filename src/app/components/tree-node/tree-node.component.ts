import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit {

  @Input() space: any;

  isLoading: boolean;
  isOpen: boolean;
  label: string;
  @Input() activeSpaceId: number;

  @Output() selectedSpaceId = new EventEmitter<number>();



  constructor(
    private dataService: DataService,
    private router: Router
    ) {}

  ngOnInit(): void {
  }

  open(id: number): void {
    this.selectedSpaceId.emit(id);
  }

  getLabel(): string{

    const text = [];

    if (this.space.address){
      text.push(this.space.address);
    }

    if (this.space.address && this.space.label){
      text.push(' ~ ');
    }

    if (this.space.label){
      text.push(this.space.label);
    }

    return text.join('');
  }

  toggle(): void{
    this.isOpen = !this.isOpen;
  }

  load(parentId: number): any {
    this.isLoading = true;
    this.list('space', parentId, 'space');
  }


  list(entity: string, id: number, subentity: string): any {
    this.dataService.loadRelated(entity, id, subentity).subscribe(
      (response: HttpResponse<any>) => {
        this.space.spaces = response.body;
        this.isOpen = true;
        this.isLoading = false;
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
      }
    );
  }

}
