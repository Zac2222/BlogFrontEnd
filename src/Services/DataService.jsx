
let userData = {}

//create a function to help us check our local storage

function checkToken() 
{
    let result = false;
    let lsData = localStorage.getItem("Token");
    if(lsData && lsData != null)
    {
        result = true;
    }
    return result;
}

//wer are going to use async and await funtion
//help us resoleve a promise

const createAccount  = async (createdUser) => 
{
   let result = await fetch("http://localhost:5246/user/Addusers", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(createdUser)
    });
        if(!result.ok)
        {
            const message = `Error check your code! ${result.status}`
            throw new Error(message)
        }   

        let data = await result.json();

        console.log(data)
    
}

const login = async (loginUser) => 
{
    let result = await fetch("http://localhost:5246/user/Login", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(loginUser)
    });
        if(!result.ok)
        {
            const message = `Error check your code! ${result.status}`
            throw new Error(message)
        }   

        let data = await result.json();

        // if(data.token != null)
        // {
        //     localStorage.setItem("Token",data.token)
        // }
        console.log(data)
        return data
    
}

const GetLoggedInuser = async (username) =>
{
     
    let result  = await fetch(`http://localhost:5246/user/userbyusername/${username}`);
     userData = await result.json();
     console.log(userData);
}

const LoggedInData = () => 
{
    return userData;
}


export {checkToken, createAccount, login, GetLoggedInuser,LoggedInData}