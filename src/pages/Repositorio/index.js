import React, {useState, useEffect} from 'react';
import {Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList} from './styles'
import { FaArrowLeft} from 'react-icons/fa'
import api from '../../services/api'

//

export default function Repositorio({match}) { // match -> 

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([ //criou assim, para o controle ficar mais fácil de cada botão.
    {state: 'all', label: 'All', active: true},
    {state: 'open', label: 'Open', active: false},
    {state: 'closed', label: 'Closed', active: false}
  ]);

  const [filterIndex, setFilterIndex] = useState(0);
 

 useEffect( () => { //fazendo a requisição.
  
  async function load(){
    const nomeRepo = decodeURIComponent(match.params.repositorio)  /*match.params.repositorio -> angular%2Fangular. Decode pega o nome do repositório (facebook/react). */

   const[repositorioData, issuesData] = await Promise.all([ //vai executar as duas promises ao mesmo tempo.
      api.get(`/repos/${nomeRepo}`),
      api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: filters.find(f => f.active).state, //procura e retorna qual filtro está ativo.
          per_page: 5
        }
      })
    ])

    setRepositorio(repositorioData.data); //data é onde estão as infos que quer pegar (tem config,status, data);
    //console.log(repositorioData);
    //console.log(repositorioData.data);
    setIssues(issuesData.data);
    setLoading(false);
  }

  load();

 },[match.params.repositorio]);


 useEffect( () => {
 
  async function loadIssue(){
    const nomeRepo = decodeURIComponent(match.params.repositorio); //pega o nome do repo que ta atualmente.

    const response = await api.get(`/repos/${nomeRepo}/issues`, {
      params:{
        state: filters[filterIndex].state,
        page: page, //passa a state page que foi atualziada.
        per_page: 5,
      },
    });

    setIssues(response.data);
  }
   
  loadIssue();
 },[page, match.params.repositorio, filterIndex, filters]);

 function handlePage(action){
  setPage(action === 'back' ? page - 1 : page + 1); 
 }

 function handleFilter(index){
   setFilterIndex(index);
 }


if(loading){ //Enquanto faz a requisição. Se não dá erro pela img, por ainda estar buscando. Então faz esperar buscar tudo e depois renderizar.
  return(
    <Loading>
      Carregando...
    </Loading>
  )
}

 return (
   <Container>
     <BackButton to="/">
      <FaArrowLeft size={20} color="#000" />
     </BackButton>

    <Owner>
      <img src={repositorio.owner.avatar_url} 
      alt={repositorio.owner.login}/>

      <h1>{repositorio.name}</h1>
      <p>{repositorio.description}</p>
    </Owner>

    <FilterList active={filterIndex}>
      {filters.map((filter, index) => (
        <button
        type="button"
        key={filter.label} //usou como key, por cada um ser único.
        onClick={() => {handleFilter(index)}}>
          {filter.label}
        </button>
      ) )}
    </FilterList>

    <IssuesList>
      {issues.map( issue => (
        <li key={String(issue.id)}> {/*Key normalmente é uma string */}
          <img src={issue.user.avatar_url} alt={issue.user.login}/>

          <div>
            <strong>
               <a href={issue.html_url}> {issue.title}</a> {/* a -> por ser link externo */}

               {issue.labels.map(label => (
                 <span key={String(label.id)}> {label.name} </span>
               ) )} {/* Renderizar labels que tem na issue */}

            </strong>

            <p>{issue.user.login}</p>

          </div>

        </li>
      )
      )}
    </IssuesList>

    <PageActions>
      <button 
      type="button"
       onClick={() =>  handlePage('back') }
       disabled={page < 2}
       >
         Voltar 
         </button>
      
      <button type="button" onClick={() => handlePage('next')}> 
      Próximo 
      </button>
    </PageActions>

   </Container>
  );
}