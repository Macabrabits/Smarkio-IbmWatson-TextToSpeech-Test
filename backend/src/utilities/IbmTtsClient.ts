import TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
import config from '../config/IbmClient'

const { IamAuthenticator } = require('ibm-watson/auth');
export class IbmTtsClient {
  apiKey: string;
  url: string;
  textToSpeech: TextToSpeechV1;

  constructor() {
    this.apiKey = config.apiKey;
    this.url = config.url;

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
