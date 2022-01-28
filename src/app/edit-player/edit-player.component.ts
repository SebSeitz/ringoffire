import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfilePictures = ['profile-male.png', 'beer2.png','drinking-balloon.jpg', 'drinking-wine.jpg', 'tyrion.jpg', 'party-kid.jpg', 'angry-woman.jpg'];

  constructor(public dialogRef: MatDialogRef <EditPlayerComponent>) { }

  ngOnInit(): void {
  }

}
