// Generate Random Characters
class CharGenerator{
    static specialChars = `!#$%&()*+,-./:;<=>?@[\]^_{|}~`;
    // generate UpperCase Letters
    static getUpper(){
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }

    // Generate LowerCase Letters
    static getLower(){
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }

    // Generate Numbers
    static getNumber(){
        return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }

    // Generate Special Characters
    static getSpecial(){
        return this.specialChars[Math.floor(Math.random() * this.specialChars.length)];
    }
}


// Generate Password
class PasswordGenerator{
    static randomFunc = {
        upper : 'getUpper',
        lower : 'getLower',
        number : 'getNumber',
        special : 'getSpecial'
    }

    static funcArray = ['upper', 'lower', 'number', 'special'];

    // Generate each character for password
    static generateCharecter(){
        const activeFunc = Math.floor(Math.random() * 4);
        return CharGenerator[this.randomFunc[this.funcArray[activeFunc]]]();
    }


    // Check Character Validity
    static isValidCharacter(str, char){
        if(str === ''){
            return true;
        }
        else if(str[str.length - 1] === char){
            return false;
        }
        else if(str.charCodeAt(str.length - 1) >= 48 && str.charCodeAt(str.length - 1) <= 58 && 
                char.charCodeAt(char.length - 1) >= 48 && char.charCodeAt(char.length - 1) <= 58 ){
            return false;
        }
        else if(str.charCodeAt(str.length - 1) >= 65 && str.charCodeAt(str.length - 1) <= 91 && 
                char.charCodeAt(char.length - 1) >= 65 && char.charCodeAt(char.length - 1) <= 91 ){
            return false;
        }
        else if(str.charCodeAt(str.length - 1) >= 97 && str.charCodeAt(str.length - 1) <= 123 && 
                char.charCodeAt(char.length - 1) >= 97 && char.charCodeAt(char.length - 1) <= 123 ){
            return false;
        }
        else{
            return true;
        }
    }


    // Return Generated Password
    static getPassword(len){
        let password = '';

        while(password.length < len){
            let char = PasswordGenerator.generateCharecter();
            if(PasswordGenerator.isValidCharacter(password, char)){
                password += char;
            }
        }
        console.log(password.length);
        console.log(password);
        return password;
    }
}

/*
* Event Section
*
*/

//Form Submit Event
document.querySelector('#myForm').addEventListener('submit', (e) => {
    // Preventing form from Submitting
    e.preventDefault();
    const len = document.querySelector('#passwrodLength').value;

    if(len < 10){
        alert('Password have to be at least 10 charecter.');
        return;
    }

    let password = PasswordGenerator.getPassword(len);
    let content = `<textarea class="text-danger form-control" rows="6" cols="50">${password}</textarea>`

    document.querySelector('#password').innerHTML = content;
});