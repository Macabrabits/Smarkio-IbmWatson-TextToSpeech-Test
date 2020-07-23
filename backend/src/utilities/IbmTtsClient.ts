import TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
import config from '../config/IbmClient';

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
    const params = { text, voice, accept: 'audio/wav' };

    return this.textToSpeech
      .synthesize(params)
      .then(response => {
        const audio: any = response.result;
        return this.textToSpeech.repairWavHeaderStream(audio);
      })
      .catch(err => console.log(err));
  }
}
