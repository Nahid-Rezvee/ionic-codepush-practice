import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CodePush, InstallMode } from '@ionic-native/code-push';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private codePush: CodePush
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkCodePush();
    });
  }


  checkCodePush() {

    this.codePush.sync({
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: "\n\nChange log:\n"
      },
      installMode: InstallMode.IMMEDIATE
    }).subscribe(
      (data) => {
        console.log('CODE PUSH SUCCESSFUL: ' + data);
      },
      (err) => {
        console.log('CODE PUSH ERROR: ' + err);
      }
    );
  }
}

