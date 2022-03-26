import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-multimedia-form',
  templateUrl: './multimedia-form.component.html',
  styleUrls: ['./multimedia-form.component.css']
})
export class MultimediaFormComponent implements OnInit {

  @Input()
  entityType: string;

  @Input()
  entityId: number;

  items = [];

  isWorking: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.dataUpdate$().subscribe(
      (v) => {
        this.load();
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
        this.isWorking = false;
      },
      () => this.isWorking = false
    );
  }


  load(): void{

    this.isWorking = true;
    this.dataService.loadRelated(this.entityType, this.entityId, 'multimedia').subscribe(
      (response: HttpResponse<any>) => {
        this.items = response.body;
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
      },
      () => {
        this.isWorking = false;
      }
    );
  }

  onFileSelected(event: Event): void {

    this.isWorking = true;
    const media: any = {};
    media.entity = this.entityType;
    media.entity_id = this.entityId;
    const file: File = (event.target as HTMLInputElement).files[0];

    /*this.dataService.uploadMedia(media, file).subscribe(
      (data) => {
        this.items.splice(0, 0, data);
      },
      (error) => console.log('Was unable to load data. ' + error),
      () => this.loading = false
    );*/

  }

  deleteItem(media: any): void {

    if (confirm('Delete item?')) {

      this.dataService.delete('multimedia', media.id).subscribe(
        (response: HttpResponse<any>) => {
          this.dataService.registerUpdate();
        },
        (error: any) => {
          console.log(error.message);
          alert(error.statusText);
        },
        () => {
          this.isWorking = false;
        }
      );
    }


  }

}
