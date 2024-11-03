import { Container, Login, Title, Subtitle, EnterButtom, EnterButtomTitle} from "./styles";
import {InputAddUsername, InputAddPassword} from "../../components/InputAdd";

export default function LoginScreen() {
    return(
        <Container>
            <Login>
                <Title>Access your account</Title>
                <Subtitle>Username</Subtitle>
                <InputAddUsername/>
                <Subtitle>Password</Subtitle>
                <InputAddPassword/>

                <EnterButtom>
                    <EnterButtomTitle>Join</EnterButtomTitle>
                </EnterButtom>
            </Login>
        </Container>
    )
}