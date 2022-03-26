import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public visible = false;
  public visibleAnimate = false;
  @Input() public small;
  constructor(){}

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    console.log(event.target as HTMLElement);
    if ((event.target as HTMLElement).classList.contains('scrim')) {
      this.hide();
    }
  }

  ngOnInit(): void {
  }

}
