import {request} from '../lib/utils';
export const getLanguages=async()=>{
    let response = request('')
}


export const transliterate=async(text,script)=>{
    try{
        let transliterateLocalDB = JSON.parse(localStorage.getItem('transliterateLocalDB'))||{};
        if(!transliterateLocalDB[script])
            transliterateLocalDB[script]={};
        let words = text.match(/\w+/g);
        console.log(words);
        let transliterated = await Promise.all(words.map(async word=>{
            if(word==="")
                return word;
            console.log(word);
            if(transliterateLocalDB[script][word])
                return transliterateLocalDB[script][word];
            let response = await fetch(`http://www.google.com/inputtools/request?text=${encodeURI(word)}&ime=transliteration_en_${script}&app=jsapi`);
            let json = await response.json();
            let result = json[1][0][1][0];
            transliterateLocalDB[script][word] = result;
            localStorage.setItem('transliterateLocalDB',JSON.stringify(transliterateLocalDB));
            return result;
        }));
        console.log(transliterated);
        transliterated.forEach((word,index)=>{
            text=text.replace(RegExp(words[index],"ig"),word);
        });
        return text;
    }
    catch(exp){
        return "";
    }
}
