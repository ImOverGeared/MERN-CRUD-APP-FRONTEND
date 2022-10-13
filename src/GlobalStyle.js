const { createGlobalStyle } = require("styled-components");

const GlobalStyle = createGlobalStyle`
*{
    margin: 0,
    padding: 0,
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
}

:root{
    --bg: #374954;
    --bg-grey: #4F6877;
    --bg-green: #6BBE92;
    --bg-blue: #2D9CDB;
    --white: #fff;
}

body{
    background-color: var(--bg-blue);
    textarea{
        resize: none;
        ::-webkit-input-placeholder{
            opacity: inherit.7;
            color: white;
        }
    }
    input[type="text"]::-webkit-input-placeholder{
        opacity: inherit.7;
        color: white;
    }
}
`;

export default GlobalStyle;