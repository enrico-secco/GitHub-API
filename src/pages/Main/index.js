import React, {useState, useCallback, useEffect} from 'react';
import {Link} from 'react-router-dom';

import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import {Container, Form, SubmitButton, List, DeleteButton} from './styles'

import api from "../../services/api"

export default function Main() {

 const [newRepo, setNewRepo] = useState("")
 const [repositorios, setRepositorios] = useState([])
 const [loading, setLoading] = useState(false);
 const [alert, setAlert] = useState(null);

 //DidMount -> buscar
 useEffect(() => {
  const repoStorage = localStorage.getItem('repos');

  if(repoStorage){
    setRepositorios(JSON.parse(repoStorage));
  }
 }, [])


 //DidUpdate -> salvar alterações
 useEffect(() =>{
   localStorage.setItem('repos', JSON.stringify(repositorios)); //
 },[repositorios])

 function handleInputChange(e){
   setNewRepo(e.target.value);
   setAlert(null); // voltar pra null quando ta digitando outra coisa após o erro. E ver se vai digitar certo.
 }

 const handleSubmit = useCallback( (e) => { //usa quando vai manipular state.
   e.preventDefault();
   setAlert(null);

    async function submit(){
      setLoading(true);

      try{

        if(newRepo === ''){ //se digitar vazio
          throw new Error("Você precisa indicar um repositório!")
        }

      const response = await api.get(`repos/${newRepo}`);

      const hasRepo = repositorios.find( repo => repo.name === newRepo) //ver se já existe.

      if(hasRepo){
        throw new Error("Repositório duplicado!")
      }

       const data = {
       name: response.data.full_name,
       }
  
       setRepositorios([...repositorios, data]);
       setNewRepo("");
      } catch(error){
        setAlert(true);
        console.log(error);
      } finally {
        setLoading(false);
        
      }
    }

    submit();
 } , [newRepo, repositorios]);
  

 const handleDelete = useCallback( (repo) => { //recebe o repo que passou como parâmetro.
  const find = repositorios.filter(r => r.name !== repo); //vai retornar os diferentes do nome que clicou.
  setRepositorios(find); // vai receber todos os repos, menos aquele que foi clicado para ser deletado.

 },[repositorios]);
  
 

 return (
    <Container>

      <h1> 
        <FaGithub size={25}/>
        Meus Repositórios
      </h1>

      {/* Quando são dois ou mais encadeamentos, usa styled component */}
      <Form onSubmit ={handleSubmit} error={alert}>
        <input type="text" placeholder="Adicionar Repositórios" 
         value={newRepo}
         onChange={handleInputChange} />

        <SubmitButton loading={loading ? 1 : 0}> {/* Criou no style component porque vai ser manipulado */}
         {loading ? (
           <FaSpinner color="#fff" size={14}/>
         ): (
          <FaPlus color="#fff" size={14}/>
         )}
        </SubmitButton>

      </Form>


      <List>
        {repositorios.map( (repo) => (
          <li key={repo.name}>
            <span> 
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14}/>
              </DeleteButton>
              {repo.name} 
              </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}> 
            {/* Coloca ele no enconde, fala que é um parâmetro não uma pasta que tem que acessar. url => http://localhost:3000/repositorio/angular%2Fangular */}
              <FaBars size={20}/>
            </Link>
          </li>
        ))}

      </List>


    </Container>
  );
}