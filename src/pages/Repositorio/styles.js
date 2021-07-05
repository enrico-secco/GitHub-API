import styled from 'styled-components';
import {Link} from 'react-router-dom'

export const Loading = styled.div`
color: #fff;
font-size: 20px;

display: flex;
justify-content: center;
align-items: center;

height: 100vh;
`;


export const Container = styled.div`
max-width: 700px;

background-color: #fff;
border-radius: 4px;

box-shadow: 0 0 20px rgba(0,0,0, 0.2);
padding: 30px 30px;

margin: 80px auto;
`;

export const Owner = styled.header`
 display: flex;
 flex-direction:column;
 align-items:center;
 justify-content: center;

 img{
     width: 150px;
     border-radius: 20%;
     margin: 20px 0;
 }

 h1{
     font-size: 30px;
     color: #0d2636;
 }

 p{
     padding-top: 5px;

     font-size: 14px;
     color:#000;
     text-align: center;

     line-height: 1.4;
     max-width: 400px;
 }
`;

export const BackButton = styled(Link)`
 border:0;
 outline: 0;

 background: transparent;

`;

export const IssuesList = styled.ul`
 margin-top: 30px; /* Espaço em cima dos risco */
 padding-top: 30px;

 border-top: 1px solid #eee;
 list-style: none;

 li{
     display: flex;
     padding: 15px 10px;

     & + li { /* Aplica só depois do primeiro */
        margin-top: 12px;
     }

     img{
         width:35px;
         height:35px;
         border-radius: 50%;
         border: 2px solid #0d2636;
     }

     div{
         flex: 1;
         padding-left: 15px;


         strong{
             font-size: 14px;
            

             a{
                 text-decoration: none;
                 color: #222;
                 transition: 0.2s;

                 &:hover{
                     color:#0071db;
                 }
             }

             span{
                background-color: #222;
                color:#fff;
                border-radius: 4px;

                font-size: 12px;
                font-weight: 600;
                padding: 4px 7px;

                margin-left: 5px;
                
                
             }
         }

         p{
             margin-top: 10px;
             font-size: 12px;
             color: #000;
         }
     }
 }
`;

export const PageActions = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
 
 padding-top: 15px;

 button{
     border: 0;
     background-color: #222;
     color: #fff;
     padding: 5px 10px;
     border-radius: 4px;


     &:disabled{
         cursor: not-allowed;
         opacity: 0.5;
     }
 }
`;

export const FilterList = styled.div`
margin: 15px 0;

 button{
     border:0;
     padding: 10px 8px;
     border-radius: 4px;
     margin: 0 10px;

    &:nth-child(${props => props.active + 1}){ /* +1 por causa que o index começa em 0. */
        background:#0071db;
        color: #fff;
    }
 }

`;