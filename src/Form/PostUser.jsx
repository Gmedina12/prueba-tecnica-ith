
import { useState } from 'react'


const PostUser = () => {

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userAddress, setUserAddress] = useState('')
    const [error, setError] = useState('')

    // const validate = (stateAux, valueIn) =>{

    //     switch(valueIn){
    //         case 'name':
    //             if(stateAux= ''){
    //                 setError('El nombre es requerido')
    //             }else{
    //                 setError('')
    //             };
    //         break;
    //         case 'phone':
    //             if(stateAux.length == 0 ){
    //                 setError('El teléfono es requerido')
    //             }else{
    //                 setError('')
    //             };
    //         break;
    //         case 'address':
    //             if(stateAux.length == 0 ){
    //                 setError('La dirección es requerida')
    //             }else{
    //                 setError('')
    //             };
    //         break;
    //         case 'email': 
    //         const REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //             if(stateAux.length == 0 ){
    //                 setError('email es requerido')
    //             }else if(!REGEX.test(stateAux)){
    //                 setError('email no válido')
    //             }
    //             else{
    //                 setError('')
    //             };
    //             break;
    //         default:
    //             break;
    //     }
    // }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        if(!userName || !userEmail || !userPhone || !userAddress){
            setError('Todos los campos son obligatorios');
            return;
        }

        const REGEX  = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!REGEX.test(userEmail)){
            setError('Email no válido');
            return;
        }
        try{
            await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: userName,
                    email: userEmail,
                    phone: userPhone,
                    address: userAddress
                })
            })
            setUserName('')
            setUserEmail('')
            setUserPhone('')
            setUserAddress('')
            setError('')
            alert('Usuario creado correctamente')
        }catch(error){
            console.log(error)
            setError('Error al enviar los datos')
        }
    };


    return(
        <form onSubmit={handleSubmit}>
            <span>
            <label>
                Nombre:
                <input type="text" value={userName} onChange={(event) => setUserName(event.target.value)}/>
            </label>
                 </span>

            <span>
            <label>
                Email:
                <input type="text" value={userEmail} onChange={(event) => setUserEmail(event.target.value)}/>
            </label>
            </span>

            <span>
                <label>
                Teléfono:
                <input type="text" value={userPhone} onChange={(event) => setUserPhone(event.target.value)}/>
            </label>
            </span>

            <span>
                <label>
                    Dirección: 
                    <input type="text" value={userAddress} onChange={(event) => setUserAddress(event.target.value)}/>
                </label>
            </span>

            <button type="submit">Enviar</button>
            {error && <p>{error}</p>}


        </form>
    )
}//
export default PostUser;
