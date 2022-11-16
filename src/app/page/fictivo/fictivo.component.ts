
import { Component, OnInit } from '@angular/core';
import { Name } from 'src/app/model/name';
import { HttpClient } from "@angular/common/http";
import { NotificationService } from 'src/app/service/notification.service';
import { Utf8, Utf16, HexString } from 'utf-helpers'
const utf8 = require('utf8');
import { fromCode, getCode } from '@skyra/char';

@Component({
  selector: 'app-fictivo',
  templateUrl: './fictivo.component.html',
  styleUrls: ['./fictivo.component.scss']
})
export class FictivoComponent implements OnInit {
  selectedLanguage = '';
  gender = '';
  rank = '';
  numberOfNames = 0;
  resultNames: any[] = [];
  givenNamesSource: any[] = [];
  surnamesSource: any[] = [];
  ranksSource: any[] = [];
  languageCodes: string[] = [
    "abk",
    "afr",
    "aka",
    "amh",
    "ara",
    "arc",
    "arg",
    "ast",
    "aze",
    "bak",
    "bel",
    "ben",
    "bik",
    "bod",
    "bre",
    "bul",
    "cat",
    "ceb",
    "ces",
    "cim",
    "cop",
    "cor",
    "cym",
    "dan",
    "deu",
    "egl",
    "egy",
    "ell",
    "eng",
    "epo",
    "est",
    "eus",
    "fao",
    "fas",
    "fin",
    "fra",
    "fry",
    "gla",
    "gle",
    "glg",
    "glv",
    "got",
    "guj",
    "hau",
    "haw",
    "hbs",
    "heb",
    "hil",
    "hin",
    "hun",
    "hye",
    "ibo",
    "ilo",
    "ind",
    "isl",
    "ita",
    "jpn",
    "kal",
    "kan",
    "kat",
    "kaz",
    "khm",
    "kor",
    "kur",
    "lao",
    "lat",
    "lav",
    "lit",
    "mal",
    "mar",
    "mga",
    "mkd",
    "mlt",
    "mon",
    "mri",
    "mya",
    "nav",
    "nld",
    "non",
    "nor",
    "nrf",
    "nya",
    "oci",
    "osx",
    "pag",
    "pam",
    "pan",
    "pol",
    "por",
    "pox",
    "rgn",
    "ron",
    "rus",
    "san",
    "scn",
    "sco",
    "slk",
    "slv",
    "sma",
    "som",
    "spa",
    "sqi",
    "swa",
    "swe",
    "syr",
    "tam",
    "tat",
    "tel",
    "tgl",
    "tha",
    "tuk",
    "tur",
    "txh",
    "uig",
    "ukr",
    "urd",
    "usa",
    "uzb",
    "vie",
    "war",
    "wym",
    "xno",
    "xpi",
    "xpr",
    "xtg",
    "xvn",
    "yid",
    "yor",
    "zha",
    "zho",
    "zza",
  ]
  tarara!: Object;
  tiriri!: Object;
  constructor(private httpClient: HttpClient, public notification: NotificationService) {

    const utf8 = require('utf8');
  }

  ngOnInit(): void {
    console.log(this.generateName('deu', 'male', 'civilian'));
    // console.log(this.generateRank('unisex', 'military'));

  }




  async generateName(language: string, gender: string, rank?: string, numberOfNames?: number) {
    let allGivenNameInThatLanguage: any[] = [];
    let allsurnameInThatLanguage: any[] = [];
    let randomGivenNameElement;
    let randomsurnameElement;
    let allRank: any[] = [];
    let randomRank;
    this.httpClient.get(`../../../assets/names/${language}_givenNames.json`).subscribe(data => {
      const JSONGivennameData = JSON.stringify(data);
      const properGivennameJSON = JSON.parse(JSONGivennameData);
      // console.log(properGivennameJSON);
      for (const prop in data) {
        allGivenNameInThatLanguage.push(properGivennameJSON[prop])
      }
      if (allGivenNameInThatLanguage.filter(item => item.gender === `Gender.${gender}`).length >= 1) {
        this.givenNamesSource = allGivenNameInThatLanguage.filter(item => item.gender === `Gender.${gender}`).map(item => item.name);
      } else {
        this.notification.showError('The database does not contain any given names in this language. For generation, please choose another language!', 'Fictivo v.1.0.0');
      }
      // this.surnamesSource = allsurnameInThatLanguage.map(item => item.name);
      // console.log(this.givenNamesSource);
    })

    this.httpClient.get(`../../../assets/names/ranks.json`).subscribe(data => {
      const JSONrank = (JSON.stringify(data));
      const rankJSON = JSON.parse(JSONrank);
      for (const prop in rankJSON) {
        allRank.push(rankJSON[prop])
      }
      // this.ranksSource = allRank
      //   .filter(item => item.gender === gender || 'Gender.unisex')
      //   .filter(item => item.domain === rank)
      //   .map(item => item.nameFragment);

      this.ranksSource = allRank.filter(item => item.domain === rank).map(item => item.nameFragment); //shortFormENG for abbreviated form and nameFragment for full rank
    })

    this.httpClient.get(`../../../assets/names/${language}_surnames.json`).subscribe(data => {
      const JSONSurnameData = (JSON.stringify(data));
      const propersurnameJSON = JSON.parse(JSONSurnameData);
      for (const prop in propersurnameJSON) {
        allsurnameInThatLanguage.push(propersurnameJSON[prop])
      }
      this.surnamesSource = allsurnameInThatLanguage.filter(item => item.gender === `Gender.${gender}` || 'Gender.unisex').map(item => item.name);
      if (allsurnameInThatLanguage.filter(item => item.gender === `Gender.${gender}` || 'Gender.unisex').length >= 1) {
      } else {
        this.notification.showError('The database does not contain any surnames in this language. For generation, please choose another language!', 'Fictivo v.1.0.0');
      }

      // this.surnamesSource = allsurnameInThatLanguage.map(item => item.name);

      for (let i = 0; i < 10; i++) {
        if (rank != '') {
          const rank = this.generateRank(this.gender, this.rank);
        }
        randomRank = this.ranksSource[Math.floor(Math.random() * this.ranksSource.length)];
        randomGivenNameElement = this.givenNamesSource[Math.floor(Math.random() * this.givenNamesSource.length)];
        randomsurnameElement = this.surnamesSource[Math.floor(Math.random() * this.surnamesSource.length)];
        this.resultNames.push({ rank: randomRank, randomGivenNameElement: randomGivenNameElement, randomsurnameElement: randomsurnameElement })
      }
      console.log(this.resultNames);
    })
  }

  generateRank(gender: string, string: string) {
    let allRank: any[] = [];
    let randomRank
    this.httpClient.get(`../../../assets/names/ranks.json`).subscribe(data => {
      const JSONrank = (JSON.stringify(data));
      const rankJSON = JSON.parse(JSONrank);
      for (const prop in rankJSON) {
        allRank.push(rankJSON[prop])
      }
      this.ranksSource = allRank
        .filter(item => item.gender === gender || 'Gender.unisex')
        .filter(item => item.domain === string)
        .map(item => item.nameFragment);


      this.ranksSource = allRank.filter(item => item.domain === string).map(item => item.name);
      randomRank = this.ranksSource[Math.floor(Math.random() * this.ranksSource.length)];
      this.resultNames.push({ rank: this.rank })

      if (allRank.filter(item => item.gender === `Gender.${gender}` || 'Gender.unisex').length >= 1) {
      } else {
        this.notification.showError('The database does not contain any ranks in this language. For generation, please choose another language!', 'Fictivo v.1.0.0');
      }

    }
    )
  }

}