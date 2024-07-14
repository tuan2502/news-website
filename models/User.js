'use strict'

class User {
    constructor(firstName, lastName, username, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }
    
}

//Hàm parseUser
const parseUser = function(userData) {
    if(!userData) return;
    const { firstName, lastName, username, password } = userData;
	const user = new User(firstName, lastName, username, password);
	return user;
}