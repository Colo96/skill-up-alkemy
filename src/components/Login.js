import axios from 'axios';
import swAlert from 'sweetalert';
import { useNavigate, Navigate } from 'react-router-dom';

function Login() {

    const history = useNavigate();

    const submitHandler = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email === "" || password === "") {
            swAlert(
                <h1>
                    Los campos no pueden estar vacios
                </h1>
            );
            return;
        }

        if (email !== "" && !regexEmail.test(email)) {
            swAlert(
                <h1>
                    Debes escribir una direccion de correo electronico valida
                </h1>
            );
            return;
        }

        if (email !== "challenge@alkemy.org" || password !== "react") {
            swAlert(
                <h1>
                    Credenciales inválidas!
                </h1>
            );
            return;
        }

        axios.post('http://challenge-react.alkemy.org', { email, password }).then(res => {
            swAlert(<h2>Perfecto, ingresaste correctamente!</h2>);
            const tokenRecibido = res.data.token;
            sessionStorage.setItem('token', tokenRecibido);
            history('/listado');
        });
    }

    let token = sessionStorage.getItem('token');

    return (
        <>
            {token && <Navigate to='/listado' />}
            <div className='row'>
                <div className='col-6 offset-3'>
                    <h2>Formulario de contacto</h2>
                    <form onSubmit={submitHandler}>
                        <label className='form-label d-block mt-2'>
                            <span>Correo electrónico:</span><br />
                            <input className='form-control' type="text" name="email" />
                        </label>
                        <label className='form-label d-block mt-2'>
                            <span>Contraseña:</span><br />
                            <input className='form-control' type="password" name="password" />
                        </label>
                        <button className='btn btn-success mt-2' type="submit">
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;