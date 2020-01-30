import React,{Component} from 'react';
import style from  './style.module.css';
import {transliterate} from '../../services/transliterate'
import firebase from 'firebase/app';
import 'firebase/firestore';

class Home extends Component{
  state={
    languages:[],
    translations:[],
    from:'kannada',
    to:'tulu',
    fromScript:'kn',
    toScript:'kn',
    translateTextRows:1,
    translatedTextRows:1
  }
  constructor(props){
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.addTranslation = this.addTranslation.bind(this);
  }
  componentDidMount(){
    this.init();
  }
  async init(){
    firebase.firestore().collection("translations").onSnapshot(snapshot=>{
      let translations = [];
      snapshot.docs.forEach(doc=>{
        translations.push(doc.data())
      });
      this.setState({translations});
    });
    let languagesCol = await firebase.firestore().collection("language_profiles").get();
    let languages = languagesCol.docs.map(doc=>doc.id);
    this.setState({languages});
    console.log(firebase);
  }

  async handleInput(event){
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]:value});
    if(name==="textToTranslate"){
      /** Check number of rows **/
      let match = value.match(/\n/g);
      let count = 0;
      if(match){
         count = match.length;
      }
      let script = await transliterate(value,this.state.fromScript);
      this.setState({
        translateTextRows:count+1,
        transliteratedText:script
      });
    }
    else if(name==="translatedText"){
      /** Check number of rows **/
      let match = value.match(/\n/g);
      let count = 0;
      if(match){
         count = match.length;
      }
      let script = await transliterate(value,this.state.toScript);
      this.setState({
        translatedTextRows:count+1,
        translatedTransliteratedText:script
      });
    }
  }

  async addTranslation(){
    await firebase.firestore().collection('translations').add(
      {
        [this.state.from]:this.state.textToTranslate,
        [this.state.from+"Script"]:this.state.transliteratedText,
        [this.state.to]:this.state.translatedText,
        [this.state.to+"Script"]:this.state.translatedTransliteratedText
      }
    )
    this.setState({
      textToTranslate:'',
      transliteratedText:'',
      translatedText:'',
      translatedTransliteratedText:''
    });
  }


  render() {
  
    return (
      <div className={style.home}>
        <div>
          Translate from 
            <select name="from" value={this.state.from} onChange={this.handleInput}>
              {
                this.state.languages.map((language,index)=><option key={index}>{language}</option>)
              }
            </select>
          to
            <select name="to"  value={this.state.to}  onChange={this.handleInput}>
            {
                this.state.languages.map((language,index)=><option key={index}>{language}</option>)
              }
            </select>
        </div>
        <div className={style.textToTranslate}>
          <textarea name="textToTranslate" rows={this.state.translateTextRows} value={this.state.textToTranslate} onChange={this.handleInput} placeholder="Enter text to translate.."/>
        </div>
        <div className={style.transliteratedText}>
          {this.state.transliteratedText}
        </div>
        <div>
          Translation:
        </div>
        <div className={style.translatedText}>
          <textarea name="translatedText" rows={this.state.translatedTextRows} value={this.state.translatedText} onChange={this.handleInput} placeholder="Enter translated text.."/>
        </div>
        <div className={style.translatedTransliteratedText}>
          {this.state.translatedTransliteratedText}
        </div>
        <div>
          <button onClick={this.addTranslation}>Add</button>
        </div>
        <table>
          <caption>Translation table</caption>
          <thead>
            <tr>
            <th>{this.state.from}</th>
            <th>{this.state.to}</th>
            
            </tr>
          </thead>
          <tbody>
           {
             this.state.translations.map((translation,index)=><tr key={index}>
              <td>
                <div>{translation.kannada}</div>
                <div className={style.script}>{translation.kannadaScript}</div>
              </td>
              <td>
                <div>{translation.tulu}</div>
                <div className={style.script}>{translation.tuluScript}</div>
              </td>
             </tr>)
           }
          </tbody>
        </table>
      </div>
    );
  }

} 

export default Home;
