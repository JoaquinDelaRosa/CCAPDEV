
const userURL = '/api/user';

async function isAlreadyUser(username){
    const ans =  fetch(userURL + "?username=" + username, { 
        method : "GET",
        headers : {
          'Content-type': 'application/json'
        },
      })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.username === username)
            return true;
        return false;
      })
      .catch((error) => {
        return false;
      })
    
    return ans;
}

export default isAlreadyUser;