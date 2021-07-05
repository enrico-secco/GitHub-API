import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
*{
    margin:0;
    padding:0;
    outline:0;
    box-sizing: border-box;
}


html,body, #root{
    min-height:100%; /* para quando colocar backgroud pegar na tela toda, não só no componente. Ficava o height só do componente. */
}

body{
    background-color: #0d2636;
    font-size: 14px;
    font-family: sans-serif;
}

border-style, input, button{
    color:#222;
    font-size:14px;
}

button{
    cursor: pointer;
}


`