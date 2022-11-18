import swAlert from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Buscador() {

    const history = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();

        if (keyword.length === 0) {
            swAlert({
                title: "Tienes que escribir una palabra clave",
                icon: "warning",
                button: "OK",
            });
        } else if (keyword.length < 4) {
            swAlert({
                title: "Tienes que escribir mas de 4 caracteres",
                icon: "warning",
                button: "OK",
            });
        } else {
            e.currentTarget.keyword.value = '';
            history(`/resultados?keyword=${keyword}`);
        }
    }

    return (
        <form className="d-flex align-items-center" onSubmit={submitHandler}>
            <label className='form-label mb-0 mx-2'>
                <input className='form-control' type="text" name="keyword" placeholder="Escribe una palabra clave..." />
            </label>
            <button className='btn btn-success' type="submit">
                Buscar
            </button>
        </form>
    )
}

export default Buscador;