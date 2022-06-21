
const userURL = '/api/user';

async function isAlreadyUser(id){
    const ans =  fetch(userURL + "?id=" + id, { 
        method : "GET",
        headers : {
          'Content-type': 'application/json'
        },
      })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.id === id)
            return true;
        return false;
      })
      .catch((error) => {
        return false;
      })
    
    return ans;
}

export default isAlreadyUser;