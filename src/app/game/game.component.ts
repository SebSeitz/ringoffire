import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game!: Game;
  currentCard: string = '';
  gameId: string;
  currentPlayer: number;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) =>{
      console.log(params);
      this.gameId = params['id]'];
      this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .valueChanges()
      .subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
      });
    });

  }

  newGame() {
    this.game = new Game();
    this.firestore.collection('games').add(this.game.toJson()); //Game-Objekt wird in Json umgewandelt

  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      console.log('new Card:', this.currentCard);
      console.log('Game is:', this.game);

        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;

      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);


    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {     // Abfrage, ob name existiert und dann ob name > 0 ist
      this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame(){
    this
    .firestore
    .collection('games')
    .doc(this.gameId)
    .update(this.game.toJson())
  }
}
