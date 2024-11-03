import {Input} from "./styles";

export function InputAddUsername() {
    return(
        <Input placeholder="Enter your username" placeholderTextColor={'gray'} style={{color: 'white'}}/>
    );
}

export function InputAddPassword() {
    return(
        <Input placeholder="Enter your password" placeholderTextColor={'gray'} style={{color: 'white'}}/>
    );
}