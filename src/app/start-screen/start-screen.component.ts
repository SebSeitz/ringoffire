import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  newGame(){
    let game = new Game();
    //Start Game
    this.firestore
    .collection('games')
    .add(game.toJson())
    .then((gameInfo: any) => {     //then-Methode ähnlich wie subscribe, kann aber nur einmal aufgerufen werden (im Gegensatz zu subscribe)
      this.router.navigateByUrl('/game/' + gameInfo.id);    //leitet zum Spiel weiter und kreiert eine unique url (kann zb für Multiplayer geschickt werden)

    });

  }

}
