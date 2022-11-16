import { Component, OnInit } from '@angular/core';
import { Name } from 'src/app/model/name';
import { HttpClient } from "@angular/common/http";
import { getJSON } from 'jquery';


@Component({
  selector: 'app-fictivo',
  templateUrl: './fictivo.component.html',
  styleUrls: ['./fictivo.component.scss']
})
export class FictivoComponent implements OnInit {
  selectedLanguage = '';
  gender = '';
  resultNames: any[] = [];
  givenNamesSource: any[] = [];
  surnamesSource: any[] = [];
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
  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    console.log(this.generateName('hun', 'female'));

  }


  async generateName(language: string, gender: string) {
    let asd: any[] = [];
    let dsa: any[] = [];
    let randomGivenNameElement;
    let randomsurnameElement;
    this.httpClient.get(`../../../assets/names/${language}_givenNames.json`).subscribe(data => {
      const qwer = JSON.stringify(data);
      const qwur = JSON.parse(qwer);
      // console.log(qwur);
      for (const prop in qwur) {
        asd.push(qwur[prop])
      }
      // console.log(asd);
      // let key = this.givenNamesSource.slice(0, 0).map(item => item.title);
      this.givenNamesSource = asd.filter(item => item.gender === `Gender.${gender}`).map(item => item.name);
      console.log(this.givenNamesSource);
      // this.givenNamesSource = asd.filter(item => item) .map(item => item.name);

      // console.log(this.givenNamesSource);
      // for (let i = 0; i < 100; i++) {
      //   this.resultNames.push(randomGivenNameElement)
      // }
    })
    // console.log('givenNames' + Array(this.givenNamesSource));

    this.httpClient.get(`../../../assets/names/${language}_surnames.json`).subscribe(data => {
      const ter = JSON.stringify(data);
      const tui = JSON.parse(ter);
      // console.log(tui);
      for (const prop in tui) {
        dsa.push(tui[prop])
      }
      // console.log(dsa);
      // let key = this.givenNamesSource.slice(0, 0).map(item => item.title);
      this.surnamesSource = dsa.map(item => item.name);

      for (let i = 0; i < 100; i++) {
        randomGivenNameElement = this.givenNamesSource[Math.floor(Math.random() * this.givenNamesSource.length)];
        randomsurnameElement = this.surnamesSource[Math.floor(Math.random() * this.surnamesSource.length)];
        this.resultNames.push({ randomGivenNameElement, randomsurnameElement });
      }
      console.log(this.resultNames);
    })



  }
}
