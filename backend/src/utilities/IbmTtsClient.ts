import TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
// import fs = require('fs');
// import { Readable } from 'typeorm/platform/PlatformTools';
const { IamAuthenticator } = require('ibm-watson/auth');
export class IbmTtsClient {
  apiKey: string;
  url: string;
  textToSpeech: TextToSpeechV1;

  constructor() {
    this.apiKey = 'WmxdCGeN9l_Zr34RHZWlcQu0feglllvswksqixrloTmo';
    this.url =
      'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/d0db9ad2-d8a6-4099-93c2-c9d16adff4a9';

    this.textToSpeech = new TextToSpeechV1({
      authenticator: new IamAuthenticator({
        apikey: this.apiKey,
      }),
      url: this.url,
    });
  }

  convert(text: string, voice?: string) {
    // const params = {
    //   text: 'Hello from IBM Watson Camila',
    //   voice: 'en-US_AllisonVoice',
    //   accept: 'audio/wav',
    // };

    const params = { text, voice, accept: 'audio/wav' };

    return (
      this.textToSpeech
        .synthesize(params)
        .then(response => {
          const audio: any = response.result;
          return this.textToSpeech.repairWavHeaderStream(audio);
        })
        // .then(repairedFile => {
        //   fs.writeFileSync('audio.wav', repairedFile);
        //   console.log('audio.wav written with a corrected wav header');
        // })
        .catch(err => console.log(err))
    );
  }
}
