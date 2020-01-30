export const bind=(component,event,callback)=>{
    component.setState({[event.target.name]:event.target.value});
    if(callback)
        callback();
}

export const request=async(url,options)=>{
    try{
        fetch(url,{
            method:options.method,
        });
    }
    catch(err){
        alert(err)
        return null;
    }
}

//080-28483100