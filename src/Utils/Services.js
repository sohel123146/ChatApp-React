export const baseUrl = "http://localhost:5000/api"

export const postRequest = async (url,body) =>{
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body
    })
    
    const data = await response.json()

    // response.ok is a property of the Response object in the Fetch API. 
    // It is true if the HTTP status code is in the range 200-299, 
    // indicating a successful request. The ! operator negates this condition, 
    // so the code inside this block runs when the response status code indicates 
    // a failure (e.g., 404, 500).

    // The data?.message syntax is using optional chaining (?.). 
    // It safely checks if data is not null or undefined and if it has a message property. 
    // If both conditions are met, message is assigned the value of data.message.

    // If the data object doesn't have a message property or 
    // if data is null or undefined, message 
    // is assigned the value of data.

    // The function returns an object with two properties: error set to true to indicate that an error occurred, 
    // and  error message derived from the data object.

    if(!response.ok){
        let message;

        if(data?.message){
            message = data.message  //this messages coming from backend
        }
        else{
            message = data
        }

        return ({error:true, message})  //setting error to true
    }

    return data
}